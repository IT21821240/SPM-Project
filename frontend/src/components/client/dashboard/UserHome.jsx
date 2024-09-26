import home from "../../../assets/home3.jpg";
import Header from "../../common/section/Header";
import Footer from "../../common/section/Footer";

const UserHome = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-auto">
        <div
          className="bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: `url(${home})`,
            minHeight: "calc(100vh - 5rem)",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="container mx-auto px-4 py-24 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Safeguard Your Crops with{" "}
                <span className="text-green-400">
                  Advanced Disease Detection
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed">
                Enhance your farming practices with our Leaf Guard Plant Disease
                Detection System. Upload leaf images to accurately identify
                diseases and receive actionable insights to protect and optimize
                your crops.
              </p>
              <p className="text-base md:text-lg mb-12 italic">
                Our solution combines cutting-edge technology with expert
                recommendations to help you maintain healthy plants and boost
                your yields.
              </p>
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() =>
                  (window.location.href = "http://localhost:8000/detection")
                }
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserHome;
