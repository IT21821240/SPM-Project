/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../client/profile/ConfirmDialog";

const Logout = ({ onLogoutSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsOpen(true);
  };

  const handleConfirmation = async (confirmed) => {
    setIsOpen(false);

    if (confirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      showNotification("Logout successful", "success");
      if (onLogoutSuccess) {
        onLogoutSuccess();
      }
      navigate("/");
    }
  };

  const showNotification = (message, type) => {
    // Implement a custom notification component here
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
      <ConfirmDialog
        isOpen={isOpen}
        actionType="logout"
        handleConfirmation={handleConfirmation}
      />
    </>
  );
};

export default Logout;
