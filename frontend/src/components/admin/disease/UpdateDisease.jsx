import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import updateDiseaseImage from "../../../assets/updateDiseaseImage.avif";

const UpdateDisease = () => {
  const { id } = useParams(); // Get the disease ID from the URL
  const [name, setName] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [affectedSpecies, setAffectedSpecies] = useState("");
  const [treatment, setTreatment] = useState("");
  const [severity, setSeverity] = useState("Mild");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch disease details when the component mounts
  useEffect(() => {
    const fetchDisease = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3000/api/diseases/disease/${id}`,
          {
            headers: {},
          }
        );

        const { name, symptoms, affectedSpecies, treatment, severity } =
          data.data;
        setName(name || "");
        setSymptoms(symptoms.join(", ") || "");
        setAffectedSpecies(affectedSpecies.join(", ") || "");
        setTreatment(treatment || "");
        setSeverity(severity || "Mild");
      } catch (error) {
        console.error("Error fetching disease:", error);
        if (error.response?.status === 401) {
          toast.error("Unauthorized access. Please log in again.");
          navigate("/");
        } else {
          toast.error("Failed to fetch disease details");
        }
        setError("Failed to fetch disease details");
      } finally {
        setLoading(false);
      }
    };

    fetchDisease();
  }, [id, navigate]);

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

    try {
      await axios.put(
        `http://localhost:3000/api/diseases/disease/${id}`,
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

      toast.success("Disease updated successfully");
      navigate("/disease-list");
    } catch (error) {
      console.error("Error updating disease:", error);
      toast.error("Failed to update disease. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${updateDiseaseImage})` }}
      >
        <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-60">
          <div className="flex flex-col items-center justify-center text-center text-white">
            <div className="w-8 h-8 border-t-4 border-indigo-500 border-solid border-8 rounded-full animate-spin"></div>
            <p className="text-lg font-medium text-white mt-4">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${updateDiseaseImage})` }}
    >
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-60">
        <div className="flex max-w-4xl w-full">
          {/* Left side - Form */}
          <div className="flex-1 p-8 bg-white bg-opacity-80 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
              Update Disease
            </h2>
            {error && (
              <p className="text-red-500 mb-4 text-center text-sm">{error}</p>
            )}
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
                  {loading ? "Updating Disease..." : "Update Disease"}
                </button>
              </div>
            </form>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 flex flex-col justify-center items-center text-center text-white max-w-lg">
            <h1 className="text-5xl font-extrabold mb-4 leading-tight">
              Update Your Knowledge
            </h1>
            <p className="text-xl mb-4">
              Modify existing plant disease entries to ensure accurate and
              up-to-date information.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center">
            <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UpdateDisease;
