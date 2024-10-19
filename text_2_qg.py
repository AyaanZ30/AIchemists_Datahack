import requests
import ast  

GENIE_API_KEY = "AIzaSyBzB-FbuQimtmUEoaXUwYdGoxUwTXvMO3I"  
GENIE_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

def get_difficulty(score):
    if score > 3:
        return min(difficulty_level + 1, 10)  
    elif score < 3:
        return max(difficulty_level - 1, 0)  
    else:
        return difficulty_level  

difficulty_level = 5  

def generate_questions(topic):
    global difficulty_level  
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
   
    if response.status_code == 200:
        response_json = response.json()
        generated_questions = response_json['candidates'][0]['content']['parts'][0]['text']
        return generated_questions
    else:
        return f"Error: {response.status_code} - {response.json().get('error', {}).get('message', 'An unknown error occurred')}"

def parse_questions(questions_str):
    questions_dict = ast.literal_eval(questions_str)
    questions = []
    options = []
    answers = []

    for key, value in questions_dict.items():
        questions.append(value[0]) 
        options.append(value[1:5])  
        answers.append(value[5])  

    return questions, options, answers

def generate_recommendations(topics):
    recommendations = []
    for topic in topics:
        print(topic)
        request_data = {
            "contents": [{
                "parts": [{
                    "text": f"Based on the user's incorrect response in technical '{topic}', Suggest 1 or 2 topic or concepts in which he can improve.Do Not Elaborate"
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
       
        if response.status_code == 200:
            response_json = response.json()
            recommendation = response_json['candidates'][0]['content']['parts'][0]['text']
            recommendations.append((topic, recommendation))
        else:
            recommendations.append((topic, f"Error: {response.status_code} - {response.json().get('error', {}).get('message', 'An unknown error occurred')}"))
   
    return recommendations

if __name__ == "__main__":
    while True:  
        topic = input("Enter a topic for generating questions (or press 0 to exit): ")
       
        if topic == "0": 
            print("Exiting the program.")
            break 

        questions_str = generate_questions(topic)

        if "Error:" not in questions_str:
            questions_list, options_list, answers_list = parse_questions(questions_str)
            print("\nGenerated Questions:")
            for i, question in enumerate(questions_list):
                print(f"{i + 1}. {question}")
                print("Options:")
                for j, option in enumerate(options_list[i]):
                    print(f"   {chr(65 + j)}) {option}")  
                print()  

            user_answers = []
            incorrect_topics = []
            for i in range(len(questions_list)):
                answer = input(f"Enter your answer for Question {i + 1} (A/B/C/D): ").strip().upper()
                user_answers.append(answer)

                correct_answer = chr(65 + int(answers_list[i]) - 1)  
                if user_answers[i] != correct_answer:
                    incorrect_topics.append(topic)  

            score = 0
            correct_answers_display = []
            for i in range(len(questions_list)):
                correct_answer = chr(65 + int(answers_list[i]) - 1)  
                correct_answers_display.append(correct_answer)  
                if user_answers[i] == correct_answer:
                    score += 1

            print(f"\nYour score: {score}/{len(questions_list)}")

            print("\nCorrect Answers and Your Answers:")
            for i in range(len(questions_list)):
                print(f"Question {i + 1}:")
                print(f"  Correct Answer: {correct_answers_display[i]}")
                print(f"  Your Answer: {user_answers[i]}\n")

            difficulty_level = get_difficulty(score)

            if incorrect_topics:
                unique_incorrect_topics = list(set(incorrect_topics))  
                recommendations = generate_recommendations(unique_incorrect_topics)

                print("\nRecommendations for Improvement:")
                for topic, recommendation in recommendations:
                    print(f"Topic: {topic}")
                    print(f"Recommendation: {recommendation}\n")

        else:
            print("\n" + questions_str)

