import { useNavigate } from "react-router-dom";

const PlantItem = ({ plant, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${plant.name}?`)) {
      onDelete(plant._id);
    }
  };

  const handleUpdate = () => {
    navigate(`/update/${plant._id}`);
  };
  return (
    <div className="bg-white shadow-md rounded p-4">
      <h3 className="text-xl font-semibold">{plant.name}</h3>
      <p>
        <strong>Scientific Name:</strong> {plant.scientificName}
      </p>
      <p>
        <strong>Family:</strong> {plant.family}
      </p>
      <p>
        <strong>Origin:</strong> {plant.origin}
      </p>
      <p>{plant.description}</p>
      <img
        src={plant.imageUrl}
        alt={plant.name}
        className="w-full h-48 object-cover mt-2"
      />
      <div>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-3 my-3 rounded mr-2"
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-3  my-3 rounded mr-2"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PlantItem;
