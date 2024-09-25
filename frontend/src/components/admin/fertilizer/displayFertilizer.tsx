import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateFertilizer from './createFertilizer'; 
import UpdateFertilizer from './updateFertilizer'; 

interface Fertilizer {
  _id: string;
  name: string;
  type: string;
  description: string;
  nutrientContent: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
  imageUrl: string; // Add imageUrl field
}

const FertilizerDisplay: React.FC = () => {
  const [fertilizers, setFertilizers] = useState<Fertilizer[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedFertilizer, setSelectedFertilizer] = useState<Fertilizer | null>(null);

  useEffect(() => {
    fetchFertilizers();
  }, []);

  const fetchFertilizers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/fertilizers');
      setFertilizers(response.data);
    } catch (error) {
      console.error('Error fetching fertilizers:', error);
    }
  };

  const handleCreateFertilizer = () => {
    setIsAdding(true);
  };

  const handleUpdateFertilizer = (fertilizer: Fertilizer) => {
    setSelectedFertilizer(fertilizer);
    setIsUpdating(true);
  };

  const handleDeleteFertilizer = async (fertilizerId: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/fertilizers/${fertilizerId}`);
      setFertilizers(fertilizers.filter(fertilizer => fertilizer._id !== fertilizerId));
    } catch (error) {
      console.error('Error deleting fertilizer:', error);
      alert('Failed to delete fertilizer');
    }
  };

  const handleBackToList = () => {
    setIsAdding(false);
    setIsUpdating(false);
    setSelectedFertilizer(null);
    fetchFertilizers();
  };

  return (
    <div className="container mx-auto p-6">
      {isAdding ? (
        <CreateFertilizer onBack={handleBackToList} />
      ) : isUpdating && selectedFertilizer ? (
        <UpdateFertilizer fertilizer={selectedFertilizer} onBack={handleBackToList} />
      ) : (
        <>
          <button
            onClick={handleCreateFertilizer}
            className="mb-6 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Add New Fertilizer
          </button>
          <h2 className="text-3xl font-bold text-center mb-6 text-green-600">Available Fertilizers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {fertilizers.length > 0 ? (
              fertilizers.map(fertilizer => (
                <div key={fertilizer._id} className="bg-white shadow-lg rounded-lg p-6">
                  <img
                    src={fertilizer.imageUrl}
                    alt={fertilizer.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{fertilizer.name}</h3>
                  <p className="text-gray-600 mb-2 font-semibold">Type: {fertilizer.type}</p>
                  <p className="text-gray-600 mb-4">{fertilizer.description}</p>
                  <div className="text-sm">
                    <p className="mb-1">
                      <strong>Nitrogen:</strong> {fertilizer.nutrientContent.nitrogen}%
                    </p>
                    <p className="mb-1">
                      <strong>Phosphorus:</strong> {fertilizer.nutrientContent.phosphorus}%
                    </p>
                    <p className="mb-1">
                      <strong>Potassium:</strong> {fertilizer.nutrientContent.potassium}%
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => handleUpdateFertilizer(fertilizer)}
                      className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteFertilizer(fertilizer._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No fertilizers available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FertilizerDisplay;
