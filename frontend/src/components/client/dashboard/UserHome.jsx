/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { FaUpload, FaSearch, FaClipboardList } from "react-icons/fa";
import Header from "../../common/section/Header";
import Footer from "../../common/section/Footer";
import back from "../../../assets/back.jpg";

const UserHome = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${back})`,
          }}
        />
        <div className="absolute inset-0 bg-black opacity-60" />

        <div className="relative z-10 container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-5 font-sans leading-tight">
              Advanced Leaf <br /> Disease Detection
            </h1>
            <p className="text-xl mb-8 leading-relaxed font-sans">
              Protect your plants with AI-powered analysis. Upload leaf images
              for instant disease identification and expert treatment
              recommendations. With advanced improvemtents and modifications.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-btnColor text-white font-semibold py-3 px-8 rounded-[20px] hover:bg-green-600 transition duration-300 shadow-lg"
              onClick={() =>
                (window.location.href = "http://localhost:8000/detection")
              }
            >
              Start Detection
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 grid md:grid-cols-3 gap-8"
          >
            <FeatureCard
              icon={<FaUpload />}
              title="Upload Image"
              description="Easily upload high-quality images of plant leaves for analysis."
            />
            <FeatureCard
              icon={<FaSearch />}
              title="AI Analysis"
              description="Our advanced AI quickly identifies potential diseases and issues."
            />
            <FeatureCard
              icon={<FaClipboardList />}
              title="Expert Insights"
              description="Receive detailed reports and treatment recommendations from experts."
            />
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-md rounded-lg p-4   shadow-xl">
    <div className="flex gap-3">
      <div className="text-info text-3xl mb-4">{icon}</div>
      <h3 className="text-white text-xl font-sans font-semibold mb-2">
        {title}
      </h3>
    </div>
    <p className="text-gray-200  flex items-center justify-center">
      {description}
    </p>
  </div>
);

export default UserHome;
