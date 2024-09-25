import React, { useState } from 'react';
import axios from 'axios';

interface UpdateFertilizerProps {
  fertilizer: {
    _id: string;
    name: string;
    type: string;
    description: string;
    nutrientContent: {
      nitrogen: number;
      phosphorus: number;
      potassium: number;
    };
    imageUrl: string;
  };
  onBack: () => void;
}

const UpdateFertilizer: React.FC<UpdateFertilizerProps> = ({ fertilizer, onBack }) => {
  const [formData, setFormData] = useState({
    name: fertilizer.name,
    type: fertilizer.type,
    description: fertilizer.description,
    nitrogen: fertilizer.nutrientContent.nitrogen,
    phosphorus: fertilizer.nutrientContent.phosphorus,
    potassium: fertilizer.nutrientContent.potassium,
    imageUrl: fertilizer.imageUrl,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/fertilizers/${fertilizer._id}`, {
        name: formData.name,
        type: formData.type,
        description: formData.description,
        nutrientContent: {
          nitrogen: formData.nitrogen,
          phosphorus: formData.phosphorus,
          potassium: formData.potassium,
        },
        imageUrl: formData.imageUrl,
      });
      alert('Fertilizer updated successfully!');
      onBack();
    } catch (error) {
      console.error('Error updating fertilizer:', error);
      alert('Failed to update fertilizer');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
      <button onClick={onBack} className="mb-4 text-blue-100 hover:underline bg-green-500 hover:bg-green-700">Back to List</button>
      <h2 className="text-4xl font-semibold text-center mb-6 text-green-700">Update Fertilizer</h2>
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
              onChange={(e) => setFormData({ ...formData, nitrogen: +e.target.value })}
              placeholder="Nitrogen"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Phosphorus (%)</label>
            <input
              type="number"
              value={formData.phosphorus}
              onChange={(e) => setFormData({ ...formData, phosphorus: +e.target.value })}
              placeholder="Phosphorus"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Potassium (%)</label>
            <input
              type="number"
              value={formData.potassium}
              onChange={(e) => setFormData({ ...formData, potassium: +e.target.value })}
              placeholder="Potassium"
              required
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
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Update Fertilizer
        </button>
      </form>
    </div>
  );
};

export default UpdateFertilizer;
