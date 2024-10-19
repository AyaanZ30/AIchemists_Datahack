from transformers import pipeline 

model_name = "deepset/roberta-base-squad2"
qa_pipeline = pipeline('question-answering', model=model_name, tokenizer=model_name)

def ask_questions(questions, context):
    answers = []
    for question in questions:
        QA_input = {'question': question['question'], 'context': context}
        answer = qa_pipeline(QA_input)
        answers.append({
            "question": question['question'],
            "options": question['options'],
            "correct_answer": question['correct_answer'],
            "model_answer": answer['answer']
        })
    return answers