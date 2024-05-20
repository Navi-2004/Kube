// ViewResult.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";


const ViewResult = () => {
  const location = useLocation();
  const result = location.state.result;

  return (
    <div>
      <Navbar />
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-green-500 mb-4">Congratulations!</h1>
        <p className="text-xl text-white mb-6">You have completed the quiz.</p>
        <div className="text-lg text-gray-800">
          <p className="mb-2 text-white">
            Your score: <span className="font-bold text-yellow-500">{result.score}</span>
          </p>
          <p className="text-white">
            Total questions: <span className="font-bold text-orange-500">{result.total}</span>
          </p>
          <Link to="/">
            <button className="border-blue-600 bg-white hover:bg-slate-400 hover:text-black mt-5">Go to home</button>
            </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ViewResult;
