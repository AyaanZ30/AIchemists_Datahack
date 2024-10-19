import React from "react";

function ResourceRecommendations({ flashcards, performance }) {
  const getRecommendations = () => {
    const weakAreas = Object.entries(performance)
      .filter(([_, stats]) => stats.correct / stats.attempts < 0.7)
      .map(([id]) => flashcards.find((card) => card.id === parseInt(id)));

    return weakAreas.map((card) => ({
      topic: card.front,
      resources: [
        { type: "book", title: `Advanced ${card.front} Studies`, url: "#" },
        { type: "video", title: `${card.front} Explained`, url: "#" },
        { type: "article", title: `Understanding ${card.front}`, url: "#" },
      ],
    }));
  };

  const recommendations = getRecommendations();

  return (
    <div className="resource-recommendations">
      <h2>Resource Recommendations</h2>
      {recommendations.length > 0 ? (
        recommendations.map((rec, index) => (
          <div key={index} className="recommendation">
            <h3>{rec.topic}</h3>
            <ul>
              {rec.resources.map((resource, i) => (
                <li key={i}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {resource.title} ({resource.type})
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>Keep up the good work! No specific recommendations at this time.</p>
      )}
    </div>
  );
}

export default ResourceRecommendations;
