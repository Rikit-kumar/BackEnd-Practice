import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { loginUser, registerUser } from "../services/auth.service";

const AuthHook = () => {
  const navigate = useNavigate();

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

      const result = await loginUser(data);
      console.log("Login Successfully", result);
      reset();
      toast.success("User LoggedIn Successfully");
      navigate("/home");
      
    } catch (error) {
      const message = error.res.message || "Login failed. Please check your credentials."
      console.log(message)
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
  };
};

export default AuthHook;
