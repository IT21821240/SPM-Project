import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import createDiseaseImage from "../../../assets/addDiseaseImage.jpg";

const CreateDisease = () => {
  const [name, setName] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [affectedSpecies, setAffectedSpecies] = useState("");
  const [treatment, setTreatment] = useState("");
  const [severity, setSeverity] = useState("Mild");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Validate severity option
  const validateSeverity = (severity) =>
    ["Mild", "Moderate", "Severe"].includes(severity);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate form fields
    if (!name.trim()) {
      toast.error("Disease name is required");
      setLoading(false);
      return;
    }

    const symptomsArray = symptoms
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    if (symptomsArray.length === 0) {
      toast.error("At least one symptom is required");
      setLoading(false);
      return;
    }

    const affectedSpeciesArray = affectedSpecies
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    if (affectedSpeciesArray.length === 0) {
      toast.error("At least one affected species is required");
      setLoading(false);
      return;
    }

    if (!treatment.trim()) {
      toast.error("Treatment is required");
      setLoading(false);
      return;
    }

    if (!validateSeverity(severity)) {
      toast.error("Invalid severity value");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/api/diseases/disease",
        {
          name,
          symptoms: symptomsArray,
          affectedSpecies: affectedSpeciesArray,
          treatment,
          severity,
        },
        {
          headers: {},
        }
      );

      // Clear form fields
      setName("");
      setSymptoms("");
      setAffectedSpecies("");
      setTreatment("");
      setSeverity("Mild");

      toast.success("Disease added successfully");
      navigate("/admindashboard");
    } catch (error) {
      console.error("Error creating disease:", error);
      toast.error("Failed to add disease. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${createDiseaseImage})` }}
    >
      <div className="flex flex-col min-h-screen bg-black bg-opacity-60">
        <div className="flex-grow flex items-center justify-center">
          <div className="flex max-w-4xl w-full">
            {/* Left side - Form */}
            <div className="flex-1 p-8 bg-white bg-opacity-80 rounded-lg shadow-lg border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
                Add New Disease
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Complete the form below to add a new disease entry.
              </p>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Disease Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter disease name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="symptoms"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Symptoms
                    </label>
                    <input
                      id="symptoms"
                      name="symptoms"
                      type="text"
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      required
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter symptoms"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="affectedSpecies"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Affected Species
                    </label>
                    <input
                      id="affectedSpecies"
                      name="affectedSpecies"
                      type="text"
                      value={affectedSpecies}
                      onChange={(e) => setAffectedSpecies(e.target.value)}
                      required
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter affected species"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="treatment"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Treatment
                    </label>
                    <input
                      id="treatment"
                      name="treatment"
                      type="text"
                      value={treatment}
                      onChange={(e) => setTreatment(e.target.value)}
                      required
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter treatment"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="severity"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Severity
                    </label>
                    <select
                      id="severity"
                      name="severity"
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value)}
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      <option value="Mild">Mild</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Severe">Severe</option>
                    </select>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className={`w-full py-3 px-4 border border-transparent text-sm font-medium rounded-md ${
                      loading ? "bg-indigo-500" : "bg-indigo-600"
                    } ${
                      loading ? "hover:bg-indigo-600" : "hover:bg-indigo-700"
                    } text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out`}
                    disabled={loading}
                  >
                    {loading ? "Adding Disease..." : "Add Disease"}
                  </button>
                </div>
              </form>
            </div>

            {/* Right side - Content */}
            <div className="flex-1 flex flex-col justify-center items-center text-center text-white max-w-lg">
              <h1 className="text-5xl font-extrabold mb-4 leading-tight">
                Nurture Your Greenery
              </h1>
              <p className="text-xl mb-4">
                Share your knowledge by adding new plant diseases. Help others
                to better understand and manage their plants.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Plant Disease Tracker. All
              rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CreateDisease;
