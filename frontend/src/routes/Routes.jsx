import { Routes, Route } from "react-router-dom";

// customer
import SignProcess from "../components/common/main/SignProcess";
import UserProfile from "../components/client/profile/UserProfile";
import UserHome from "../components/client/dashboard/UserHome";
import Detection from "../components/client/detection/Detection";
import Layout from "../components/admin/dashboard/Layout";
import Customers from "../components/admin/customers/Customers";

// plant
import PlantMain from "../components/admin/plant/plantMain";
import UpdatePlantForm from "../components/admin/plant/UpdatePlantForm";

// disease
import CreateDisease from "../components/admin/disease/CreateDisease";
import Dashboard from "../components/admin/disease/Dashboard";
import UpdateDisease from "../components/admin/disease/UpdateDisease";
import DiseaseList from "../components/admin/disease/DiseaseList";

const AppRoutes = () => {
  return (
    <Routes>
      {/* customer */}
      <Route path="/" element={<SignProcess />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/userhome" element={<UserHome />} />
      <Route path="/detection" element={<Detection />} />
      <Route path="/admindashboard" element={<Layout />} />
      <Route path="/admindashboard/customers" element={<Customers />} />

      {/* plant */}
      <Route path="/plant" element={<PlantMain />} />
      <Route path="/update/:id" element={<UpdatePlantForm />} />

      {/* disease */}
      <Route path="view-disease" element={<Dashboard />} />
      <Route path="create-disease" element={<CreateDisease />} />
      <Route path="disease-list" element={<DiseaseList />} />
      <Route path="update-disease/:id" element={<UpdateDisease />} />
    </Routes>
  );
};

export default AppRoutes;
