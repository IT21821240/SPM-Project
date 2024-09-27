import React from "react";
import { Close } from "@mui/icons-material";
import Brightness1RoundedIcon from "@mui/icons-material/Brightness1Rounded";

const PlantDetailsPopup = ({ plant, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center mb-2">
            <Brightness1RoundedIcon
              className="size-1 mr-2 text-green-800 "
              style={{ fontSize: "small" }}
            />
            <h2 className="text-2xl font-bold">{plant.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-black hover:text-white bg-red-500 p-2 rounded-full hover:shadow-sm hover:shadow-red-500/50 hover:bg-red-500"
          >
            <Close />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mr-4">
            <img
              src={plant.imageUrl}
              alt={plant.name}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="font-semibold">Scientific Name:</p>
            <p className="italic">{plant.scientificName}</p>
            <p className="font-semibold mt-2">Family:</p>
            <p className="italic">{plant.family}</p>
            <p className="font-semibold mt-2">Origin:</p>
            <p className="italic">{plant.origin}</p>
          </div>

          <div>
            <p className="font-semibold">Description:</p>
            <p className="italic">{plant.description}</p>
            <p className="font-semibold mt-2">Bloom Time:</p>
            <p className="italic">{plant.bloomTime}</p>
            <p className="font-semibold mt-2">Height:</p>
            <p className="italic">{plant.height}</p>
            <p className="font-semibold mt-2">Sun Light:</p>
            <p className="italic">{plant.careInstructions.sunlight}</p>
            <p className="font-semibold mt-2">Water Frequency:</p>
            <p className="italic">{plant.careInstructions.waterFrequency}</p>
            <p className="font-semibold mt-2">Soil Type:</p>
            <p className="italic">{plant.careInstructions.soilType}</p>
            <p className="font-semibold mt-2">Minimum Temperature:</p>
            <p className="italic">
              {plant.careInstructions.temperatureRange.min}
            </p>
            <p className="font-semibold mt-2">Maximum Temperature:</p>
            <p className="italic">
              {plant.careInstructions.temperatureRange.max}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantDetailsPopup;
