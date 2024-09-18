import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlantById, updatePlant } from "../../../services/plantService.js";

const UpdatePlantForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    const fetchPlant = async () => {
      const plantData = await getPlantById(id);
      setPlant(plantData);
    };

    fetchPlant();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlant((prevPlant) => ({
      ...prevPlant,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePlant(id, plant);
      navigate("/");
    } catch (error) {
      console.error("Failed to update the plant:", error);
    }
  };

  if (!plant) return <p>Loading...</p>;

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Update Plant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Name</span>
          <input
            type="text"
            name="name"
            value={plant.name}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Scientific Name</span>
          <input
            type="text"
            name="scientificName"
            value={plant.scientificName}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Family</span>
          <input
            type="text"
            name="family"
            value={plant.family}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Origin</span>
          <input
            type="text"
            name="origin"
            value={plant.origin}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Description</span>
          <textarea
            name="description"
            value={plant.description}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Sunlight</span>
          <select
            name="sunlight"
            value={plant.careInstructions.sunlight}
            onChange={handleChange}
            className="form-select mt-1 block w-full"
            required
          >
            <option value="fullSun">Full Sun</option>
            <option value="partialShade">Partial Shade</option>
            <option value="shade">Shade</option>
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">Water Frequency</span>
          <input
            type="text"
            name="waterFrequency"
            value={plant.careInstructions.waterFrequency}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Soil Type</span>
          <input
            type="text"
            name="soilType"
            value={plant.careInstructions.soilType}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Min Temperature (°F)</span>
          <input
            type="number"
            name="minTemperature"
            value={plant.careInstructions.temperatureRange.min}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Max Temperature (°F)</span>
          <input
            type="number"
            name="maxTemperature"
            value={plant.careInstructions.temperatureRange.max}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Bloom Time</span>
          <input
            type="text"
            name="bloomTime"
            value={plant.bloomTime}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Height (inches)</span>
          <input
            type="number"
            name="height"
            value={plant.height}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Image URL</span>
          <input
            type="text"
            name="imageUrl"
            value={plant.imageUrl}
            onChange={handleChange}
            className="form-input mt-1 block w-full"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Plant
        </button>
      </form>
    </div>
  );
};

export default UpdatePlantForm;
