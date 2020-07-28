import React, { useState } from 'react';
import { fetchQuizQuestions } from './api';
//components
import QuestionCard from './components/QuestionCard';
//types
import { QuestionState, Difficulty } from './api';

type AnswerState = {
  question: string;
  answer: string;
  correctAnswer: string;
  correct: boolean;
};

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<AnswerState[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  };

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
      {/* <QuestionCard
        questionNr={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswer={userAnswer ? userAnswer[number] : undefined}
        callback={checkAnswer}
      /> */}
      <button className="next" onClick={nextQuestion}>
        Next
      </button>
    </div>
  );
};

export default App;
