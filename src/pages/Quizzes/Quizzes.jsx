import React, { useState } from "react";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";
import { quizzes } from "../../data/quizzes";
import "./Quizzes.css";

function Quizzes() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const startQuiz = (topic) => {
    setSelectedTopic(topic);
    setIndex(0);
    setScore(0);
    setFinished(false);
  };

  const currentQuiz = selectedTopic ? quizzes[selectedTopic] : null;
  const currentQuestion = currentQuiz ? currentQuiz[index] : null;

  const checkAnswer = (i) => {
    if (i === currentQuestion.answer) setScore((prev) => prev + 1);

    if (index + 1 === currentQuiz.length) {
      setFinished(true);
    } else {
      setIndex(index + 1);
    }
  };

  const resetQuiz = () => {
    setSelectedTopic(null);
    setIndex(0);
    setScore(0);
    setFinished(false);
  };

  return (
    <div className="quizzes-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Quizzes</h1>
          <p className="page-subtitle">
            Test your knowledge with topic-based MCQs.
          </p>
        </div>
      </div>

      {!selectedTopic && (
        <div className="topic-grid">
          {Object.keys(quizzes).map((topic) => (
            <div
              key={topic}
              className="topic-wrapper"
              onClick={() => startQuiz(topic)}
            >
              <Card
                className="topic-card"
                title={topic.toUpperCase()}
                subtitle="Click to start"
              >
                <p>Attempt {quizzes[topic].length} questions →</p>
              </Card>
            </div>
          ))}
        </div>
      )}

      {selectedTopic && !finished && (
        <Card
          title={`${selectedTopic.toUpperCase()} Quiz`}
          subtitle={`Question ${index + 1} of ${currentQuiz.length}`}
          className="quiz-card"
          rightSection={<Button variant="ghost" onClick={resetQuiz}>Exit</Button>}
        >
          <h2 className="quiz-question">{currentQuestion.question}</h2>

          <div className="options-grid">
            {currentQuestion.options.map((opt, i) => (
              <button key={i} className="option-btn" onClick={() => checkAnswer(i)}>
                {opt}
              </button>
            ))}
          </div>
        </Card>
      )}

      {finished && (
        <Card title="Quiz Complete!" className="quiz-result">
          <h2>Your Score: {score}/{currentQuiz.length}</h2>

          <p className="result-sub">
            {score === currentQuiz.length
              ? "Perfect!"
              : score >= currentQuiz.length / 2
              ? "Great job! Keep learning."
              : "Don't worry, keep practicing!"}
          </p>

          <Button onClick={resetQuiz}>Try Again</Button>
        </Card>
      )}
    </div>
  );
}

export default Quizzes;
