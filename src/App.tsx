import React from 'react';
// import QuestionCard from './components/QuestionCard';

const App = () => {

  const startTrivia = async () => {};

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {}

  const nextQuestion = () => {}

  return (
    <div className='App'>
      <h1>React Quiz</h1>
      <button onClick={startTrivia} >Start</button>
      <p className='score'>Score:</p>
      <p>Loading Questions...</p>
      {/* <QuestionCard/> */}
      <button onClick={nextQuestion}>Next</button>
    </div>
  );
};

export default App;