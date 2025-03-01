import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlantById, updatePlant } from "../../../services/plantService.js";

const UpdatePlantForm = ({ id, viewChange }) => {
  const sunlightOptions = [
    { value: "Full Sun", label: "Full Sun" },
    { value: "Partial Shade", label: "Partial Shade" },
    { value: "Full Shade", label: "Full Shade" },
  ];

  const waterFrequencyOptions = [
    { value: "Daily", label: "Daily" },
    { value: "Weekly", label: "Weekly" },
    { value: "Biweekly", label: "Biweekly" },
    { value: "Monthly", label: "Monthly" },
  ];

  // const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlantData] = useState(null);
  const [name, setName] = useState("");
  const [scientificName, setScientificName] = useState("");
  const [family, setFamily] = useState("");
  const [origin, setOrigin] = useState("");
  const [description, setDescription] = useState("");
  const [sunlight, setSunlight] = useState("");
  const [waterFrequency, setWaterFrequency] = useState("");
  const [soilType, setSoilType] = useState("");
  const [minTemperature, setMinTemperature] = useState("");
  const [maxTemperature, setMaxTemperature] = useState("");
  const [bloomTime, setBloomTime] = useState("");
  const [height, setHeight] = useState("");
  const [imageUrl, setImageUrl] = useState(
    " https://www.kew.org/sites/default/files/styles/original/public/2020-04/Aloe_Vera.jpg.webp?itok=nuAtuuf1"
  );

  useEffect(() => {
    const fetchPlant = async () => {
      const plantData = await getPlantById(id);
      setPlantData(plantData);
      setName(plantData.name);
      setScientificName(plantData.scientificName);
      setFamily(plantData.family);
      setOrigin(plantData.origin);
      setDescription(plantData.description);
      setSunlight(plantData.careInstructions.sunlight);
      setWaterFrequency(plantData.careInstructions.waterFrequency);
      setSoilType(plantData.careInstructions.soilType);
      setMinTemperature(plantData.careInstructions.temperatureRange.min);
      setMaxTemperature(plantData.careInstructions.temperatureRange.max);
      setBloomTime(plantData.bloomTime);
      setHeight(plantData.height);
      setImageUrl(plantData.imageUrl);
    };

    fetchPlant();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPlant = {
        name,
        scientificName,
        family,
        origin,
        description,
        careInstructions: {
          sunlight,
          waterFrequency,
          soilType,
          temperatureRange: {
            min: minTemperature,
            max: maxTemperature,
          },
        },
        bloomTime,
        height,
        imageUrl,
      };
      await updatePlant(id, updatedPlant);
      viewChange();
    } catch (error) {
      console.error("Failed to update the plant:", error);
    }
  };
  if (!plant) return <p>Loading...</p>;

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-xl"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4">Update Plant</h2>

      <div className="flex">
        <div className="w-1/2 pr-4">
          {/* Left column */}

          <div className="mb-4">
            {/* new code */}
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="imageUpload"
            >
              Plant Image
            </label>
            {/* <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden mb-2">
                <img
                  src={previewImage || defaultImageUrl}
                  alt="Plant preview"
                  className="w-full h-full object-cover" />
              </div>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageUpload}
                ref={fileInputRef}
                className="hidden" />
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  {previewImage ? "Change Image" : "Upload Image"}
                </button>
                {previewImage && (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Remove Image
                  </button>
                )}
              </div> */}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={scientificName}
              onChange={(e) => setScientificName(e.target.value)}
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
              value={family}
              onChange={(e) => setFamily(e.target.value)}
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
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
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
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              name="careInstructions.sunlight"
              id="careInstructions.sunlight"
              value={sunlight}
              onChange={(e) => setSunlight(e.target.value)}
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
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              name="careInstructions.waterFrequency"
              id="careInstructions.waterFrequency"
              value={waterFrequency}
              onChange={(e) => setWaterFrequency(e.target.value)}
            >
              {waterFrequencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
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
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
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
              value={minTemperature}
              onChange={(e) => setMinTemperature(e.target.value)}
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
              value={maxTemperature}
              onChange={(e) => setMaxTemperature(e.target.value)}
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
              value={bloomTime}
              onChange={(e) => setBloomTime(e.target.value)}
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
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>

          <div className="mt-10 ml-auto">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Upate Plant
            </button>
          </div>

          {/* Add more fields here for the right column */}
          {/* ... */}
        </div>
      </div>
    </form>
  );
};

export default UpdatePlantForm;
