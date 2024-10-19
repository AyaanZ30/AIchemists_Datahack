import React, { useState } from "react";

function InputForm({ onNewFlashcard }) {
  const [input, setInput] = useState("");
  const [type, setType] = useState("text");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() || file) {
      // Here you would typically send the file to a server for processing
      // For this example, we'll just use the filename as the flashcard content
      const content = file ? file.name : input;
      onNewFlashcard({ type, front: content, back: "Auto-generated answer" });
      setInput("");
      setFile(null);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="text">Text</option>
        <option value="image">Image URL</option>
        <option value="document">Document</option>
      </select>
      {type === "document" ? (
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.ppt,.pptx,.doc,.docx"
        />
      ) : (
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            type === "text" ? "Enter question or topic" : "Enter image URL"
          }
        />
      )}
      <button type="submit">Generate Flashcards</button>
    </form>
  );
}

export default InputForm;
