import { useEffect, useState } from "react";
import { getAllPlants, deletePlant } from "../../../services/plantService.js";
import PlantItem from "./PlantItem.jsx";
import { TextField, Button } from "@mui/material";
import { Search, GetApp } from "@mui/icons-material";
import { toast } from "react-toastify";

import jsPDF from "jspdf";
import "jspdf-autotable";

const PlantList = ({ onUpdate, onView }) => {
  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPlants();
  }, [plants]);

  const fetchPlants = async () => {
    const data = await getAllPlants();
    setPlants(data);
    setFilteredPlants(data);
  };

  const handleDelete = async (id) => {
    try {
      await deletePlant(id);
      // Refresh the plant list after deletion

      setPlants((prevPlants) => prevPlants.filter((plant) => plant._id !== id));
      toast.success("Plant deleted successfully!");
    } catch (error) {
      console.error("Failed to delete the plant:", error);
      toast.error("Failed to delete the plant. Please try again.");
    }
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

  const generatePDF = () => {
    const doc = new jsPDF("landscape", "mm", "a4");

    // Set document properties
    doc.setProperties({
      title: "Green Care Plant List",
      subject: "Plant Information List",
      author: "Green Care",
      keywords: "plants, list, green care",
      creator: "Green Care PDF Generator",
    });

    // Letterhead
    doc.setDrawColor(0, 100, 0);
    doc.setFillColor(240, 255, 240);
    doc.rect(0, 0, doc.internal.pageSize.width, 40, "F");
    doc.setFontSize(24);
    doc.setTextColor(0, 100, 0);
    doc.text("Green Care", 14, 25);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("123 Eco Street, Green City, 12345", 14, 35);

    // Title and Total Users
    doc.setFontSize(18);
    doc.setTextColor(0, 100, 0);
    doc.text("Plant List", 14, 60);

    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Total no of Plants: ${plants.length}`, 14, 70);

    // Table
    doc.autoTable({
      head: [
        [
          "Name",
          "Scientific Name",
          "Family",
          "Origin",
          "Sunlight",
          "Water Frequency",
          "Soil Type",
          "Temperature Range",
          "Bloom Time",
          "Height",
        ],
      ],
      body: filteredPlants.map((plant) => [
        plant.name,
        plant.scientificName,
        plant.family,
        plant.origin,
        plant.careInstructions.sunlight,
        plant.careInstructions.waterFrequency,
        plant.careInstructions.soilType,
        `${plant.careInstructions.temperatureRange.min} - ${plant.careInstructions.temperatureRange.max}`,
        plant.bloomTime,
        plant.height,
      ]),
      startY: 80,
      styles: {
        fontSize: 8,
        cellPadding: 2,
        lineColor: [0, 100, 0],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [0, 100, 0],
        textColor: 255,
        fontSize: 9,
        fontStyle: "bold",
        halign: "center",
      },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 30 },
        2: { cellWidth: 20 },
        3: { cellWidth: 20 },
        4: { cellWidth: 20 },
        5: { cellWidth: 25 },
        6: { cellWidth: 25 },
        7: { cellWidth: 25 },
        8: { cellWidth: 20 },
        9: { cellWidth: 15 },
      },
      alternateRowStyles: {
        fillColor: [240, 255, 240],
      },
      didDrawPage: (data) => {
        // Letterhead on each page
        doc.setDrawColor(0, 100, 0);
        doc.setFillColor(240, 255, 240);
        doc.rect(0, 0, doc.internal.pageSize.width, 40, "F");
        doc.setFontSize(24);
        doc.setTextColor(0, 100, 0);
        doc.text("Green Care", 14, 25);

        // Add page number at the bottom
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(
          `Page ${data.pageNumber} of ${data.pageCount}`,
          doc.internal.pageSize.width - 20,
          doc.internal.pageSize.height - 10
        );
      },
    });

    // Add generation timestamp
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
      `Generated on: ${new Date().toLocaleString()}`,
      14,
      doc.internal.pageSize.height - 10
    );

    // Save the PDF
    doc.save("Green_Care_Plant_List.pdf");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Plant List</h2>
      <div className="flex gap-4 mb-6">
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
        <Button
          className="text-base"
          variant="contained"
          color="primary"
          onClick={generatePDF}
          startIcon={<GetApp />}
        >
          Download List
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {filteredPlants.map((plant) => (
          <PlantItem
            key={plant._id}
            plant={plant}
            onDelete={handleDelete}
            onUpdate={onUpdate}
            onView={onView}
          />
        ))}
      </div>
    </div>
  );
};

export default PlantList;
