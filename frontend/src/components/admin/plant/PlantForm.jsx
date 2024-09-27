/* eslint-disable react/prop-types */
import { useState, useRef } from "react";
import { createPlant } from "../../../services/plantService.js";
import { toast } from "react-toastify";
import defaultImageUrl from "../../../assets/addPlantImage.png";

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

const PlantForm = ({ onPlantAdded }) => {
  const [plantData, setPlantData] = useState({
    name: "",
    scientificName: "",
    family: "",
    origin: "",
    description: "",

    careInstructions: {
      sunlight: "Full Sun",
      waterFrequency: "Daily",
      soilType: "",
      temperatureRange: {
        min: "",
        max: "",
      },
    },

    bloomTime: "",
    height: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);
  const [imageData, setImageData] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setImageData(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);

    // setPlantData((prevData) => ({ ...prevData, imageUrl: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlantData((prevData) => {
      if (name.includes(".")) {
        const [parent, child] = name.split(".");
        return {
          ...prevData,
          [parent]: {
            ...prevData[parent],
            [child]: value,
          },
        };
      } else if (name === "minTemperature" || name === "maxTemperature") {
        return {
          ...prevData,
          careInstructions: {
            ...prevData.careInstructions,
            temperatureRange: {
              ...prevData.careInstructions.temperatureRange,
              [name === "minTemperature" ? "min" : "max"]: value,
            },
          },
        };
      } else {
        return { ...prevData, [name]: value };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const plantDataToSubmit = {
      ...plantData,
      imageData, // Include the base64 image data
    };

    try {
      await createPlant(plantDataToSubmit);
      toast.success("Plant added successfully!");
      if (onPlantAdded) onPlantAdded(); // Refresh the plant list and switch view
    } catch (error) {
      toast.error("Failed to add the plant. Please try again.");
    }
  };

  return (
    <form
      className="bg-white bg-opacity-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 text-xl"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Plant</h2>

      <div className="flex">
        <div className="w-1/2 pr-4">
          {/* Left column */}

          <div className="mb-4">
            {/* <label
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
            /> */}

            {/* new code */}
            <label
              className="block text-gray-700 text-lg font-bold mb-2"
              htmlFor="imageUpload"
            >
              Plant Image
            </label>
            <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden mb-2">
              <img
                src={previewImage || defaultImageUrl}
                alt="Plant preview"
                className="w-full h-full object-contain"
              />
            </div>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
              className="hidden"
            />
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
              value={plantData.careInstructions.sunlight}
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
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              name="careInstructions.waterFrequency"
              id="careInstructions.waterFrequency"
              value={plantData.careInstructions.waterFrequency}
              onChange={handleChange}
            >
              {waterFrequencyOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
              type="text"
              name="careInstructions.waterFrequency"
              id="careInstructions.waterFrequency"
              value={plantData.careInstructions.waterFrequency}
              onChange={handleChange}
            /> */}
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
              value={plantData.careInstructions.soilType}
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
              value={plantData.careInstructions.temperatureRange.min}
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
              value={plantData.careInstructions.temperatureRange.max}
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

          <div className="mt-10 ml-auto">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Add Plant
            </button>
          </div>

          {/* Add more fields here for the right column */}
          {/* ... */}
        </div>
      </div>
    </form>
  );
};

export default PlantForm;
