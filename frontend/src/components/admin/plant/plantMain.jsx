// import Footer from "../common/section/Footer.jsx";
// import Header from "../common/section/Header.jsx";
import PlantForm from "../plant/PlantForm.jsx";
import PlantList from "./PlantList.jsx";
import UpdatePlantForm from "./UpdatePlantForm.jsx";
import ViewPlant from "./viewPlant.jsx";
import { useState, useRef, useEffect } from "react";

import banner from "../../../assets/banner2.jpg";

const Home = () => {
  const [view, setView] = useState("list"); // 'list' or 'form'
  const mainRef = useRef(null);
  const [plantId, setPlantId] = useState(null);
  const footerRef = useRef(null);
  const [mainHeight, setMainHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const updateHeights = () => {
      if (mainRef.current) {
        setMainHeight(mainRef.current.offsetHeight);
      }
      // if (footerRef.current) {
      //   setFooterHeight(footerRef.current.offsetHeight);
      // }
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);

    return () => window.removeEventListener("resize", updateHeights);
  }, []);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleUpdate = (id) => {
    setPlantId(id);
    setView("update");
  };

  const handleView = (id) => {
    setPlantId(id);
    setView("view");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header /> */}
      <main ref={mainRef} className="flex-grow relative">
        <div
          className="bg-cover bg-center relative object-contain"
          style={{
            backgroundImage: `url(${banner})`,
            backgroundRepeat: "repeat-y",
            minHeight: "calc(100vh - 5rem)",
          }}
        >
          <div className="container mx-auto px-4 py-24 relative ">
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

            {view === "list" && (
              <PlantList onUpdate={handleUpdate} onView={handleView} />
            )}
            {view === "form" && (
              <PlantForm onPlantAdded={() => handleViewChange("list")} />
            )}
            {view === "update" && (
              <UpdatePlantForm
                id={plantId}
                viewChange={() => handleViewChange("list")}
              />
            )}
            {view === "view" && <ViewPlant id={plantId} />}
          </div>
        </div>
      </main>
      {/* <div ref={footerRef}>
      <Footer />
      </div> */}
      <button
        className="fixed right-4 bg-green-600 text-white text-2xl px-6 py-6 rounded-full shadow-lg hover:bg-green-700 transition-colors duration-300 mr-4"
        style={{
          bottom: "10px",
        }}
        onClick={() => handleViewChange("form")}
      >
        +
      </button>
    </div>
  );
};

export default Home;
