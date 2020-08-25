import React, { useState, useEffect } from 'react';
import { fetchQuizQuestions, fetchCategory } from './api';
//components
import QuestionCard from './components/QuestionCard';
//types
import { QuestionState, Difficulty } from './api';
//styles
import { GlobalStyle, Wrapper } from './App.styles';

import initNotification from './firebase/firebase'

export type AnswerState = {
  question: string;
  answer: string;
  correctAnswer: string;
  correct: boolean;
};

type CategoryState = {
  id: number;
  name: string;
};

const TOTAL_QUESTIONS = 10;
const RANDOM_ID = Math.floor(Math.random() * (32 - 9 + 1)) + 9;

const App = () => {

  const [categories, setCategories] = useState<CategoryState[]>([]);
  const [category, setCategory] = useState<number>(RANDOM_ID);
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<AnswerState[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  useEffect(() => {
    const type = async () => {
      setCategories(await fetchCategory());
    };
    type();
    initNotification();
  }, [setCategories]);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY,
      category
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

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const onSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let { key } = JSON.parse(event.target.value);
    setCategory(key);
  };
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Quiz App using React with Typescript</h1>
        {gameOver || userAnswer.length === TOTAL_QUESTIONS ? (
          <div className="startbox">
            <select className="select" onChange={onSelect}>
              <option value="">Select Topic</option>
              {categories.map(({ id, name }) => (
                <option
                  key={id}
                  value={JSON.stringify({ key: id, value: name })}
                >
                  {name}
                </option>
              ))}
            </select>
            <button className="start" onClick={startTrivia}>
              Start
            </button>
          </div>
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
      </Wrapper>
    </>
  );
};

export default App;
