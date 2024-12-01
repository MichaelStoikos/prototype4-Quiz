import React, { useState, useEffect } from "react";

function App() {
  const [question, setQuestion] = useState(null); 
  const [selectedOption, setSelectedOption] = useState(null); 
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [elo, setElo] = useState(1000); 

  const fetchQuestion = async () => {
    setSelectedOption(null); 
    setCorrectAnswer(null);

    const response = await fetch("http://localhost:2000/api/question");
    const data = await response.json();
    setQuestion(data);
  };

  const submitAnswer = async (option) => {
    const response = await fetch("http://localhost:2000/api/answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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

    setTimeout(fetchQuestion, 2000);
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  if (!question) {
    return <p>Loading question...</p>;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Infinite Quiz</h1>
      <p>Your Elo Rating: {elo}</p>

      <div>
        <h2>{question.question}</h2>
        {question.image && <img src={question.image} alt="quiz" style={{ maxWidth: "300px" }} />}
      </div>

      <div>
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
