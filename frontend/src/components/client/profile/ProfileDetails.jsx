/* eslint-disable react/prop-types */

import { Mail, Phone, Edit3, Trash2 } from "lucide-react";
import bgProfile from "../../../assets/profile-bg.jpg";

const getRandomAvatar = () => {
  return `https://d1rig8ldkblbsy.cloudfront.net/app/uploads/2023/02/02143243/em-headshot-credit-chris-chapman-crop-1675430348-1120x1120.jpg?auto=format%2Ccompress&fit=max&fm=webp&monochrome=29000000&q=75&w=1400`;
};

const ProfileDetails = ({ user, handleEdit, handleDeleteProfile }) => {
  const avatarUrl = getRandomAvatar();

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="relative h-52">
        <img
          src={bgProfile}
          alt="Profile background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/70"></div>
      </div>

      <div className="relative px-8 py-10 -mt-56">
        <div className="flex flex-col items-center mb-8">
          <img
            src={avatarUrl}
            alt="Profile"
            className="w-40 h-40 rounded-full border-2 border-info shadow-xl "
          />
          <h2 className="text-4xl font-bold text-info mt-8">
            {user.name || "Bobby Charles"}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-blue-50 rounded-xl p-6 flex items-center space-x-4 transform hover:scale-105 transition-transform duration-300 shadow-md">
            <div className="bg-blue-500 rounded-full p-3">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-500 font-semibold">Email</p>
              <p className="text-lg text-gray-800">
                {user.email || "bob@gmail.com"}
              </p>
            </div>
          </div>
          <div className="bg-green-50 rounded-xl p-6 flex items-center space-x-4 transform hover:scale-105 transition-transform duration-300 shadow-md">
            <div className="bg-green-500 rounded-full p-3">
              <Phone className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-green-500 font-semibold">Phone</p>
              <p className="text-lg text-gray-800">
                {user.phone || "3232323212"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-6">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white py-3 px-8 rounded-xl hover:bg-blue-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Edit3 className="h-5 w-5" />
            <span className="font-semibold">Edit Profile</span>
          </button>
          <button
            onClick={handleDeleteProfile}
            className="bg-red-500 text-white py-3 px-8 rounded-xl hover:bg-red-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Trash2 className="h-5 w-5" />
            <span className="font-semibold">Delete Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
