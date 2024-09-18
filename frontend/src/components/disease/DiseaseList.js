import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DiseaseList = () => {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = auth.token;

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/diseases/', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          // Adjust here if API returns an object with a `data` property
          setDiseases(response.data.data || response.data); // Use response.data.data if needed
        } else {
          throw new Error('Unexpected response status');
        }
      } catch (error) {
        console.error('Error fetching diseases:', error);
        setError('Failed to fetch diseases. Please try again.');
        toast.error('Failed to fetch diseases');
      } finally {
        setLoading(false);
      }
    };

    fetchDiseases();
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this disease?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/diseases/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setDiseases((prevDiseases) =>
            prevDiseases.filter((disease) => disease._id !== id)
          );
          toast.success('Disease deleted successfully');
        } else {
          throw new Error('Unexpected response status');
        }
      } catch (error) {
        console.error('Error deleting disease:', error);
        toast.error('Failed to delete disease');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-t-4 border-blue-500 border-solid border-8 rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-600 mt-4">Loading diseases...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg font-medium text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Disease List</h2>
      {diseases.length > 0 ? (
        <div className="space-y-4">
          {diseases.map((disease) => (
            <div
              key={disease._id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{disease.name}</h3>
                {disease.symptoms && <p className="text-gray-600 mt-2">Symptoms: {disease.symptoms.join(', ')}</p>}
                {disease.affectedSpecies && <p className="text-gray-600 mt-2">Affected Species: {disease.affectedSpecies.join(', ')}</p>}
                {disease.treatment && <p className="text-gray-600 mt-2">Treatment: {disease.treatment}</p>}
                <p className={`mt-2 text-sm ${disease.severity === 'Severe' ? 'text-red-600' : disease.severity === 'Moderate' ? 'text-yellow-600' : 'text-green-600'}`}>
                  Severity: {disease.severity}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 flex space-x-2">
                <button
                  onClick={() => navigate(`/update-disease/${disease._id}`)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(disease._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No diseases available.</p>
      )}
    </div>
  );
};

export default DiseaseList;
