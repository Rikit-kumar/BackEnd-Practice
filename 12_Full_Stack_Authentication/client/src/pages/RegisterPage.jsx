import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  UserRound,
  Mail,
  LockKeyhole,
  Eye,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { toast } from "react-toastify";

const RegisterPage = () => {

const navigate = useNavigate()

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

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const inputClass =
    "w-full bg-[#1B2A3D] border border-[#3A4B63] rounded-xl py-3.5 pl-11 pr-11 text-sm text-[#F1F5F9] placeholder:text-[#A8B5C8]/55 outline-none transition-all duration-200 focus:border-[#4F8CFF] focus:ring-2 focus:ring-[#4F8CFF]/20";

  const labelClass = "mb-2 block text-sm font-medium text-[#E2EAF5]";

  const iconClass =
    "absolute left-3.5 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-[#91A4BF]";

  return (
    <div className="min-h-screen bg-[#172337] p-4 text-[#F1F5F9] sm:p-6 lg:p-8">
      <div className="mx-auto grid min-h-[calc(100vh-2rem)] max-w-7xl overflow-hidden rounded-3xl border border-[#3A4B63]/70 bg-[#22334A] shadow-2xl shadow-black/20 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-2">
        {/* Left Panel */}
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#22334A] via-[#1C2C42] to-[#172337] p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#4F8CFF]/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#6B7CFF]/10 blur-3xl" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4F8CFF]/15 text-[#79A8FF] ring-1 ring-[#4F8CFF]/30">
              <Sparkles size={23} />
            </div>

            <span className="text-xl font-semibold tracking-tight">
              CreateSpace
            </span>
          </div>

          <div className="relative z-10 my-12">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#4F8CFF]/25 bg-[#4F8CFF]/10 px-4 py-2 text-sm text-[#B8D0FF]">
              <Sparkles size={15} />
              Your next chapter starts here
            </div>

            <h1 className="max-w-lg text-4xl font-semibold leading-tight tracking-tight text-[#F1F5F9] xl:text-5xl">
              Build something
              <span className="mt-2 block bg-gradient-to-r from-[#8DB7FF] to-[#9FA8FF] bg-clip-text text-transparent">
                extraordinary.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-[#A8B5C8]">
              Create your account and bring your ideas to life in a space
              designed for your next big thing.
            </p>

            {/* Decorative Illustration */}
            <div className="relative mt-12 flex min-h-[230px] items-center justify-center">
              <div className="absolute h-52 w-52 rounded-full border border-[#6487B8]/20" />
              <div className="absolute h-40 w-40 rounded-full border border-[#6487B8]/30" />
              <div className="absolute h-28 w-28 rounded-full bg-[#4F8CFF]/10 blur-xl" />

              <div className="relative flex h-28 w-28 rotate-[-8deg] items-center justify-center rounded-[2rem] border border-[#7297CC]/40 bg-gradient-to-br from-[#344D6C] to-[#22334A] shadow-2xl shadow-black/20">
                <Sparkles size={43} className="text-[#8DB7FF]" />
              </div>

              <div className="absolute left-[14%] top-[18%] flex h-12 w-12 rotate-12 items-center justify-center rounded-2xl border border-[#6487B8]/30 bg-[#293F59] text-[#9EBFFF] shadow-lg">
                <CheckCircle2 size={22} />
              </div>

              <div className="absolute bottom-[15%] right-[15%] flex h-14 w-14 -rotate-12 items-center justify-center rounded-2xl border border-[#6487B8]/30 bg-[#293F59] text-[#9EBFFF] shadow-lg">
                <LockKeyhole size={23} />
              </div>

              <div className="absolute right-[20%] top-[10%] h-3 w-3 rounded-full bg-[#6B9FFF]" />
              <div className="absolute bottom-[15%] left-[22%] h-2 w-2 rounded-full bg-[#9FA8FF]" />
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between border-t border-[#3A4B63]/70 pt-6 text-xs text-[#91A4BF]">
            <span>Designed for your next big idea.</span>
            <span>© 2026 CreateSpace</span>
          </div>
        </section>

        {/* Right Panel */}
        <section className="flex items-center justify-center bg-[#22334A] px-5 py-8 sm:px-10 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">
            {/* Mobile Brand */}
            <div className="mb-9 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#4F8CFF]/15 text-[#79A8FF]">
                <Sparkles size={21} />
              </div>

              <span className="text-lg font-semibold">CreateSpace</span>
            </div>

            {/* Form Heading */}
            <div className="mb-8">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-[#4F8CFF]/25 bg-[#4F8CFF]/10 text-[#79A8FF]">
                <UserRound size={23} />
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-[#F1F5F9] sm:text-4xl">
                Create account
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#A8B5C8]">
                Join us today. It only takes a minute to get started.
              </p>
            </div>

            <form onSubmit={handleSubmit(registerHandleSubmit)} className="space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full name
                </label>

                <div className="relative">
                  <UserRound className={iconClass} />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    className={inputClass}
                    {...register("name", {
                        required: "User Name is Required",
                        setValueAs: (val)=> val.trim(),
                        minLength :{
                            value: 3,
                            message: "Name must be at least 3 characters"
                        },
                        maxLength: {
                            value: 50,
                            message: "Name cannot exceed 50 characters"
                        },
                        validate: (val)=> val.trim().length > 0 || "Name is required",
                    })}
                  />
                </div>
                {errors.name && (<p className="text-sm text-red-600 mt-1"> {errors.name.message} </p>)}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email address
                </label>

                <div className="relative">
                  <Mail className={iconClass} />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className={inputClass}
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Please enter a valid email address"
                        }
                    })}
                  />
                </div>
                {errors.email && (<p className="text-sm text-red-600 mt-1"> {errors.email.message} </p>)}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole className={iconClass} />

                  <input
                    id="password"
                    name="password"
                    type= {showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className={inputClass}
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        },
                        maxLength: {
                            value: 128,
                            message: "Password cannot exceed 128 characters"
                        },
                        validate: {
                            uppercase: (val)=> /[A-Z]/.test(val) || "At least one uppercase letter is required",
                            Number: (val)=> /[0-9]/.test(val) || "At least one number is required",
                            special: (val)=> /[^A-Za-z0-9]/.test(val) || "At least one special character is required"
                        }
                    })}
                  />

                  <button
                    type="button"
                    onClick={()=> setShowPassword((prev)=> !prev)}
                    aria-label={showPassword ? "Hide Password": "Show password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#91A4BF]"
                  >
                    <Eye size={18} />
                  </button>
                </div>
                
                {errors.password && (<p className="text-sm text-red-600 mt-1"> {errors.password.message} </p>)}
                
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className={labelClass}>
                  Confirm password
                </label>

                <div className="relative">
                  <LockKeyhole className={iconClass} />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Enter your password again"
                    className={inputClass}
                    {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (val) => val === getValues("password") || "Password do not match"
                    })}
                  />

                  <button
                    type="button"
                    onClick={()=> setShowConfirmPassword((prev)=> !prev)}
                    aria-label={showConfirmPassword ? "Hide Password": "Show password"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#91A4BF]"
                  >
                    <Eye size={18} />
                  </button>
                </div>
                {errors.confirmPassword && (<p className="text-sm text-red-600 mt-1"> {errors.confirmPassword.message} </p>)} 
              </div>

              {/* Terms */}
              <p className="text-xs leading-5 text-[#A8B5C8]">
                By creating an account, you agree to our{" "}
                <a
                  href="#terms"
                  className="text-[#8DB7FF] underline-offset-4 hover:underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#privacy"
                  className="text-[#8DB7FF] underline-offset-4 hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>

              {/* UI Only Button */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4F8CFF] to-[#6B7CFF] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#4F8CFF]/15 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#4F8CFF]/20 focus:outline-none focus:ring-2 focus:ring-[#8DB7FF] focus:ring-offset-2 focus:ring-offset-[#22334A]"
              >
                Create account
                <ArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>
            </form>

            {/* Login Link */}
            <p className="mt-7 text-center text-sm text-[#A8B5C8]">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className="font-semibold text-[#8DB7FF] transition-colors hover:text-white"
              >
                Sign in
              </NavLink>
            </p>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[#91A4BF]">
              <LockKeyhole size={13} />
              Your information stays protected.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RegisterPage;
