import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import AdminScoreReport from "../components/AdminScoreReport";

const Admin = () => {
  return (
    <div>
      <Navbar />
      <div>
        <div className="mt-8 mb-4 text-center">
          <h2 className="text-3xl font-bold mb-2 ">Welcome to Kube Quiz App</h2>
          <div className="flex lg:gap-36 sm:gap-10 lg:ml-48 lg:mt-10">
            <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center">
              <p className="text-lg mb-4 text-white">
                Create a quiz and challenge your friends by quizzes!
              </p>
              <Link to="/create">
                <button className="border-white  text-white font-bold py-2 px-4 rounded transition duration-300">
                  Create Quiz
                </button>
              </Link>
            </div>

            <div className="bg-gray-900 p-8 rounded-lg shadow-lg text-center">
              <p className="text-lg mb-4">
                Add the user and challenge with interactive quizzes!
              </p>
              <Link to="/register">
                <button className="border-white  text-white font-bold py-2 px-4 rounded transition duration-300">Add User</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <AdminScoreReport />
    </div>
  );
};

export default Admin;
