import React, { useState } from "react";
import "./App.css"; // Optional for styling

// Question data
const questions = [
  {
    id: 1,
    text: "17 rounded off to the nearest 10 is ..",
    options: [10, 20, 17],
    answer: 20
  },
  {
    id: 2,
    text: "75 rounded off to the nearest 10 is ..",
    options: [70, 80, 175],
    answer: 80
  },
  {
    id: 3,
    text: "64 rounded off to the nearest 10 is ..",
    options: [64, 70, 60],
    answer: 60
  },
  {
    id: 4,
    text: "98 rounded off to the nearest 10 is ..",
    options: [80, 100, 89],
    answer: 100
  },
  {
    id: 5,
    text: "94 rounded off to the nearest 10 is ..",
    options: [100, 94, 90],
    answer: 90
  },
  {
    id: 6,
    text: "445 rounded off to the nearest 10 is ..",
    options: [450, 440, 500],
    answer: 450
  },
  {
    id: 7,
    text: "45 rounded off to the nearest 10 is ..",
    options: [50, 45, 40],
    answer: 50
  },
  {
    id: 8,
    text: "19 rounded off to the nearest 10 is ..",
    options: [20, 10, 19],
    answer: 20
  },
  {
    id: 9,
    text: "0 rounded off to the nearest 10 is ..",
    options: [10, 1, 0],
    answer: 0
  },
  {
    id: 10,
    text: "199 rounded off to the nearest 10 is ..",
    options: [190, 100, 200],
    answer: 200
  },
  {
    id: 11,
    text: "165 rounded off to the nearest 10 is ..",
    options: [170, 160, 150],
    answer: 170
  },
  {
    id: 12,
    text: "999 rounded off to the nearest 10 is ..",
    options: [1000, 990, 909],
    answer: 1000
  }
];

// Question component
function Question({ data, selected, onSelect, showResult }) {
  return (
    <div className="question-block">
      <p className="question">{data.text}</p>
      {data.options.map((opt, i) => (
        <label key={i} className="option-label">
          <input
            type="radio"
            name={`q${data.id}`}
            value={opt}
            checked={selected === opt}
            onChange={() => onSelect(data.id, opt)}
            disabled={showResult}
          />
          {opt}
          {showResult && opt === data.answer && (
            <span className="checkmark"> ✔️</span>
          )}
        </label>
      ))}
    </div>
  );
}

function App() {
  const [name, setName] = useState("");
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionId, option) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const calculateScore = () => {
    setSubmitted(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setSubmitted(false);
	setName("");
  };

  const score = questions.reduce(
    (acc, q) => (answers[q.id] === q.answer ? acc + 1 : acc),
    0
  );

  return (
    <div className="app">
	<div className="name-input">
        <label htmlFor="username">Enter your name:</label>
        <input
          type="text"
          id="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </div>
      <h1>Rounding Off to Nearest 10</h1>
      {questions.map(q => (
        <Question
          key={q.id}
          data={q}
          selected={answers[q.id]}
          onSelect={handleSelect}
          showResult={submitted}
        />
      ))}
      <div className="actions">
        <button onClick={calculateScore} disabled={submitted}>
          Submit
        </button>
        <button onClick={resetQuiz}>Reset</button>
      </div>
      {submitted && (
        <p className="score">{name ? `${name}, your score is:` : "Your score is:"} {score} / {questions.length}</p>
      )}
    </div>
  );
}

export default App;
