import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

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

  const registerHandleSubmit = (data) => {
    console.log(data);
    reset();
    toast.success("User Register Successfully");
    navigate("/");
  };

  const loginHandleSubmit = (data)=>{
    console.log(data);
    reset();
    toast.success("User LoggedIn Successfully");
    navigate("/home")
  }

  return {
    register, reset, handleSubmit, getValues, errors, registerHandleSubmit, loginHandleSubmit
  };
};

export default AuthHook;
