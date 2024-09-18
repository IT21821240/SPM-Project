import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import DiseaseList from './DiseaseList';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import dashboardImage from '../images/dashboardInImage.jpg';
import dashboardInnerImage from '../images/dashboardInImage.jpg';

const Dashboard = () => {
  const { auth, logout } = useContext(AuthContext);
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const token = auth.token;

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const fetchDiseases = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/diseases', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          setDiseases(response.data);
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
  }, [token, navigate]);

  const handleLogout = async () => {
    try {
      await logout(navigate);
      toast.success('Logout successful');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Failed to log out');
    }
  };

  const handleCreateDisease = () => {
    navigate('/create-disease');
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Centered Title
    doc.setFontSize(18);
    doc.text('Disease Report', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });

    // Column names
    const columns = ['#', 'Disease Name', 'Symptoms', 'Treatment'];

    // Rows with data
    const rows = diseases.data.map((disease, index) => [
      index + 1,
      disease.name,
      disease.symptoms.join(', '),
      disease.treatment,
    ]);

    // Adding table to the PDF
    doc.autoTable({
      startY: 30,
      head: [columns],
      body: rows,
      theme: 'grid', // Adds borders to the table
      margin: { top: 30 },
      didDrawPage: function (data) {
        // Footer with page number
        const totalPagesExp = '{total_pages_count_string}';
        const str = `Page ${doc.internal.getNumberOfPages()}`;
        doc.setFontSize(10);
        doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 10);
        if (typeof doc.putTotalPages === 'function') {
          doc.putTotalPages(totalPagesExp);
        }
      },
    });

    // Handle total page count
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages('{total_pages_count_string}');
    }

    // Save the PDF
    doc.save('disease_report.pdf');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg font-medium text-gray-600">Loading diseases...</p>
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
    <div className="relative min-h-screen">
      {/* Background Image */}
      <img
        src={dashboardImage}
        alt="Dashboard Background"
        className="absolute inset-0 w-full h-full object-cover" // Ensure image covers the container
        style={{ zIndex: -1 }} // Keep image behind other content
      />
      {/* Optional Overlay */}
      <div className="absolute inset-0 bg-black opacity-30" style={{ zIndex: -1 }}></div>

      <div className="relative max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Inner Card Container */}
        <div className="relative bg-cover bg-center rounded-lg shadow-lg overflow-hidden" style={{ backgroundImage: `url(${dashboardInnerImage})` }}>
          <div className="absolute inset-0 bg-black opacity-30"></div> {/* Optional overlay */}
          <div className="relative z-10 px-4 py-5 sm:px-6 bg-white bg-opacity-80 rounded-lg shadow-md">
            <div className="border-b border-gray-200 mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome to the Plant Diseases Dashboard, {auth.user?.username || auth.user?.email}
              </h1>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleCreateDisease}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Add New Disease
                </button>
                <button
                  onClick={generatePDF}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Generate Report
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
            <div>
              {diseases.length === 0 ? (
                <p className="text-lg font-medium text-gray-600 text-center">No diseases available.</p>
              ) : (
                <DiseaseList diseases={diseases} />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Plant Disease Tracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
