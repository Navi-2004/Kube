import React from "react";
import Navbar from "../components/Navbar";
import CustomFooter from "../components/CustomFooter";
import teamImage from "../assets/student.gif";
import missionImage from "../assets/exam.gif";

const About = () => {
  return (
    <div className="container mx-auto">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Us</h1>

        <div className="flex flex-col lg:flex-row items-center mb-12 border lg:w-2/4 mx-auto bg-gray-900 p-7 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-800">
          <img src={missionImage} alt="Mission" className="rounded-lg shadow-md mb-4 lg:mb-0 lg:mr-8 transform transition duration-300 ease-in-out hover:scale-110" />
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-4 text-white">Our Mission</h2>
            <p className="text-lg text-white">
              Our mission is to provide an engaging and interactive platform for users to take quizzes on a variety of topics. We aim to enhance learning and knowledge retention through fun and challenging quizzes.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center mb-12 border lg:w-2/4 mx-auto bg-gray-900 p-7 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-800">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-4 text-white">Meet the Team</h2>
            <p className="text-lg text-white">
              Our team is composed of passionate educators, developers, and designers who are dedicated to creating the best quiz experience possible. We believe in the power of learning through play and strive to make every quiz enjoyable and educational.
            </p>
          </div>
          <img src={teamImage} alt="Team" className="rounded-lg shadow-md mb-4 lg:ml-16 mt-5 transform transition duration-300 ease-in-out hover:scale-110" />
        </div>
      </div>
      <CustomFooter />
    </div>
  );
};

export default About;
