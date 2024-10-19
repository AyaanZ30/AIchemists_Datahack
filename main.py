from scrape import fetch_content
from question_generator import generate_questions
from answer_model import ask_questions

def print_flashcards(answers):
    for idx, flashcard in enumerate(answers, start=1):
        print(f"Flashcard {idx}:")
        print(f"Question: {flashcard['question']}")
        print("Options:")
        for option in flashcard['options']:
            print(f" - {option}")
        print(f"Correct Answer: {flashcard['correct_answer']}")
        print(f"Model Answer: {flashcard['model_answer']}\n")

if __name__ == "__main__":
    topic = input("Enter a topic to generate flashcards: ")
    num_questions = int(input("Enter the number of questions to generate: "))  # Optional: Ask user for number of questions

    # Fetch the content from Wikipedia
    scraped_content = fetch_content(topic)

    # Generate Questions
    generated_questions = generate_questions(topic, num_questions)

    # Ask questions and get answers from the model
    if scraped_content and generated_questions:
        answers = ask_questions(generated_questions, scraped_content)
        print("Generated Flashcards with Answers:")
        print_flashcards(answers)
    else:
        print("No content was scraped or no questions were generated.")
