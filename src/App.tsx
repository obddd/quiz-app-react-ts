import React, { useState } from 'react';
import { stringify } from 'querystring';
import QuestionCard from './components/QuestionCard';

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string[] | null>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const TOTAL_QUESTIONS = 10;

  const startTrivia = async () => {};

  const checkAnswer = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {};

  const nextQuestion = () => {};

  return (
    <div className="App">
      <h1>React Quiz</h1>
      <button onClick={startTrivia}>Start</button>
      <p className="score">Score:</p>
      <p>Loading Questions...</p>
      <QuestionCard
        questionNr={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswer ? userAnswer[number] : undefined}
        callback={checkAnswer}
      />
      <button className="next" onClick={nextQuestion}>
        Next
      </button>
    </div>
  );
};

export default App;
