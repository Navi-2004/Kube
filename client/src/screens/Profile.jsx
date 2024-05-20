import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../components/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import {jwtDecode} from "jwt-decode";
import Navbar from "../components/Navbar";
import { Line } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Profile() {
  const { token, loading } = useContext(AuthContext);
  const [userQuizzes, setUserQuizzes] = useState([]);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const userId = getUserIdFromToken();
        const response = await axios.get(`/user/name/${userId}`);
        setUserName(response.data);
      } catch (err) {
        console.log(`Error fetching user name: ${err}`);
      }
    };

    if (token) {
      fetchUserName();
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (loading) {
    return null;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const lastFiveQuizzes = userQuizzes.slice(-5);
  const chartData = {
    labels: lastFiveQuizzes.map((quiz) => quiz.quizName),
    datasets: [
      {
        label: "Score",
        data: lastFiveQuizzes.map((quiz) => quiz.marks),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8 lg:ml-24 w-full flex justify-between items-center">
        <h2 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-800 via-blue-900 to-black">
          Hello, {userName}!
        </h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300 lg:mr-48 mb-4"
        >
          Logout
        </button>
      </div>

      <div className="container mx-auto px-2 py-8 w-full flex justify-center">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl">
          <h2 className="text-3xl font-bold mb-4 text-center">Last 5 Quiz Scores</h2>
          <Line data={chartData} />
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 w-full max-w-5xl">
        <h2 className="text-3xl font-bold mb-4 text-center">Past Quizzes</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {userQuizzes.map((quiz) => (
            <li key={quiz._id} className="dark:bg-gray-800 bg-white p-4 rounded shadow">
              <p className="text-lg font-semibold">{quiz.quizName}</p>
              <p className="text-sm">
                Score: {quiz.marks}/{quiz.total}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Profile;
