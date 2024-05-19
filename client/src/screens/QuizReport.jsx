// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from '../axiosConfig';

// const QuizReport = () => {
//   const { id } = useParams();
//   const [quizReport, setQuizReport] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchQuizReport = async () => {
//       try {
//         const response = await axios.get(`/quiz/report/${id}`);
//         setQuizReport(response.data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuizReport();
//   }, [id]);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-4">Quiz Report</h1>
//       {loading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div>Error: {error}</div>
//       ) : quizReport ? (
//         <div>
//           <p className="mb-2">Quiz ID: {quizReport.quizId}</p>
//           <p className="mb-2">Quiz Name: {quizReport.quizName}</p>
//           <p className="mb-4">Total Attendees: {quizReport.attendees.length}</p>
//           <h2 className="text-lg font-semibold mb-2">Attendees:</h2>
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
//                   <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200 text-black">
//                 {quizReport.attendees.map((attendee) => (
//                   <tr key={attendee.userId}>
//                     <td className="px-6 py-4 whitespace-nowrap">{attendee.userId}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{attendee.marks}</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{attendee.total}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ) : (
//         <div>No quiz report available</div>
//       )}
//     </div>
//   );
// };

// export default QuizReport;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axiosConfig';

const QuizReport = () => {
  const { id } = useParams();
  const [quizReport, setQuizReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState({}); // To store user details

  useEffect(() => {
    const fetchQuizReport = async () => {
      try {
        const response = await axios.get(`/quiz/report/${id}`);
        setQuizReport(response.data);
        const userIds = Array.from(new Set(response.data.attendees.map((attendee) => attendee.userId)));
        await Promise.all(userIds.map(async (userId) => {
          const userResponse = await axios.get(`/user/${userId}`);
          setUserDetails((prevDetails) => ({
            ...prevDetails,
            [userId]: userResponse.data.name, 
          }));
        }));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizReport();
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Quiz Report</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error}</div>
      ) : quizReport ? (
        <div>
          <p className="mb-2">Quiz ID: {quizReport.quizId}</p>
          <p className="mb-2">Quiz Name: {quizReport.quizName}</p>
          <p className="mb-4">Total Attendees: {quizReport.attendees.length}</p>
          <h2 className="text-lg font-semibold mb-2">Attendees:</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 text-black">
                {quizReport.attendees.map((attendee) => (
                  <tr key={attendee.userId}>
                    <td className="px-6 py-4 whitespace-nowrap">{attendee.userId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{userDetails[attendee.userId]}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{attendee.marks}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{attendee.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>No quiz report available</div>
      )}
    </div>
  );
};

export default QuizReport;
