import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DiseaseList from "./DiseaseList";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Dashboard = () => {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/diseases/disease"
        );
        if (response.status === 200) {
          console.log("Fetched diseases:", response.data);
          if (response.data && Array.isArray(response.data.data)) {
            setDiseases(response.data.data);
          } else {
            console.error(
              "Fetched data does not contain an array:",
              response.data
            );
            setError("Received invalid data format from the server.");
          }
        } else {
          throw new Error("Unexpected response status");
        }
      } catch (error) {
        console.error("Error fetching diseases:", error);
        setError("Failed to fetch diseases. Please try again.");
        toast.error("Failed to fetch diseases");
      } finally {
        setLoading(false);
      }
    };

    fetchDiseases();
  }, []);

  const handleCreateDisease = () => {
    navigate("/create-disease");
  };

  const filterDiseases = () => {
    console.log("Filtering diseases. Current state:", diseases);
    if (selectedSeverity && selectedSeverity !== "All") {
      return diseases.filter(
        (disease) => disease.severity === selectedSeverity
      );
    }
    return diseases;
  };

  const handleFilterAndGenerateReport = () => {
    console.log("Generating report. Current state:", diseases);
    const diseasesToReport = filterDiseases();

    if (diseasesToReport.length === 0) {
      toast.warning(
        "No diseases available for the selected filter. Please adjust the filter criteria."
      );
      return;
    }

    const doc = new jsPDF();

    // Set up header
    doc.setFontSize(18);
    doc.text("Disease Report", doc.internal.pageSize.width / 2, 20, {
      align: "center",
    });

    // Add timestamp
    const now = new Date();
    const timestamp = now.toLocaleString();
    doc.setFontSize(12);
    doc.text(`Generated on: ${timestamp}`, 14, 30);

    // Define table columns and rows
    const columns = ["#", "Disease Name", "Symptoms", "Treatment", "Severity"];
    const rows = diseasesToReport.map((disease, index) => [
      index + 1,
      disease.name,
      disease.symptoms.join(", "),
      disease.treatment,
      disease.severity,
    ]);

    // Add table to the PDF
    doc.autoTable({
      startY: 40,
      head: [columns],
      body: rows,
      theme: "striped",
      margin: { top: 40 },
      didDrawPage: function (data) {
        // Add page number
        const str = `Page ${doc.internal.getNumberOfPages()}`;
        doc.setFontSize(10);
        doc.text(
          str,
          data.settings.margin.left,
          doc.internal.pageSize.height - 10
        );
      },
    });

    // Save the PDF
    const fileName = `disease_report_${selectedSeverity || "All"}_${now
      .toISOString()
      .replace(/:/g, "-")}.pdf`;
    doc.save(fileName);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg font-medium text-gray-600">Loading diseases...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg font-medium text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-black opacity-30"
        style={{ zIndex: -1 }}
      ></div>
      <div className="relative max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleCreateDisease}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add New Disease
          </button>
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="All">All Severities</option>
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
          </select>
          <button
            onClick={handleFilterAndGenerateReport}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Generate Report
          </button>
        </div>
      </div>
      <div>
        {diseases.length === 0 ? (
          <p className="text-lg font-medium text-gray-600 text-center">
            No diseases available.
          </p>
        ) : (
          <DiseaseList diseases={diseases} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
