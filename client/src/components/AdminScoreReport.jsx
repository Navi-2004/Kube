import React from "react";
import { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { Link } from "react-router-dom";
const AdminScoreReport = () => {
  const [quizzes, setQuizzes] = useState([]);

  const handleDelete = async (id) => {
    console.log("deleting");
    try {
      const response = await axios.delete(`/quiz/${id}`);
      alert("Quiz Deleted Successfully")
      window.location.reload();

      console.log(response.data.message);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("/quiz");
        setQuizzes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);
  return (
    <div>
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Quizzes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="border rounded-lg overflow-hidden shadow-md "
            >
              <div className="p-4">
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  {quiz.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{quiz.description}</p>
                <div className="flex">
                <Link to={`/quizReport/${quiz._id}`}>
                  <button className="block w-full  text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                    See Report
                  </button>
                </Link>

                <button
                  className="block   text-white font-bold py-2 px-4 rounded-lg transition duration-300 ml-4"
                  onClick={() => handleDelete(quiz._id)}
                >
                  Delete
                </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminScoreReport;
