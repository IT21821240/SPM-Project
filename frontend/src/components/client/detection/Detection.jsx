/* eslint-disable no-unused-vars */
import { useState } from "react";
import bg from "../../../assets/detection.jpg";
import Header from "../../common/section/Header";
import Footer from "../../common/section/Footer";
import { detectPlantDisease } from "../../../services/detectService";

const Detection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [treatmentSuggestion, setTreatmentSuggestion] = useState('');

    const [predictedImg, setPredictedImg] = useState('');

    const treatmentSuggestions = {
      "Pepper,_bell___Bacterial_spot": "Remove infected leaves, practice crop rotation, use resistant varieties, sanitize tools, Water plants at the base rather than overhead and apply copper-based fungicides.",
      "Powdery Mildew": "Use fungicides and ensure proper air circulation.",
      "Grape___Esca_(Black_Measles)": "Remove infected vines, improve air circulation, apply fungicides, Maintain proper vine health through adequate watering, nutrient management, pruning and monitor for symptoms.",
      "Tomato___Early_blight": "Remove affected leaves, improve air circulation, and apply fungicides."
    };

    const handleFileChange = (event) => {
      const file = event.target.files[0];
    
      if (file) {
        setSelectedFile(file);
        setFileName(file.name); 
    
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    

  const handleSubmit = async(event) => {
    try{
      setLoading(true);
      event.preventDefault();
      const plantData={
        image_path:fileName
      };


      const response=await detectPlantDisease(plantData);
      if(response){
      setPredictedImg(response.predicted_class);
      const treatment = treatmentSuggestions[response.predicted_class] || "No treatment information available.";
      setTreatmentSuggestion(treatment);
      }
      setLoading(false);
    }catch(err){
      setLoading(false);
    }   
  };

  return (
    <>
      <Header />
      <div
        className="flex flex-col items-center justify-center min-h-screen p-6"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
         <br></br>
         <br></br>
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-3xl border border-gray-300">
          <h1 className="text-4xl font-bold text-teal-800 mb-4 text-center">
            Plant Disease Detection
          </h1>
          <p className="text-gray-700 mb-8 text-lg">
            Upload an image of the plant leaf to detect any potential diseases affecting your plants,
            Our advanced system leverages cutting-edge image analysis technology to thoroughly examine the uploaded leaf. Once the analysis is complete, 
            you'll receive a detailed description that not only identifies any diseases present but also provides tailored recommendations for treatment and care. 
            By using our service, you are taking an important step towards ensuring the health and vitality of your plants. Let us help you protect your greenery 
            with accurate insights and expert advice.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-500 file:py-4 file:px-5 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
              />
            </div>
            {previewUrl && (
              <div className="mb-6">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-auto rounded-lg shadow-md border border-gray-300"
                />
              </div>
            )}
            <button
              type="submit"
              className="bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 text-white py-4 px-8 rounded-lg hover:bg-gradient-to-r hover:from-teal-500 hover:via-blue-600 hover:to-purple-700 transition duration-300 w-full"
            >
              Upload & Detect
            </button>
            <br></br>
            {predictedImg && (
              <div className="mt-6 p-6 bg-gray-100 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-teal-800">Prediction Result:</h2>
                <p className="text-lg mt-2">
                  <strong>Disease:</strong> {predictedImg}
                </p>
                {treatmentSuggestion && (
                  <p className="text-lg mt-4">
                    <strong>Suggested Treatment:</strong> {treatmentSuggestion}
                  </p>
                )}
                </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Detection;
