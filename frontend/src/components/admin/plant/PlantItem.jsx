/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import Brightness1RoundedIcon from "@mui/icons-material/Brightness1Rounded";
import { useState } from "react";

const PlantItem = ({ plant, onDelete, onUpdate, onView, client }) => {
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDelete = () => {
    // if (window.confirm(`Are you sure you want to delete ${plant.name}?`)) {
    //   onDelete(plant._id);
    // }
    onDelete(plant._id);
    setShowDeleteConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const handleUpdate = () => {
    // navigate(`/update/${plant._id}`);
    onUpdate(plant._id);
  };
  return (
    <div className="bg-white shadow-md rounded p-4 hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300">
      <div className="flex items-center mb-2">
        <Brightness1RoundedIcon
          className="size-1 mr-2 text-green-800 "
          style={{ fontSize: "small" }}
        />
        <h3 className="text-xl font-semibold">{plant.name}</h3>
      </div>
      <p className="mb-2">
        <strong>Scientific Name:</strong>{" "}
        <span className="italic font-normal">{plant.scientificName}</span>
      </p>
      <p className="mb-2">
        <strong>Family:</strong>{" "}
        <span className="italic font-normal">{plant.family}</span>
      </p>
      <p className="mb-2">
        <strong>Origin:</strong>{" "}
        <span className="italic font-normal">{plant.origin}</span>
      </p>
      {/* <p>{plant.description}</p> */}
      <div className="w-48 h-48 overflow-hidden justify-center items-center shadow-sm shadow-gray-400 mt-4">
        <img
          src={plant.imageUrl}
          alt={plant.name}
          className="w-full h-full object-contain "
        />
      </div>

      <div className="flex justify-end items-end">
        <button
          className="bg-green-500 opacity-80 hover:bg-green-700 text-white font-bold py-3 px-3  my-3 rounded-3xl mr-2"
          onClick={() => onView(plant._id)}
        >
          View
        </button>
        {!client ? (
          <>
            <button
              className="bg-yellow-500 opacity-80 hover:bg-yellow-700 text-white font-bold py-3 px-3 my-3 rounded-3xl mr-2"
              onClick={handleUpdate}
            >
              Update
            </button>
            <button
              className="bg-red-500 opacity-80 hover:bg-red-700 text-white font-bold py-3 px-3  my-3 rounded-3xl mr-2"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          </>
        ) : null}
      </div>

      {showDeleteConfirm && (
        <div className="w-full h-full absolute inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <p className="mb-4">
              Are you sure you want to delete {plant.name}?
            </p>
            <div className="flex justify-end">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantItem;
