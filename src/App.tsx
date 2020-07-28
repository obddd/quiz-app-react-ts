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
  ) => {
    if (!gameOver) {
      const answer = event.currentTarget.value;
      const correct = answer === questions[number].correct_answer;
      if (correct) setScore((prev) => prev + 1);

      const ansObj = {
        question: questions[number].question,
        answer,
        correctAnswer: questions[number].correct_answer,
        correct,
      };

      setUserAnswer((prev) => [...prev, ansObj]);
    }
  };

  const nextQuestion = () => {};

  return (
    <div className="App">
      <h1>React Quiz</h1>

      {gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
        <button onClick={startTrivia}>Start</button>
      ) : null}

      {!gameOver ? <p className="score">Score: {score}</p> : null}

      {loading && <p>Loading Questions...</p>}

      {!gameOver && !loading && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswer ? userAnswer[number] : undefined}
          callback={checkAnswer}
        />
      )}

      {!gameOver &&
      !loading &&
      userAnswer.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next
        </button>
      ) : null}
    </div>
  );
};

export default App;
