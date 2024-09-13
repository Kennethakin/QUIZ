import React, { useState, useEffect } from 'react';
import { Container, Button, Form, Alert, Spinner } from 'react-bootstrap';
import Timer from './components/Timer';  // Ensure to create this component
import QuizProgressBar from './components/ProgressBar'; // Ensure to create this component
import Results from './components/Results'; // Ensure to create this component
import Footer from './components/Footer'; // Import the Footer component
import { fetchQuestions } from './api/triviaService'; // Ensure to create this service

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState('easy');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      try {
        const questionsData = await fetchQuestions(numQuestions, difficulty);
        setQuestions(questionsData);
        setUserAnswers(new Array(questionsData.length).fill(null));
        setError('');
      } catch (err) {
        setError('Failed to fetch questions.');
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, [numQuestions, difficulty]);

  const handleAnswer = (answer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
      calculateScore();
    }
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correct_answer) {
        score++;
      }
    });
    setScore(score);
  };

  const handleTimeout = () => {
    handleNextQuestion();
  };

  const handleRestart = () => {
    setNumQuestions(10);
    setDifficulty('easy');
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
    setShowResults(false);
    setLoading(false);
    setError('');
  };

  return (
    <div className='bg-radial-gradient'>
    <Container className="mt-4">
      <h1 className="text-center">Kenneth Quiz</h1>

      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && !showResults && questions.length > 0 && (
        <div className="bg-primary-section mb-4">
          <Timer seconds={60} onTimeout={handleTimeout} />
          <QuizProgressBar current={currentQuestionIndex + 1} total={questions.length} />

          <h3>Question {currentQuestionIndex + 1} / {questions.length}</h3>
          <div className="bg-secondary-section mb-4">
            <p dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex]?.question }}></p>
            {questions[currentQuestionIndex]?.incorrect_answers
              .concat(questions[currentQuestionIndex]?.correct_answer)
              .sort()
              .map((answer, index) => (
                <Button
                  key={index}
                  variant="outline-primary"
                  className="me-2 mb-2"
                  onClick={() => handleAnswer(answer)}
                >
                  {answer}
                </Button>
              ))}
          </div>
          <Button onClick={handleNextQuestion}>Next</Button>
        </div>
      )}

      {showResults && (
        <div className="bg-tertiary-section mb-4">
          <Results
            score={score}
            questions={questions}
            userAnswers={userAnswers}
            onRestart={handleRestart}
          />
        </div>
      )}

      {!loading && !error && !showResults && questions.length === 0 && (
        <div className="bg-primary-section mb-4">
          <Form.Group>
            <Form.Label>Number of Questions</Form.Label>
            <Form.Control
              type="number"
              min="10"
              max="1000"
              step="10"
              value={numQuestions}
              onChange={(e) => setNumQuestions(parseInt(e.target.value))}
            />
          </Form.Group>
          <Form.Group className="mt-2">
            <Form.Label>Difficulty Level</Form.Label>
            <Form.Control
              as="select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Form.Control>
          </Form.Group>
          <Button className="mt-2" onClick={() => setLoading(true)}>Start Quiz</Button>
        </div>
      )}

      
    </Container>
    <Footer/>
    </div>
  );
};

export default App;
