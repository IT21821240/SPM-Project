import { useState, useEffect } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Input from "./Input";
import Button from "./Button";

// eslint-disable-next-line react/prop-types
const LoginForm = ({ onSubmit, loading, initialEmail }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialEmail) {
      setFormData((prevData) => ({ ...prevData, email: initialEmail }));
    }
  }, [initialEmail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@gmail\.com$/;

    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Email must be a valid Gmail address";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold mb-4 text-center text-white">
        Welcome Back!
      </h2>
      <Input
        icon={FaEnvelope}
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleInputChange}
        error={errors.email}
        className="text-gray-900 border-gray-500"
      />
      <Input
        icon={FaLock}
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleInputChange}
        error={errors.password}
        className="text-gray-900 border-gray-500"
      />
      <Button type="submit" loading={loading}>
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
