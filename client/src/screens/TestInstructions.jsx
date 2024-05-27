import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import Navbar from "../components/Navbar";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
// import CustomFooter from "../components/CustomFooter";
import CustomFooter from "../components/CustomFooter";

const TestInstructions = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [attended, setAttended] = useState(false);
  const navigate = useNavigate();

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.userId;
    } else {
      navigate("/login");
    }
    return null;
  };

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await axios.get(`/quiz/${id}`);
        setQuiz(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err);
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
  }, [id]);

  if (attended) {
    return (
      <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="text-center mt-5">
            <h1 className="text-2xl font-bold mb-4">
              You have already attended this quiz
            </h1>
            <p className="text-lg text-blue-600">
              Feel free to explore other quizzes!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {quiz && (
        <div className="container mx-auto  px-4 py-12">
          <h1 className="text-3xl font-bold text-center mb-8">{quiz.title}</h1>
          <div className="text-lg mb-8">
            <h2 className="font-bold mb-2 text-center text-gray-400 text-xl">Test Instructions:</h2>
            <ul className="ml-auto mr-auto text-center list-none">
              <li className="mb-6 pb-3   text-lg text-white">
                <span className="font-semibold">1. </span>Read each question
                carefully before answering.
              </li>
              <li className="mb-6 pb-3 text-lg text-white">
                <span className="font-semibold">2. </span>Avoid any distractions
                during the test.
              </li>
              <li className="mb-6 pb-3  border-gray-300 text-lg text-white">
                <span className="font-semibold">3. </span>Use only the time
                provided to complete the test.
              </li>
              <li className="mb-6 pb-3  border-gray-300 text-lg text-white">
                <span className="font-semibold">4. </span>Keep your environment
                quiet to maintain focus.
              </li>
              <li className="mb-6 pb-3  border-gray-300 text-lg text-white">
                <span className="font-semibold">5. </span>Do not use any
                external resources or aids.
              </li>
              <li className="text-lg text-white">
                <span className="font-semibold">6. </span>Do not communicate
                with others during the test.
              </li>
            </ul>
          </div>
          <Link to={`/quiz/${id}`}>
            <button className="block mx-auto border text-white font-bold py-2 px-4 rounded">
              Start Quiz
            </button>
          </Link>
        </div>
      )}
      <CustomFooter />
    </div>
  );
};

export default TestInstructions;
