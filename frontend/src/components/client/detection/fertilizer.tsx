import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from "../../common/section/Header";
import Footer from "../../common/section/Footer";

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
  imageUrl: string; 
}

const FertilizerDisplay: React.FC = () => {
  const [fertilizers, setFertilizers] = useState<Fertilizer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term

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

  // Filter the fertilizers based on the search term
  const filteredFertilizers = fertilizers.filter(fertilizer =>
    fertilizer.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div><Header /></div>
      <br />
      <div className="container mx-auto p-6">
        <br /><br />
        <h2 className="text-3xl font-bold text-center mb-6 text-green-600">Get to know About Fertilizers</h2>
        {/* Paragraph about fertilizers */}
        <p className="text-center text-lg mb-6 text-gray-700">
          Fertilizers are substances that provide essential nutrients to plants, improving growth and productivity. 
          They come in various types, offering different compositions of nitrogen, phosphorus, and potassium to meet 
          specific plant needs. Explore our collection of fertilizers to learn more and find the right one for your crops.
        </p>

        {/* Search bar */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search by fertilizer type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-1/2"
          />
        </div>

        {/* Fertilizer list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredFertilizers.length > 0 ? (
            filteredFertilizers.map(fertilizer => (
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
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No fertilizers available.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FertilizerDisplay;
