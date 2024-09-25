import React, { useState } from 'react';
import axios from 'axios';

interface CreateFertilizerProps {
  onBack: () => void;
}

const CreateFertilizer: React.FC<CreateFertilizerProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    nitrogen: 0,
    phosphorus: 0,
    potassium: 0,
    imageUrl: '', // Add imageUrl field
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/fertilizers', {
        name: formData.name,
        type: formData.type,
        description: formData.description,
        nutrientContent: {
          nitrogen: formData.nitrogen,
          phosphorus: formData.phosphorus,
          potassium: formData.potassium,
        },
        imageUrl: formData.imageUrl, // Include imageUrl in the request
      });
      setFormData({
        name: '',
        type: '',
        description: '',
        nitrogen: 0,
        phosphorus: 0,
        potassium: 0,
        imageUrl: '', // Reset imageUrl field
      });
      alert('Fertilizer created successfully!');
      onBack(); // Call onBack to return to the list
    } catch (error) {
      console.error('Error creating fertilizer:', error);
      alert('Failed to create fertilizer');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <button onClick={onBack} className="mb-4 text-blue-100 hover:underline bg-green-500 hover:bg-green-700">Back to List</button>
      <h2 className="text-4xl font-semibold text-center mb-6 text-green-700">Add A New Fertilizer</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Fertilizer Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Fertilizer Name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Type</label>
          <input
            type="text"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            placeholder="Type"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Description"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Nitrogen (%)</label>
            <input
              type="number"
              value={formData.nitrogen}
              onChange={(e) => setFormData({ ...formData, nitrogen: parseInt(e.target.value) })}
              placeholder="Nitrogen %"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Phosphorus (%)</label>
            <input
              type="number"
              value={formData.phosphorus}
              onChange={(e) => setFormData({ ...formData, phosphorus: parseInt(e.target.value) })}
              placeholder="Phosphorus %"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Potassium (%)</label>
            <input
              type="number"
              value={formData.potassium}
              onChange={(e) => setFormData({ ...formData, potassium: parseInt(e.target.value) })}
              placeholder="Potassium %"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            placeholder="Image URL"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white text-xl font-semibold py-2 rounded-lg"
        >
          Add Fertilizer
        </button>
      </form>
    </div>
  );
};

export default CreateFertilizer;
