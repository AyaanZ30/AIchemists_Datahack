from transformers import pipeline, AutoTokenizer

# Initialize the question generation pipeline with a smaller model
tokenizer = AutoTokenizer.from_pretrained('meta-llama/Llama-3.1-405B')
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token
question_generator = pipeline("text-generation", model='meta-llama/Llama-3.1-405B')

def generate_questions(topic, num_questions=5):
    prompt = f"Generate {num_questions} questions about {topic} along with their correct answers and multiple-choice options."
    encoded_prompt = tokenizer.encode(prompt, truncation=True, max_length=512, padding='max_length', return_tensors='pt')
    response = question_generator(prompt, max_length=200, num_return_sequences=1)
    questions = response[0]['generated_text'].strip().split('\n')

    # Parse generated text into structured questions
    formatted_questions = []
    for question in questions:
        parts = question.split(" | ")  # Assuming the format "Question | Option1 | Option2 | Option3 | CorrectAnswer"
        if len(parts) >= 5:
            formatted_questions.append({
                "question": parts[0],
                "options": parts[1:-1],
                "correct_answer": parts[-1]
            })
    return formatted_questions
