// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from "../axiosConfig";
// import Navbar from "../components/Navbar";
// import Banner from "../components/Banner";
// import Footer from "../components/Footer";
// import CustomFooter from "../components/CustomFooter";
// import { useRef } from "react";


// const Home = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const quizSectionRef = useRef(null); 

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await axios.get("/quiz");
//         setQuizzes(response.data);
//       } catch (error) {
//         console.error("Error fetching quizzes:", error);
//       }
//     };

//     fetchQuizzes();
//   }, []); // Empty dependency array to run effect only once on mount

//   return (
//     <div className="container mx-auto ">
//       <Navbar />
//       <Banner />
//       <div className="container mx-auto lg:px-4 lg:ml-12 sm:px-0  py-12">
//         <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
//           Quizzes
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {quizzes.map((quiz) => (
//             <div
//               key={quiz._id}
//               className="border rounded-lg overflow-hidden shadow-md  lg:w-96 sm:w-48"
//             >
//               <div className="p-4 ">
//                 <h3 className="text-lg md:text-xl font-bold mb-2">
//                   {quiz.title}
//                 </h3>
//                 <p className="text-sm text-gray-600 mb-4">{quiz.description}</p>
//                 <Link to={`/quiz/${quiz._id}`}>
//                   <button className="block w-full  text-white font-bold py-2 px-4 rounded-lg transition duration-300">
//                     Attend Quiz
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//       <CustomFooter />
//     </div>
//   );
// };
// export default Home;
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "../axiosConfig";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import CustomFooter from "../components/CustomFooter";

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);
  const quizSectionRef = useRef(null); // Create a ref for the quiz section

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("/quiz");
        setQuizzes(response.data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []); 

  return (
    <div className="container mx-auto ">
      <Navbar />
      <Banner scrollToQuizSection={() => quizSectionRef.current.scrollIntoView({ behavior: 'smooth' })} />
      <div ref={quizSectionRef} className="container mx-auto lg:px-4 lg:ml-12 sm:px-0  py-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Quizzes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizzes.map((quiz) => (
            <div
              key={quiz._id}
              className="border rounded-lg overflow-hidden shadow-md  lg:w-96 sm:w-48"
            >
              <div className="p-4 ">
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  {quiz.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{quiz.description}</p>
                <Link to={`/quiz/${quiz._id}`}>
                  <button className="block w-full  text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                    Attend Quiz
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CustomFooter />
    </div>
  );
};

export default Home;
