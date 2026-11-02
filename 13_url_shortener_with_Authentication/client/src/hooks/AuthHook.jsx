import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const AuthHook = () => {
  const {
    register,
    handleSubmit,
    reset,
    deps,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate();

  const handleRegisterSubmit = (data) => {
    console.log(data);
    navigate("/");
  };

  return {
    register, handleSubmit, handleRegisterSubmit, reset, getValues, deps, errors, showPassword, setShowPassword
  };
};

export default AuthHook;
