import React, { useState } from 'react';
import axios from '../axiosConfig';


const CreateQuiz = () => {
  const [questions, setQuestions] = useState([{ text: '', options: ['', '', ''], correctAnswer: '' }]);
  const [quizname,setQuizName]=useState('');
  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', '', ''], correctAnswer: '' }]);
  };

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newQuestions = [...questions];
    if (name.includes('option')) {
      const optionIndex = parseInt(name.replace('option', ''), 10);
      newQuestions[index].options[optionIndex] = value;
    } else {
      newQuestions[index][name] = value;
    }
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const quizData = { title: quizname, questions };

    try {
        const response = await axios.post('/quiz', quizData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 201) {
          alert('Quiz created successfully');
            console.log('Quiz created:', response.data);
        } else {
          alert('Failed to create quiz');
            console.error('Failed to create quiz');
        }
    } catch (err) {
        console.error('Error:', err);
    }
};


  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray rounded shadow-lg w-full">
    
        {/* <h1 className=''>Welcome To Kube</h1> */}
      <h2 className="text-2xl font-bold mb-4">Create Quiz</h2>
      <input 
      type="text" 
      className="block  border rounded px-4 py-2 mb-2 w-96 h-12"
      value={quizname}
      onChange={(event)=>{setQuizName(event.target.value)}}
      placeholder="Enter the quiz name:"
      />
      <form onSubmit={handleSubmit} className=''>
        {questions.map((question, index) => (
          <div key={index} className="mb-6">
            <label className="block font-semibold mb-2">Question {index + 1}</label>
            <input
              type="text"
              name={`text`}
              value={question.text}
              onChange={(event) => handleChange(index, event)}
              className="block  border rounded px-4 py-2 mb-2 w-96 h-24"
              placeholder="Enter your question"
            />
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="mb-2">
                <input
                  type="text"
                  name={`option${optionIndex}`}
                  value={option}
                  onChange={(event) => handleChange(index, event)}
                  className="border rounded px-4 py-2 mr-2"
                  placeholder={`Option ${optionIndex + 1}`}
                />
              </div>
            ))}
            <select
              name={`correctAnswer`}
              value={question.correctAnswer}
              onChange={(event) => handleChange(index, event)}
              className="block border rounded px-4 py-2 mb-2 mt-12 w-96"
            >
              <option value="" className='block border rounded px-4 py-2 mb-2 ml-11'>Select correct answer</option>
              {question.options.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>{option}</option>
              ))}
            </select>
          </div>
        ))}
        <button
          type="button"
          onClick={addQuestion}
        //   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Add Question
        </button>
        <button
          type="submit"
        //   className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
