import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { registerUserApi } from "../services/auth.services";
import { toast } from "react-toastify";

const AuthHook = () => {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegisterSubmit = async (data) => {
    try {
      const response = await registerUserApi(data);
      toast.success(response.data.message || "User registered successfully");
      reset();
      navigate("/");
    } catch (error) {
      console.error("Registration Error:", error);
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";
      toast.error(errorMsg);
      reset();
    }
  };

  const handleLoginSubmit = async (data) => {
    try {
      await login({
        email: data.email,
        password: data.password,
      });

      toast.success("Welcome back! Login successful.");

      reset();

      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);

      const errorMessage =
        error?.response?.data?.message ||
        "Login failed. Please check your credentials.";

      toast.error(errorMessage);
    }
  };

  return {
    register,
    handleSubmit,
    handleRegisterSubmit,
    handleLoginSubmit,
    reset,
    getValues,
    errors,
    isSubmitting,
    showPassword,
    setShowPassword,
  };
};

export default AuthHook;
