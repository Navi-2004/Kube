import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import { Navigate } from "react-router-dom";
import axios from "../axiosConfig";
import { jwtDecode } from "jwt-decode";
import Navbar from '../components/Navbar'

function Profile() {
  const { token, loading } = useContext(AuthContext);
  const [userQuizzes, setUserQuizzes] = useState([]);
  const [error, setError] = useState(null);

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.userId;
    }
    return null;
  };

  useEffect(() => {
    const fetchUserQuizzes = async () => {
      try {
        const userId = getUserIdFromToken();
        if (!userId) {
          throw new Error("User ID not found in token");
        }
        const response = await axios.get(`/user/${userId}/quizzes`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserQuizzes(response.data);
      } catch (err) {
        setError(err);
      }
    };

    if (token) {
      fetchUserQuizzes();
    }
  }, [token]);

  if (loading) {
    return null;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Navbar />
    <div className="container mx-auto px-4 py-8 lg:m-24 w-96 ">
      <h2 className="text-3xl font-bold mb-4">Quizzes</h2>
      <ul className="space-y-4">
        {userQuizzes.map((quiz) => (
          <li key={quiz._id} className="dark:bg-gray-800 p-4 rounded shadow ">
            <p className="text-lg font-semibold">{quiz.quizName}</p>
            <p className="text-sm">Score: {quiz.marks}/{quiz.total}</p>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

export default Profile;
