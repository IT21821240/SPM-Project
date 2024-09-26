import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlantById, updatePlant } from "../../../services/plantService.js";

const ViewPlant = ({ id, viewChange }) => {
  // const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlantData] = useState(null);

  useEffect(() => {
    const fetchPlant = async () => {
      const plantData = await getPlantById(id);
      setPlantData(plantData);
    };

    fetchPlant();
  }, [id]);

  if (!plant) return <p>Loading...</p>;

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-xl"
      onSubmit={() => {}}
    >
      <h2 className="text-2xl font-bold mb-4"></h2>

      <div className="flex">
        <div className="w-1/2 pr-4">
          {/* Left column */}

          <div className="mb-4">
            {/* new code */}
            {/* <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="imageUpload"
            >
              Plant Image
            </label> */}
            <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden mb-2">
              <img
                src={plant.imageUrl}
                alt="Plant preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

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
              value={plant.name}
              disabled
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
              value={plant.scientificName}
              disabled
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
              value={plant.family}
              disabled
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
              value={plant.origin}
              disabled
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
              value={plant.description}
              rows="4"
              disabled
            />
          </div>

          {/* Add more fields here for the left column */}
          {/* ... */}
        </div>

        <div className="w-px bg-gray-300 mx-4"></div>

        <div className="w-1/2 pl-4 flex flex-col">
          {/* Right column */}

          <div className="mb-4">
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="sunlight"
            >
              Sunlight Requirements
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              type="text"
              name="careInstructions.sunlight"
              id="careInstructions.sunlight"
              value={plant.careInstructions.sunlight}
              disabled
            />
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
              name="careInstructions.waterFrequency"
              id="careInstructions.waterFrequency"
              value={plant.careInstructions.waterFrequency}
              disabled
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
              name="careInstructions.soilType"
              id="careInstructions.soilType"
              value={plant.careInstructions.soilType}
              disabled
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
              value={plant.careInstructions.temperatureRange.min}
              disabled
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
              value={plant.careInstructions.temperatureRange.max}
              disabled
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
              value={plant.bloomTime}
              disabled
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
              value={plant.height}
              disabled
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ViewPlant;
