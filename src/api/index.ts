import { shuffleArray } from '../utils';

type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = Question & { answers: string[] };

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export const fetchCategory = async() => {
  const endpoint = 'https://opentdb.com/api_category.php';
  const data = await (await fetch(endpoint)).json();
  return data.trivia_categories;
}

export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty,
  category: number
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty${difficulty}=easy&type=multiple`
  const data = await (await fetch(endpoint)).json();
  return data.results.map((question: Question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer
    ])
  }));
};

