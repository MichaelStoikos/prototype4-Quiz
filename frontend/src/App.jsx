import React, { useState, useEffect } from "react";

function App() {
  const [question, setQuestion] = useState(null);
  const [lastQuestion, setLastQuestion] = useState(null); 
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [elo, setElo] = useState(() => {
    const savedElo = localStorage.getItem("elo");
    return savedElo ? parseInt(savedElo, 10) : 1000;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("elo", elo);
  }, [elo]);

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      setSelectedOption(null); 
      setCorrectAnswer(null); 
      setQuestion(null); 
  
      const response = await fetch("http://localhost:2000/api/question");
      if (!response.ok) {
        throw new Error("Failed to fetch question");
      }
      const data = await response.json();
      setQuestion(data);
    } catch (error) {
      console.error("Error fetching question:", error.message);
      setQuestion({ error: "Unable to load question. Please try again later." });
    } finally {
      setLoading(false);
    }
  };
  
  const submitAnswer = async (option) => {
    try {
      const response = await fetch("http://localhost:2000/api/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: "anonymous-user",
          elo,
          questionId: question.id,
          selectedOption: option,
        }),
      });
      const data = await response.json();
  
      setCorrectAnswer(data.correctAnswer); 
      setSelectedOption(option); 
      setElo(data.updatedElo); 

      setLastQuestion({ question: question.question, wikiLink: question.wikiLink });
 
      setTimeout(() => fetchQuestion(), 2000); 
    } catch (error) {
      console.error("Error submitting answer:", error.message);
    }
  };
  

  useEffect(() => {
    fetchQuestion();
  }, []);

  if (loading) return <p>Loading question...</p>;
  if (!question) return <p>Unable to load question. Refresh the page.</p>;

  return (
    <div className="Quiz" style={{ textAlign: "center", padding: "20px" }}>
      <h1>Infinite Quiz</h1>
      <p>Your Elo Rating: {elo}</p>

      {lastQuestion && (
        <div className="learn-more">
          <a
            href={lastQuestion.wikiLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More About: {lastQuestion.question}
          </a>
        </div>
      )}

      <div>
        <h2>{question.question}</h2>
        {question.image && <img className="image" src={question.image} alt="quiz" />}
      </div>

      <div className="answers">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => submitAnswer(option)}
            style={{
              margin: "10px",
              padding: "10px 20px",
              backgroundColor: selectedOption
                ? option === correctAnswer
                  ? "green"
                  : option === selectedOption
                  ? "red"
                  : "white"
                : "white",
              color: selectedOption ? "white" : "black",
              border: "1px solid black",
              borderRadius: "5px",
              cursor: selectedOption ? "not-allowed" : "pointer",
            }}
            disabled={!!selectedOption}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
