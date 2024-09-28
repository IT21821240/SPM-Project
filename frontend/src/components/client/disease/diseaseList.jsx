import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "../../common/section/Header";
import Footer from "../../common/section/Footer";

const UserDiseaseList = () => {
  const [diseases, setDiseases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/diseases/disease"
        );

        if (response.status === 200) {
          setDiseases(response.data.data || response.data);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-t-4 border-blue-600 border-solid border-8 rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-600 mt-4">
            Loading diseases...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg font-medium text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="p-6 max-w-5xl mx-auto bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center mt-[60px]">
          Disease List
        </h2>
        {diseases.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {diseases.map((disease) => (
              <div
                key={disease._id}
                className="flex flex-col p-6 bg-gray-50 border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-2xl font-semibold text-gray-800">
                  {disease.name}
                </h3>
                {disease.symptoms && (
                  <p className="text-gray-700 mt-2">
                    <strong>Symptoms:</strong> {disease.symptoms.join(", ")}
                  </p>
                )}
                {disease.affectedSpecies && (
                  <p className="text-gray-700 mt-2">
                    <strong>Affected Species:</strong>{" "}
                    {disease.affectedSpecies.join(", ")}
                  </p>
                )}
                {disease.treatment && (
                  <p className="text-gray-700 mt-2">
                    <strong>Treatment:</strong> {disease.treatment}
                  </p>
                )}
                <p
                  className={`mt-2 text-sm font-semibold ${
                    disease.severity === "Severe"
                      ? "text-red-600"
                      : disease.severity === "Moderate"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  <strong>Severity:</strong> {disease.severity}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No diseases available.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserDiseaseList;
