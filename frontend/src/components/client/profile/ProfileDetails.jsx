/* eslint-disable react/prop-types */
import { Mail, Phone, Edit3, Trash2 } from "lucide-react";

const getRandomAvatar = () => {
  const avatarStyles = ["adventurer", "avataaars"];
  const style = avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
  return `https://api.dicebear.com/7.x/${style}/svg?seed=${Math.random()}&backgroundColor=transparent`;
};

const ProfileDetails = ({ user, handleEdit, handleDeleteProfile }) => {
  const avatarUrl = getRandomAvatar();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-info via-info to-head h-32 sm:h-48"></div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:-mt-16">
            <div className="flex justify-center sm:justify-start flex-shrink-0 -mt-16 sm:mt-0">
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white bg-white shadow-lg"
              />
            </div>
            <div className="mt-6 sm:mt-0 sm:ml-6 text-center sm:text-left space-y-1 sm:pb-4">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                {user.name || "John Doe"}
              </h2>
              <p className="text-gray-500 mb-5">@{user.name || "johndoe"}</p>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
            <div className="flex items-center space-x-3 text-gray-600 bg-gray-100 p-3 rounded-lg">
              <Mail className="h-5 w-5 text-blue-500 flex-shrink-0" />
              <span className="truncate">
                {user.email || "john@example.com"}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-gray-600 bg-gray-100 p-3 rounded-lg">
              <Phone className="h-5 w-5 text-green-500 flex-shrink-0" />
              <span>{user.phone || "+1 234 567 890"}</span>
            </div>
          </div>
          <div className="ml-40 grid grid-cols-1 sm:grid-cols-3 gap-10 ">
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <Edit3 className="h-5 w-5" />
              <span>Edit</span>
            </button>
            <button
              onClick={handleDeleteProfile}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <Trash2 className="h-5 w-5" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
