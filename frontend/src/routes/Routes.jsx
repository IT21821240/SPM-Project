import { Routes, Route } from "react-router-dom";
import SignProcess from "../components/common/main/SignProcess";
import UserProfile from "../components/client/profile/UserProfile";
import UserHome from "../components/client/dashboard/UserHome";
import Detection from "../components/client/detection/Detection";
import Layout from "../components/admin/dashboard/Layout";
import Customers from "../components/admin/customers/Customers";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignProcess />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/userhome" element={<UserHome />} />
      <Route path="/detection" element={<Detection />} />
      <Route path="/admindashboard" element={<Layout />} />
      <Route path="/admindashboard/customers" element={<Customers />} />
    </Routes>
  );
};

export default AppRoutes;
