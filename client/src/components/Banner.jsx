// import React from 'react';
// import student from '../assets/student.gif';
// import exam from '../assets/exam.gif';
// import success from '../assets/success.png';

// const Banner = () => {
//   return (
//     <div className="bg-gray-100 dark:bg-gray-800 py-20">
//       <div className="flex flex-col md:flex-row items-center justify-between p-8 max-w-screen-xl mx-auto">
//         <div className="md:w-1/2 text-center md:text-left">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
//             Welcome to Kube Quiz!
//           </h1>
//           <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
//             Test your knowledge about everything with our interactive quizzes.
//             Challenge yourself and improve your skills!
//           </p>
//           <button className="bg-black-500 border-white text-white py-3 px-6 rounded-lg hover:bg-white hover:text-black lg:mt-1 transition transform hover:-translate-y-1">
//             Get Started
//           </button>
//         </div>
        
//         <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 md:mt-0">
//           <img src={success} alt="Student" className="rounded-lg shadow-lg  h-full  lg:ml-60 sm:ml-0 w-full " />
//           {/* <img src={exam} alt="Exam" className="rounded-lg shadow-lg  mt-36 ml-24 " /> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Banner;
import React from 'react';
import student from '../assets/student.gif';
import exam from '../assets/exam.gif';
import success from '../assets/success.png';

const Banner = ({ scrollToQuizSection }) => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-20">
      <div className="flex flex-col md:flex-row items-center justify-between p-8 max-w-screen-xl mx-auto">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Welcome to Kube Quiz!
          </h1>
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            Test your knowledge about everything with our interactive quizzes.
            Challenge yourself and improve your skills!
          </p>
          <button 
            onClick={scrollToQuizSection}
            className="bg-blue-900 border border-white text-white py-3 px-6 rounded-lg hover:bg-white hover:text-black lg:mt-1 transition transform hover:-translate-y-1"
          >
            Get Started
          </button>
        </div>
        
        <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 md:mt-0">
          <img src={success} alt="Student" className="rounded-lg shadow-lg  h-full  lg:ml-60 sm:ml-0 w-full " />
        </div>
      </div>
    </div>
  );
};

export default Banner;
