import { useEffect, useState } from "react";
import { getAllPlants, deletePlant } from "../../services/plantService.js";
import PlantItem from "./PlantItem";

const PlantList = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    const data = await getAllPlants();
    setPlants(data);
  };

  const handleDelete = async (id) => {
    try {
      await deletePlant(id);
      // Refresh the plant list after deletion
      setPlants((prevPlants) => prevPlants.filter((plant) => plant._id !== id));
    } catch (error) {
      console.error("Failed to delete the plant:", error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Plant List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {plants.map((plant) => (
          <PlantItem key={plant._id} plant={plant} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default PlantList;
