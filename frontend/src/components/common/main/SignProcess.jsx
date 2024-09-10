import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import background from "../../../assets/background.jpg";
import LoginForm from "./LoginForm";

import RegisterForm from "./RegisterForm";
import InfoSection from "./InfoSection";

const API_BASE_URL = "http://localhost:3000/api/users";

const SignProcess = () => {
  const navigate = useNavigate();
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleSubmit = async (formData) => {
    setLoading(true);

    try {
      if (isLoginPage) {
        const response = await fetch(`${API_BASE_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token);

          const tokenPayload = JSON.parse(atob(data.token.split(".")[1]));
          console.log("Token payload:", tokenPayload);
          const userRole = tokenPayload.role;
          console.log("User role:", userRole);

          if (userRole === "admin") {
            navigate("/admindashboard");
          } else if (userRole === "user") {
            navigate("/userhome");
          } else {
            navigate("/");
          }

          toast.success("Login successful! Welcome back to GreenCare.");
        } else {
          toast.error(data.error || "Login failed. Please try again.");
        }
      } else {
        const response = await fetch(`${API_BASE_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(
            "Registration successful! Let's start your gardening journey."
          );
          setRegisteredEmail(formData.email);
          setIsLoginPage(true);
        } else {
          console.error("Registration failed:", data.error);
          toast.error(data.error || "Registration failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error during submit:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePage = () => {
    setIsLoginPage(!isLoginPage);
    setRegisteredEmail("");
  };

  const pageVariants = {
    initial: { opacity: 0, x: -20 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: 20 },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.3,
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center py-8 px-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="z-50"
      />

      <header className="fixed top-0 left-0 w-full bg-head bg-opacity-70 text-white text-center py-4 shadow-lg z-40">
        <h1 className="text-3xl font-bold">Green Care</h1>
      </header>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto p-6 rounded-xl shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLoginPage ? "info" : "info-register"}
            className="md:w-1/2 w-full mb-6 md:mb-0 md:pr-6"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <InfoSection isLoginPage={isLoginPage} onToggle={togglePage} />
          </motion.div>

          <motion.div
            key={isLoginPage ? "login" : "register"}
            className="md:w-1/2 w-full"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <div className="bg-white bg-opacity-10 p-6 rounded-lg shadow-xl backdrop-blur-md">
              {isLoginPage ? (
                <LoginForm
                  onSubmit={handleSubmit}
                  loading={loading}
                  initialEmail={registeredEmail}
                />
              ) : (
                <RegisterForm onSubmit={handleSubmit} loading={loading} />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-60 text-white text-center py-4">
        <p className="text-sm">
          © {new Date().getFullYear()} Green Care. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default SignProcess;
