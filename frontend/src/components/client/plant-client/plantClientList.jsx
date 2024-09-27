import { useEffect, useState } from "react";
import { getAllPlants } from "../../../services/plantService";
import Header from "../../common/section/Header";
import PlantItem from "../../admin/plant/PlantItem";
import { TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import Footer from "../../common/section/Footer";
import banner from "../../../assets/banner2.jpg";
import PlantDetailsPopup from "./PlantDetailsPopup";

const PlantClientList = () => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedPlant, setSelectedPlant] = useState(null);

  const handleViewPlant = (plant) => {
    setSelectedPlant(plant);
  };

  const handleClosePopup = () => {
    setSelectedPlant(null);
  };

  useEffect(() => {
    fetchPlants();
  }, []);

  const fetchPlants = async () => {
    const data = await getAllPlants();
    setPlants(data);
    setFilteredPlants(data);
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = plants.filter(
      (plant) =>
        plant.name.toLowerCase().includes(term) ||
        plant.scientificName.toLowerCase().includes(term) ||
        plant.family.toLowerCase().includes(term) ||
        plant.origin.toLowerCase().includes(term)
    );
    setFilteredPlants(filtered);
  };

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        {/* <Header /> */}
        <main className="flex-grow relative">
          <div
            className="bg-cover bg-center relative"
            style={{
              backgroundImage: `url(${banner})`,
              backgroundRepeat: "repeat-y",
              minHeight: "calc(100vh - 5rem)",
            }}
          >
            <div className="container mx-auto px-4 py-24 relative ">
              <h2 className="text-2xl font-bold mb-4">Plant List</h2>

              <TextField
                className=" shadow-md w-3/4"
                fullWidth
                placeholder="Search users..."
                value={searchTerm}
                onChange={handleSearch}
                InputProps={{
                  startAdornment: (
                    <Search style={{ color: "gray", marginRight: "0.5rem" }} />
                  ),
                }}
                variant="outlined"
                style={{ backgroundColor: "#fff" }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {filteredPlants.map((plant) => (
                  <PlantItem
                    key={plant._id}
                    plant={plant}
                    onDelete={() => {}}
                    onUpdate={() => {}}
                    onView={() => handleViewPlant(plant)}
                    client={true}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
      {selectedPlant && (
        <PlantDetailsPopup plant={selectedPlant} onClose={handleClosePopup} />
      )}
    </>
  );
};

export default PlantClientList;
