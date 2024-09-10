import { Routes, Route } from "react-router-dom";
import SignProcess from "../components/common/main/SignProcess";
import UserProfile from "../components/client/profile/UserProfile";
import UserHome from "../components/client/dashboard/UserHome";
import Detection from "../components/client/detection/Detection";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignProcess />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/userhome" element={<UserHome />} />
      <Route path="/detection" element={<Detection />} />
    </Routes>
  );
};

export default AppRoutes;
