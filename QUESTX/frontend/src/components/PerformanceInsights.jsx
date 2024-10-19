import React from "react";

function PerformanceInsights({ performance, flashcards }) {
  const getRecommendations = () => {
    const weakAreas = Object.entries(performance)
      .filter(([_, stats]) => stats.correct / stats.attempts < 0.7)
      .map(([id]) => flashcards.find((card) => card.id === parseInt(id)));

    return weakAreas.length > 0
      ? `Focus on improving: ${weakAreas.map((card) => card.front).join(", ")}`
      : "Great job! Keep practicing to maintain your knowledge.";
  };

  return (
    <div className="performance-insights">
      <h2>Performance Insights</h2>
      <ul>
        {Object.entries(performance).map(([id, stats]) => (
          <li key={id}>
            Flashcard {id}: {stats.correct} correct out of {stats.attempts}{" "}
            attempts
          </li>
        ))}
      </ul>
      <p>
        <strong>Recommendation:</strong> {getRecommendations()}
      </p>
    </div>
  );
}

export default PerformanceInsights;
