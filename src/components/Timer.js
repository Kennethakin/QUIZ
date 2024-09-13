import React, { useState, useEffect } from 'react';

const Timer = ({ seconds, onTimeout }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onTimeout]);

  return (
    <div className="mb-3">
      <h4>Time Left: {timeLeft}s</h4>
    </div>
  );
};

export default Timer;
