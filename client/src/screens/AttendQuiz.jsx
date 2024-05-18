// src/AttendQuiz.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axiosConfig";

const AttendQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/quiz/${id}`);
        setQuiz(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleOptionChange = (questionId, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`quiz/${id}/submit`, {
        answers,
      });
      setResult(response.data);
    } catch (err) {
      setError(err);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center mt-5">
        Error: {error.message}
      </div>
    );
    return (
      <div className="px-4">
          <h1 className="text-3xl font-bold text-center mb-8">{quiz.title}</h1>
          {quiz.questions.slice(0, currentQuestionIndex + 1).map((question, index) => (
              <div 
              key={question._id} 
              className={`mb-6 bg-gray-100 text-black rounded shadow-md p-6 ${index !== currentQuestionIndex ? 'hidden' : 'transition-opacity transition-transform'}`}
          >
          
                  <h2 className="text-lg font-semibold mb-4">{`Question ${index + 1}`}</h2>
                  <p className="text-lg mb-4">{question.text}</p>
                  <ul>
                      {question.options.map((option, optionIndex) => (
                          <li key={optionIndex} className="mb-2">
                              <label className="flex items-center">
                                  <input
                                      type="radio"
                                      name={`question-${question._id}`}
                                      value={option}
                                      checked={answers[question._id] === option}
                                      onChange={() => handleOptionChange(question._id, option)}
                                      className="form-radio text-indigo-600"
                                  />
                                  <span className="ml-2 text-lg">{option}</span>
                              </label>
                          </li>
                      ))}
                  </ul>
              </div>
          ))}
          <button
              onClick={currentQuestionIndex < quiz.questions.length - 1 ? handleNextQuestion : handleSubmit}
          >
              {currentQuestionIndex < quiz.questions.length - 1 ? 'Next' : 'Submit'}
          </button>
          {result && (
              <div className="mt-8 p-4 bg-teal-500 rounded shadow-md">
                  <h2 className="text-2xl font-bold text-center">Result</h2>
                  <p className="text-lg text-center mt-4">Your score: {result.score} / {result.total}</p>
              </div>
          )}
      </div>
  );
};

export default AttendQuiz;