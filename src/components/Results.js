import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

const Results = ({ score, questions, userAnswers, onRestart }) => {
  return (
    <div>
      <h2>Your Score: {score} / {questions.length}</h2>
      <ListGroup>
        {questions.map((question, index) => (
          <ListGroup.Item key={index}>
            <h5>{question.question}</h5>
            <p><strong>Your Answer:</strong> {userAnswers[index]}</p>
            <p><strong>Correct Answer:</strong> {question.correct_answer}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Button className="mt-3" onClick={onRestart}>Restart</Button>
    </div>
  );
};

export default Results;
