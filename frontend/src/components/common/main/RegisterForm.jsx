/* eslint-disable react/prop-types */
import { FaUserCircle, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";
import Input from "./Input";
import Button from "./Button";
import {
  useFormValidation,
  validationRules,
} from "../../validations/UserValidation";

const RegisterForm = ({ onSubmit, loading }) => {
  const initialState = {
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const { formData, errors, handleInputChange, validateForm } =
    useFormValidation(initialState, validationRules);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold mb-4 text-center text-white">
        Join GreenCare
      </h2>
      <div className="flex space-x-4 mb-4">
        <Input
          icon={FaUserCircle}
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
          className="text-gray-800 border-gray-400"
        />
        <Input
          icon={FaPhone}
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          error={errors.phone}
          className="text-gray-800 border-gray-400"
        />
      </div>
      <Input
        icon={FaEnvelope}
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        className="text-gray-800 border-gray-400"
      />
      <div className="flex space-x-4 mb-4">
        <Input
          icon={FaLock}
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          error={errors.password}
          className="text-gray-800 border-gray-400"
        />
        <Input
          icon={FaLock}
          type="password"
          name="confirmPassword"
          placeholder="Re-Password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={errors.confirmPassword}
          className="text-gray-800 border-gray-400"
        />
      </div>
      <Button type="submit" loading={loading}>
        Sign Up
      </Button>
    </form>
  );
};

export default RegisterForm;
