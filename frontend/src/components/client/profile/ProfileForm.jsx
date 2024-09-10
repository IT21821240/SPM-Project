/* eslint-disable react/prop-types */

import { User, Mail, Phone, Save, X } from "lucide-react";
import { useState } from "react";

const ProfileForm = ({
  formData,
  handleInputChange,
  handleUpdateProfile,
  setEditMode,
}) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid.";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (
      !/^\+?\d{1,4}?[-.\s]?\(?\d{1,4}?\)?[-.\s]?\d{1,9}([-.\s]?\d{1,9})*$/.test(
        formData.phone
      )
    ) {
      newErrors.phone = "Phone number is invalid.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      handleUpdateProfile(e);
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Edit Profile
      </h2>
      <div className="relative">
        <label
          htmlFor="name"
          className="absolute left-3 -top-2.5 bg-white px-1 text-sm font-medium text-gray-600"
        >
          Name
        </label>
        <div className="flex flex-col">
          <div className="flex items-center">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name || ""}
              onChange={handleInputChange}
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="John Doe"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>
      </div>
      <div className="relative">
        <label
          htmlFor="email"
          className="absolute left-3 -top-2.5 bg-white px-1 text-sm font-medium text-gray-600"
        >
          Email
        </label>
        <div className="flex flex-col">
          <div className="flex items-center">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="john@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
      </div>
      <div className="relative">
        <label
          htmlFor="phone"
          className="absolute left-3 -top-2.5 bg-white px-1 text-sm font-medium text-gray-600"
        >
          Phone
        </label>
        <div className="flex flex-col">
          <div className="flex items-center">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone || ""}
              onChange={handleInputChange}
              className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="+1 234 567 890"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => setEditMode(false)}
          className="px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 flex items-center space-x-2"
        >
          <X className="h-5 w-5" />
          <span>Cancel</span>
        </button>
        <button
          type="submit"
          className="px-6 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 flex items-center space-x-2"
        >
          <Save className="h-5 w-5" />
          <span>Save Changes</span>
        </button>
      </div>
    </form>
  );
};

export default ProfileForm;
