import { useState } from "react";

export const useFormValidation = (initialState, validationRules) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(validationRules).forEach((field) => {
      const value = formData[field];
      const fieldRules = validationRules[field];
      if (fieldRules.required && !value) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      } else if (fieldRules.pattern && !fieldRules.pattern.test(value)) {
        newErrors[field] = fieldRules.message;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { formData, setFormData, errors, handleInputChange, validateForm };
};

export const validationRules = {
  name: {
    required: true,
    pattern: /^[a-zA-Z\s]+$/,
    message: "Name must not contain numbers or special characters",
  },
  phone: {
    required: true,
    pattern: /^07\d{8}$/,
    message: "Phone number must start with '07' and be exactly 10 digits long",
    maxLength: 10,
  },

  email: {
    required: true,
    pattern: /^[^\s@]+@gmail\.com$/,
    message: "Email must be a valid Gmail address",
  },
  password: {
    required: true,
    pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/,
    message:
      "Password must be at least 6 characters long, include a number, a letter, and a special character",
  },
  confirmPassword: {
    required: true,
    custom: (value, formData) => value === formData.password,
    message: "Passwords do not match",
  },
};
