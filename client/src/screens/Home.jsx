import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../axiosConfig';

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('/quiz');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();
  }, []); // Empty dependency array to run effect only once on mount

  return (
    <div className="container mx-auto px-4">
      <div className="mt-8 mb-4">
        <h2 className="text-3xl font-bold mb-2">Welcome to Quiz App</h2>
        <p className="text-lg mb-4">Create a quiz and challenge your friends!</p>
        <Link to="/create">
          <button >
            Create Quiz
          </button>
        </Link>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4 ">Quizzes</h2>
        <div className='flex gap-10'>
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="border rounded-lg p-4 w-60 h-36 mb-4 hover:shadow-lg hover:bg-gray-50 0hover:border-gray-200 hover:text-black">
            <h3 className="text-lg font-bold mb-4 mt-2">{quiz.title}</h3>
            <Link to={`/quiz/${quiz._id}`}>
              <button  className='p-4 ml-5 hover:bg-slate-300 hover:text-slate-800'>
                Attend Quiz
              </button>
            </Link>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
