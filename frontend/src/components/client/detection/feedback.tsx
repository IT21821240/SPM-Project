import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BG from "../../../assets/feedback.jpeg";
import Header from "../../common/section/Header";
import Footer from "../../common/section/Footer";

type FeedbackType = {
  name: string;
  feedback: string;
};

const Feedback = () => {
  // State for form inputs and feedback list
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState<FeedbackType[]>([]);

  // Fetch feedback from backend
  const fetchFeedback = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/feedback/getFeedback');
      setFeedbackList(response.data);
    } catch (error) {
      console.error('Error fetching feedback', error);
    }
  };

  // Fetch feedback on component mount
  useEffect(() => {
    fetchFeedback();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/feedback/createFeedback', { name, feedback });
      setFeedbackList([...feedbackList, response.data]); // Add new feedback to the list
      setName(''); // Reset name field
      setFeedback(''); // Reset feedback field
    } catch (error) {
      console.error('Error submitting feedback', error);
    }
  };

  return (
    <>
    <div> <Header /></div>
   <br></br>
    <div className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{ backgroundImage: `url(${BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        {/* Feedback Form */}
        <h1 className="text-3xl font-semibold text-center mb-6 text-3xl">Share Your Feedback</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="block w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500"
            required />
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Your Feedback"
            className="block w-full p-3 border rounded-lg focus:outline-none focus:border-indigo-500 h-32"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-green-600 text-white py-3 px-6 rounded-lg w-full hover:bg-green-700 transition duration-200"
          >
            Submit Feedback
          </button>
        </form>

        {/* Display Feedback */}
        <h2 className="text-xl font-bold mt-8">Feedbacks of our users</h2>
        {feedbackList.length === 0 ? (
          <p className="mt-4 text-gray-600">No feedback available yet.</p>
        ) : (
          <ul className="space-y-4 mt-4">
            {feedbackList.map((fb, index) => (
              <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                <strong className="block text-green-600">{fb.name}:</strong>
                <p>{fb.feedback}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Feedback;
