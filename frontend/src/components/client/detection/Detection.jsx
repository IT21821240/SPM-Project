/* eslint-disable no-unused-vars */
import { useState } from "react";
import bg from "../../../assets/bg.jpeg";
import Header from "../../common/section/Header";
import Footer from "../../common/section/Footer";
import { detectPlantDisease } from "../../../services/detectService";

const Detection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(null);
  const [fileName, setFileName] = useState(null);
  
  
    const [predictedImg, setPredictedImg] = useState('');

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
        <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-lg border border-gray-300">
          <h1 className="text-4xl font-bold text-teal-800 mb-4">
            Plant Disease Detection
          </h1>
          <p className="text-gray-700 mb-8 text-lg">
            Upload an image of the plant leaf to detect any potential diseases.
            Our system will analyze the image and provide you with accurate
            information and recommendations.
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
              {loading ? 'loading' : 'Upload & Detect'}
            </button>
          </form>
        </div>
        <h1>{predictedImg ? `Predicted Image Type-${predictedImg}` : ''}</h1>
      </div>
      <Footer />
    </>
  );
};

export default Detection;
