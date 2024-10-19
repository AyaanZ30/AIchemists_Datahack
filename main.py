import requests
import ast  # To safely evaluate the string representation of the dictionary

GENIE_API_KEY = "AIzaSyBzB-FbuQimtmUEoaXUwYdGoxUwTXvMO3I"  # Replace with your actual API key
GENIE_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

def get_difficulty(score):
    if score > 3:
        return min(difficulty_level + 1, 10)  # Increase difficulty, max 10
    elif score < 3:
        return max(difficulty_level - 1, 0)  # Decrease difficulty, min 0
    else:
        return difficulty_level  # Difficulty remains the same

difficulty_level = 5  # Initialize difficulty level

def generate_questions(topic):
    global difficulty_level  # Use global difficulty level
    request_data = {
        "contents": [{
            "parts": [{
                "text": f"Generate 5 multiple-choice questions on the topic '{topic}' for difficulty level: '{difficulty_level} on a scale of 1-10' strictly. Make sure the questions are unique, brainstorming and technical. "
                        "Higher difficulty level means generate more difficult challenging and technical question. Make sure to test user's understanding of topic."
                        "Each question should have 4 options labeled A), B), C), and D). "
                        "Please provide the correct solution in the following format: "
                        "Strictly use the below format only."
                        "{ 'Question1': ['Q1 Text', 'Q1 option 1', 'Q1 option 2', 'Q1 option 3', 'Q1 option 4', 'The number for correct option : 1/2/3/4'], "
                        "'Question2': ... }"
            }]
        }]
    }
   
    response = requests.post(
        GENIE_API_URL,
        json=request_data,
        headers={
            'Content-Type': 'application/json',
            'x-goog-api-key': GENIE_API_KEY
        }
    )
   
    # Check for successful response
    if response.status_code == 200:
        # Extract the generated questions
        response_json = response.json()
        generated_questions = response_json['candidates'][0]['content']['parts'][0]['text']
        return generated_questions
    else:
        return f"Error: {response.status_code} - {response.json().get('error', {}).get('message', 'An unknown error occurred')}"

# Function to parse questions, options, and answers
def parse_questions(questions_str):
    questions_dict = ast.literal_eval(questions_str)
    questions = []
    options = []
    answers = []

    for key, value in questions_dict.items():
        questions.append(value[0])  # Add question text
        options.append(value[1:5])  # Add options (A, B, C, D)
        answers.append(value[5])  # Add correct answer index

    return questions, options, answers

def generate_recommendations(topics):
    recommendations = []
    for topic in topics:
        print(topic)
        # Request payload for generating recommendations
        request_data = {
            "contents": [{
                "parts": [{
                    "text": f"Based on the user's incorrect response in technical '{topic}', Suggest 1 or 2 topic or concepts in which he can improve.Do Not Elaborate"
                }]
            }]
        }
       
        # Make the API request for recommendations
        response = requests.post(
            GENIE_API_URL,
            json=request_data,
            headers={
                'Content-Type': 'application/json',
                'x-goog-api-key': GENIE_API_KEY
            }
        )
       
        # Check for successful response
        if response.status_code == 200:
            response_json = response.json()
            recommendation = response_json['candidates'][0]['content']['parts'][0]['text']
            recommendations.append((topic, recommendation))
        else:
            recommendations.append((topic, f"Error: {response.status_code} - {response.json().get('error', {}).get('message', 'An unknown error occurred')}"))
   
    return recommendations

# Main execution to take user input
if __name__ == "__main__":
    while True:  # Start a while loop
        # Get user input for the topic
        topic = input("Enter a topic for generating questions (or press 0 to exit): ")
       
        if topic == "0":  # Check for exit condition
            print("Exiting the program.")
            break  # Exit the loop

        # Generate the questions
        questions_str = generate_questions(topic)

        # Check if questions were generated successfully
        if "Error:" not in questions_str:
            # Parse the questions, options, and answers
            questions_list, options_list, answers_list = parse_questions(questions_str)

            # Display the questions, options, and answers
            print("\nGenerated Questions:")
            for i, question in enumerate(questions_list):
                print(f"{i + 1}. {question}")
                print("Options:")
                for j, option in enumerate(options_list[i]):
                    print(f"   {chr(65 + j)}) {option}")  # Convert index to A/B/C/D
                print()  # Blank line for better readability

            # Get user answers
            user_answers = []
            incorrect_topics = []
            for i in range(len(questions_list)):
                answer = input(f"Enter your answer for Question {i + 1} (A/B/C/D): ").strip().upper()
                user_answers.append(answer)

                # Check for incorrect answers
                correct_answer = chr(65 + int(answers_list[i]) - 1)  # Convert index to A/B/C/D
                if user_answers[i] != correct_answer:
                    incorrect_topics.append(topic)  # Track the topic for incorrect answers

            # Calculate score and prepare correct answers for display
            score = 0
            correct_answers_display = []
            for i in range(len(questions_list)):
                correct_answer = chr(65 + int(answers_list[i]) - 1)  # Convert index to A/B/C/D
                correct_answers_display.append(correct_answer)  # Store correct answer
                if user_answers[i] == correct_answer:
                    score += 1

            # Display the score
            print(f"\nYour score: {score}/{len(questions_list)}")

            # Display correct answers and user answers
            print("\nCorrect Answers and Your Answers:")
            for i in range(len(questions_list)):
                print(f"Question {i + 1}:")
                print(f"  Correct Answer: {correct_answers_display[i]}")
                print(f"  Your Answer: {user_answers[i]}\n")

            # Adjust difficulty based on score
            difficulty_level = get_difficulty(score)

            # Generate recommendations based on incorrect answers
            if incorrect_topics:
                unique_incorrect_topics = list(set(incorrect_topics))  # Get unique topics
                recommendations = generate_recommendations(unique_incorrect_topics)

                # Display recommendations
                print("\nRecommendations for Improvement:")
                for topic, recommendation in recommendations:
                    print(f"Topic: {topic}")
                    print(f"Recommendation: {recommendation}\n")

        else:
            print("\n" + questions_str)

