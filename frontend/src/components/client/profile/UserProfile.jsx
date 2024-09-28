/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { FaFilePdf, FaLeaf } from "react-icons/fa";
import ProfileForm from "./ProfileForm";
import ProfileDetails from "./ProfileDetails";
import ConfirmDialog from "./ConfirmDialog";
import Header from "../../common/section/Header";
import Footer from "../../common/section/Footer";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(
          `http://localhost:3000/api/users/profile/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch user profile");
        const data = await response.json();
        setUser(data.user);
        setFormData({
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone,
        });
      } catch (error) {
        console.error(error);
        setError("Failed to fetch user profile");
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userId = localStorage.getItem("userId");

      // Basic validation
      if (!formData.name || !formData.email || !formData.phone) {
        setError("All fields are required");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/users/profile/update/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const data = await response.json();
      setUser(data.user);
      setEditMode(false);
      showNotification("Profile updated successfully", "success");
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Failed to update profile");
    }
  };

  const handleDeleteProfile = () => {
    setActionType("delete");
    setIsOpen(true);
  };

  const handleLogout = () => {
    setActionType("logout");
    setIsOpen(true);
  };

  const handleConfirmation = async (confirmed) => {
    setIsOpen(false);

    if (confirmed) {
      if (actionType === "delete") {
        try {
          const userId = localStorage.getItem("userId");
          const response = await fetch(
            `http://localhost:3000/api/users/profile/delete/${userId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (!response.ok) throw new Error("Failed to delete profile");
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          showNotification("Profile deleted successfully", "success");
          navigate("/");
        } catch (error) {
          console.error(error);
          setError("Failed to delete profile");
        }
      } else if (actionType === "logout") {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        showNotification("Logout successful", "success");
        navigate("/");
      }
    }
  };

  const showNotification = (message, type) => {
    // Implement a custom notification component here
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-green-500 text-white py-4 px-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Profile Information</h2>
                <div className="bg-white rounded-full p-2">
                  <FaLeaf className="text-2xl text-green-600" />
                </div>
              </div>
              <div className="p-6">
                {editMode ? (
                  <ProfileForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    handleUpdateProfile={handleUpdateProfile}
                    setEditMode={setEditMode}
                  />
                ) : (
                  <ProfileDetails
                    user={user}
                    handleEdit={() => setEditMode(true)}
                    handleDeleteProfile={handleDeleteProfile}
                    handleLogout={handleLogout}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog
        isOpen={isOpen}
        actionType={actionType}
        handleConfirmation={handleConfirmation}
      />
      <Footer />
    </div>
  );
};

const ActivityList = () => {
  const activities = [
    { date: "2023-05-15", action: "Uploaded a new plant image" },
    { date: "2023-05-10", action: "Identified a disease in tomato plants" },
    { date: "2023-05-05", action: "Earned 50 Green Points" },
    { date: "2023-05-01", action: "Completed plant care quiz" },
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <ActivityItem
          key={index}
          date={activity.date}
          action={activity.action}
        />
      ))}
    </div>
  );
};

const ActivityItem = ({ date, action }) => (
  <div className="border-l-4 border-info pl-4 py-2">
    <p className="text-sm text-gray-600">{date}</p>
    <p className="font-semibold text-gray-800">{action}</p>
  </div>
);

export default UserProfile;
