// import Footer from "../common/section/Footer.jsx";
// import Header from "../common/section/Header.jsx";
import PlantForm from "../plant/PlantForm.jsx";
import PlantList from "../plant/PlantList.jsx";
import { useState, useRef, useEffect } from "react";

import banner from "../../../assets/banner2.jpg";

const Home = () => {
  const [view, setView] = useState("list"); // 'list' or 'form'
  const mainRef = useRef(null);
  const footerRef = useRef(null);
  const [mainHeight, setMainHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const updateHeights = () => {
      if (mainRef.current) {
        setMainHeight(mainRef.current.offsetHeight);
      }
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);

    return () => window.removeEventListener("resize", updateHeights);
  }, []);

  const handleViewChange = (newView) => {
    setView(newView);
  };
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header /> */}
      <main ref={mainRef} className="flex-grow relative">
        <div
          className="bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: `url(${banner})`,
            minHeight: "calc(100vh - 5rem)",
          }}
        >
          <div className="container mx-auto px-4 py-24 relative z-10">
            {/* <h1 className="text-3xl font-bold text-center mb-6">Plant Management</h1> */}
            <div className="mb-4 text-center">
              <button
                className={`mx-2 px-4 py-2 rounded ${
                  view === "list"
                    ? "bg-green-600 text-white text-xl"
                    : "bg-gray-300"
                }`}
                onClick={() => handleViewChange("list")}
              >
                Plant List
              </button>
              <button
                className={`mx-2 px-4 py-2 rounded ${
                  view === "form"
                    ? "bg-green-600 text-white text-xl"
                    : "bg-gray-300"
                }`}
                onClick={() => handleViewChange("form")}
              >
                Add Plant
              </button>
            </div>

            {view === "list" && <PlantList />}
            {view === "form" && (
              <PlantForm onPlantAdded={() => handleViewChange("list")} />
            )}
          </div>
        </div>
      </main>
      {/* <div ref={footerRef}>
      <Footer />
      </div> */}
      <button
        className="fixed right-4 bg-green-600 text-white text-xl px-4 py-2 rounded-full shadow-lg hover:bg-green-700 transition-colors duration-300"
        style={{
          bottom: `max(${footerHeight}px + 1rem, calc(100vh - ${mainHeight}px - 1rem))`,
        }}
        // onClick={() => {}}
      >
        +
      </button>
    </div>
  );
};

export default Home;
