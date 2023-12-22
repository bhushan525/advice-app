import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(true);

  // Function to fetch advice
  const fetchAdvice = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://api.adviceslip.com/advice');
      setAdvice(response.data.slip.advice);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Fetch advice when the component mounts
    fetchAdvice();
  }, [fetchAdvice]);

  // Function to fetch new advice when the button is clicked
  const handleClick = () => {
    // Fetch advice again
    fetchAdvice();
  };

  return (
    <div className="app">
      <div className="card">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1 className="heading">{advice}</h1>
            <button className='button' onClick={handleClick}>
              <span>Click here to get Advice</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
