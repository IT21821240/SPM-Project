import { Routes, Route } from "react-router-dom";
import SignProcess from "../components/common/main/SignProcess";
import UserProfile from "../components/client/profile/UserProfile";
import UserHome from "../components/client/dashboard/UserHome";
import Detection from "../components/client/detection/Detection";
import Layout from "../components/admin/dashboard/Layout";
import Customers from "../components/admin/customers/Customers";

// plant
import PlantMain from "../components/plant/plantMain";
import UpdatePlantForm from "../components/plant/UpdatePlantForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignProcess />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/userhome" element={<UserHome />} />
      <Route path="/detection" element={<Detection />} />
      <Route path="/admindashboard" element={<Layout />} />
      <Route path="/admindashboard/customers" element={<Customers />} />

      {/* plant */}
      <Route path="/plant" element={<PlantMain />} />
      <Route path="/update/:id" element={<UpdatePlantForm />} />
    </Routes>
  );
};

export default AppRoutes;
