import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";

const AttendQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [attended, setAttended] = useState(false);
  const [switchedTab, setSwitchedTab] = useState(false);
  const navigate = useNavigate();

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.userId;
    }
    else{
      navigate("/login");
    }
    return null;
  };

  
  const handleSubmit = async (title) => {
    try {
      const response = await axios.post(`quiz/${id}/submit`, {
        answers,
      });
  
      if (!response.data) {
        throw new Error("Invalid response data");
      }
  
      setResult(response.data);
  
      await axios.post("/quiz/quiz-results", {
        userId: await getUserIdFromToken(),
        quizId: id,
        quizName: title,
        marks: response.data.score,
        total: response.data.total,
      });
  
      document.exitFullscreen();

      navigate("/viewresult", { state: { result: response.data } });
      
      console.log("Quiz result stored successfully");
    } catch (err) {
      console.error("Error submitting quiz:", err);
      setError(err);
    }
  };
  
  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await axios.get(`/quiz/${id}`);
        setQuiz(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, [id]);

  useEffect(() => {
    const checkQuizCompletion = async () => {
      try {
        const userId = getUserIdFromToken();
        if (userId) {
          const response = await axios.get(`/quiz/attended/${userId}/${id}`);
          if (response.data.length > 0) {
            setAttended(true);
          }
        }
      } catch (err) {
        console.error("Error checking quiz completion:", err);
      }
    };

    checkQuizCompletion();

    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'hidden') {
        await handleSubmit("Plagarised Quiz");
        alert("You switched tabs or minimized the window. Submitting the quiz...");
        
      }
    };

    const handleFullscreenChange = async () => {
      if (!document.fullscreenElement) {
        await handleSubmit("Plagiarized Quiz");
        alert("You exited fullscreen mode. Submitting the quiz...");
      }
    };

    const requestFullScreen = () => {
      const element = document.documentElement;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) { 
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) { 
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) { 
        element.msRequestFullscreen();
      }
    };

    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    requestFullScreen();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);

    };
  

  }, [id, answers]);

  const handleOptionChange = (questionId, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };
  if(switchedTab)
    {
      return <h1>Submiting the form........</h1>
    }
  if (error)
    return (
      <div className="text-red-500 text-center mt-5">
        Error: {error.message}
      </div>
    );

  if (attended) {
    return (
      <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-center mt-5">
            <h1 className="text-2xl font-bold mb-4">You have already attended this quiz</h1>
            <p className="text-lg text-blue-600">Feel free to explore other quizzes!</p>
          </div>
        </div>
      </div>
    );
  }

  
  if (!attended && loading) {
    return (
      <div>
        <Navbar />
        <div className="text-center mt-5">Loading...</div>
      </div>
    );
  }

  if(!switchedTab)
    {
  return (
    <div>
      <Navbar />
      <div className="px-4 mt-24">
        <h1 className="text-3xl font-bold text-center mb-8">{quiz.title}</h1>
        {quiz.questions.slice(0, currentQuestionIndex + 1).map((question, index) => (
          <div
            key={question._id}
            className={`mb-6 bg-gray-100 text-black rounded shadow-md p-6 ${
              index !== currentQuestionIndex ? "hidden" : "transition-opacity transition-transform"
            }`}
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
  onClick={currentQuestionIndex < quiz.questions.length - 1 ? handleNextQuestion : () => handleSubmit(quiz.title)}
  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
>
  {currentQuestionIndex < quiz.questions.length - 1 ? "Next" : "Submit"}
</button>

        {result && (
          <div className="mt-8 p-4 bg-gray-800 rounded shadow-md">
            <h2 className="text-2xl font-bold text-center">Result</h2>
            <p className="text-lg text-center mt-4">{`Your score: ${result.score} / ${result.total}`}</p>
          </div>
        )}
      </div>
    </div>
  );
};

}
export default AttendQuiz;
