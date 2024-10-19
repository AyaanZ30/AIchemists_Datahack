import os
import requests
from PyPDF2 import PdfReader

GENIE_API_KEY = "AIzaSyBzB-FbuQimtmUEoaXUwYdGoxUwTXvMO3I"  
GENIE_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

difficulty_level = 5  

def extract_text_from_pdf(pdf_path):
    pdf_reader = PdfReader(pdf_path)
    extracted_text = ""
    
    for page_num in range(len(pdf_reader.pages)):
        extracted_text += pdf_reader.pages[page_num].extract_text()
    
    return extracted_text

def generate_questions(topic):
    global difficulty_level  
    request_data = {
        "contents": [{
            "parts": [{
                "text": f"Generate 5 multiple-choice questions on the topic '{topic}' for difficulty level: '{difficulty_level} on a scale of 1-10' strictly. Make sure the questions are unique, brainstorming, and technical. "
                        "Higher difficulty level means generate more difficult, challenging, and technical questions. Make sure to test the user's understanding of the topic."
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

def process_pdf_and_generate_questions(pdf_path):
    extracted_text = extract_text_from_pdf(pdf_path)
    
    if not extracted_text:
        print("No text could be extracted from the PDF.")
        return
    
    questions = generate_questions(extracted_text)
    
    print("Generated Questions:")
    print(questions)

if __name__ == '__main__':
    pdf_path = input("Enter the path to the PDF file: ").strip()
    
    if os.path.exists(pdf_path) and pdf_path.endswith('.pdf'):
        process_pdf_and_generate_questions(pdf_path)
    else:
        print("Invalid PDF file. Please check the path and try again.")
