/* eslint-disable react/prop-types */
import { useState } from "react";
import { createPlant } from "../../../services/plantService.js";

const sunlightOptions = [
  { value: "Full Sun", label: "Full Sun" },
  { value: "Partial Shade", label: "Partial Shade" },
  { value: "Full Shade", label: "Full Shade" },
];

const PlantForm = ({ onPlantAdded }) => {
  const [plantData, setPlantData] = useState({
    name: "",
    scientificName: "",
    family: "",
    origin: "",
    description: "",
    sunlight: "fullSun",
    waterFrequency: "",
    soilType: "",
    minTemperature: "",
    maxTemperature: "",
    bloomTime: "",
    height: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlantData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPlant(plantData);
    if (onPlantAdded) onPlantAdded(); // Refresh the plant list and switch view
  };

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-xl"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Plant</h2>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="text"
          name="name"
          id="name"
          value={plantData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="scientificName"
        >
          Scientific Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="text"
          name="scientificName"
          id="scientificName"
          value={plantData.scientificName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="family"
        >
          Family
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="text"
          name="family"
          id="family"
          value={plantData.family}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="origin"
        >
          Origin
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="text"
          name="origin"
          id="origin"
          value={plantData.origin}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          name="description"
          id="description"
          value={plantData.description}
          onChange={handleChange}
          rows="4"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="sunlight"
        >
          Sunlight Requirements
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          name="sunlight"
          id="sunlight"
          value={plantData.sunlight}
          onChange={handleChange}
        >
          {sunlightOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="waterFrequency"
        >
          Water Frequency
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="text"
          name="waterFrequency"
          id="waterFrequency"
          value={plantData.waterFrequency}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="soilType"
        >
          Soil Type
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="text"
          name="soilType"
          id="soilType"
          value={plantData.soilType}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="minTemperature"
        >
          Minimum Temperature (°F)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="number"
          name="minTemperature"
          id="minTemperature"
          value={plantData.minTemperature}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="maxTemperature"
        >
          Maximum Temperature (°F)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="number"
          name="maxTemperature"
          id="maxTemperature"
          value={plantData.maxTemperature}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="bloomTime"
        >
          Bloom Time
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="text"
          name="bloomTime"
          id="bloomTime"
          value={plantData.bloomTime}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="height"
        >
          Height (in inches)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="number"
          name="height"
          id="height"
          value={plantData.height}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-lg font-bold mb-2"
          htmlFor="imageUrl"
        >
          Image URL
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="text"
          name="imageUrl"
          id="imageUrl"
          value={plantData.imageUrl}
          onChange={handleChange}
        />
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Add Plant
      </button>
    </form>
  );
};

export default PlantForm;
