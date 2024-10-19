import requests

# API key and endpoint for generating educational content
GENIE_API_KEY = "AIzaSyBzB-FbuQimtmUEoaXUwYdGoxUwTXvMO3I"  # Replace with your actual API key
GENIE_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

difficulty_level = "Extremely hard"
def generate_questions(topic):
    # Request payload for generating questions
    request_data = {
        "contents": [{
            "parts": [{
                "text": f"Generate 5 multiple-choice questions on the topic '{topic}' for difficulty level: '{difficulty_level}' strictly. Make sure the questions are unique, brainstorming and technical. "
                        "Each question should have 4 options labeled A), B), C), and D). "
                        "Please provide the correct solution in the following format: "
                        "Strictly use the below format only."
                        "{ 'Question1': ['Q1 Text', 'Q1 option 1', 'Q1 option 2', 'Q1 option 3', 'Q1 option 4', 'Q1 soln'], "
                        "'Question2': ... }"
            }]
        }]
    }
   
    # Make the API request
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

# Main execution to take user input
if __name__ == "__main__":
    # Get user input for the topic
    topic = input("Enter a topic for generating questions: ")
   
    # Generate the questions
    questions = generate_questions(topic)
   
    # Display the generated questions
    print("\nGenerated Questions:")
    print(questions)

	
