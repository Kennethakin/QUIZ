const API_URL = 'https://opentdb.com/api.php';

export const fetchQuestions = async (numQuestions, difficulty) => {
  try {
    const response = await fetch(`${API_URL}?amount=${numQuestions}&difficulty=${difficulty}&type=multiple`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw new Error('Failed to fetch questions');
  }
};
