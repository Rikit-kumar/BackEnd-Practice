import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useContext, useState } from "react";

import { registerUser } from "../services/auth.service";
import { AuthContextStore } from "../context/AuthContext";

const AuthHook = () => {
  const navigate = useNavigate();
  const {login} = useContext(AuthContextStore)

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const registerHandleSubmit = async (data) => {
    try {
      const result = await registerUser(data);
      console.log("Registration successfully", result);
      reset();
      toast.success("User Register Successfully");
      navigate("/");
    } catch (error) {
      const message =
        error.res.message || "Registration failed. Please try again.";
      console.log(message);
    }
  };

  const loginHandleSubmit = async (data) => {

    try {

      const result = await login(data);
      console.log("Login Successfully", result);
      reset();
      toast.success("User Logged In Successfully");
      navigate("/main");
      
    } catch (error) {
      const message = error.response?.data?.message || "Login failed. Please check your credentials."
      toast.error(message);
    }
    
  };

  return {
    register,
    reset,
    handleSubmit,
    getValues,
    errors,
    registerHandleSubmit,
    loginHandleSubmit,
    showPassword, 
    setShowPassword
  };
};

export default AuthHook;
