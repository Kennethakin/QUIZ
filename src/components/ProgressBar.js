import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const QuizProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-3">
      <ProgressBar now={percentage} label={`${current} / ${total}`} />
    </div>
  );
};

export default QuizProgressBar;
