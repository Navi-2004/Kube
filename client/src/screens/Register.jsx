import React, { useState } from "react";
import axios from "../axiosConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/register", {
        name,
        username,
        password,
      });
      setMessage(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      setMessage("Error registering user");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
    <div className="max-w-md mx-auto p-6  rounded-lg shadow-md  w-full">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500"
            placeholder="Name"
            required
          />
        </div>
        <div className="mb-4">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500"
            placeholder="Username"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-500"
            placeholder="Password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full border-white text-white font-bold py-2 px-4 rounded  focus:outline-none focus:bg-blue-700"
        >
          Register
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
    </div>
  );
};

export default Register;
