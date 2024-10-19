import torch
import torch.nn as nn
import torch.optim as optim
import random
import numpy as np

# Sample Data: (context, question) pairs
data = [
    ("Computers are devices that process data.", "What are computers?"),
    ("Python is a programming language.", "What is Python?"),
    ("Artificial Intelligence is the simulation of human intelligence.", "What is Artificial Intelligence?"),
    # Add more data pairs for training...
]

# Define hyperparameters
input_size = 100  # Size of the input vector (you may adjust based on your vocabulary size)
hidden_size = 64  # Size of hidden layer
output_size = input_size  # Same as input size for simplicity
num_epochs = 500  # Number of epochs for training
learning_rate = 0.001  # Learning rate

# Define the Question Generation Model
class QuestionGenerator(nn.Module):
    def __init__(self, input_size, hidden_size, output_size):
        super(QuestionGenerator, self).__init__()
        self.lstm = nn.LSTM(input_size, hidden_size, batch_first=True)
        self.fc = nn.Linear(hidden_size, output_size)

    def forward(self, x):
        out, _ = self.lstm(x)
        out = self.fc(out)
        return out

# Convert context and questions to tensors
def text_to_tensor(text):
    # Dummy function for converting text to tensor
    # Replace this with actual text vectorization (like word embeddings)
    return torch.randn(1, 10, input_size)  # Random tensor as placeholder

# Prepare training data
def prepare_data(data):
    contexts = []
    questions = []
    for context, question in data:
        contexts.append(text_to_tensor(context))
        questions.append(text_to_tensor(question))
    return contexts, questions

# Train the model
def train_model(model, contexts, questions):
    criterion = nn.MSELoss()  # Loss function (use suitable loss based on your problem)
    optimizer = optim.Adam(model.parameters(), lr=learning_rate)

    for epoch in range(num_epochs):
        for context_tensor, question_tensor in zip(contexts, questions):
            optimizer.zero_grad()
            output = model(context_tensor)
            loss = criterion(output, question_tensor)
            loss.backward()
            optimizer.step()
        if (epoch+1) % 100 == 0:
            print(f'Epoch [{epoch+1}/{num_epochs}], Loss: {loss.item():.4f}')

# Generate a question based on context
def generate_question(model, context_tensor, max_length=20):
    model.eval()  # Set the model to evaluation mode
    generated_question = []
    input_tensor = context_tensor.unsqueeze(0)  # Add batch dimension

    for _ in range(max_length):
        output = model(input_tensor)
        predicted_word = output.argmax(dim=2)  # Get the index of the highest probability word
        generated_question.append(predicted_word.item())
        input_tensor = torch.cat((input_tensor, predicted_word.unsqueeze(0)), dim=1)  # Add predicted word to input

    return generated_question

# Main execution flow
if __name__ == "__main__":
    # Create the model
    model = QuestionGenerator(input_size, hidden_size, output_size)

    # Prepare the data
    contexts, questions = prepare_data(data)

    # Train the model
    train_model(model, contexts, questions)

    # Example input context
    context = "Computers are devices that process data."
    context_tensor = text_to_tensor(context)

    # Generate a question
    generated_question = generate_question(model, context_tensor)
    print("Generated Question Indices:", generated_question)

    # Note: You'll need a mapping from indices to actual words to convert generated indices back to text.
