import React, { useContext } from "react";
import { NavLink } from "react-router";
import AuthHook from "../hooks/AuthHook";
import { AuthContextStore } from "../context/AuthContext";

import {
  Mail,
  LockKeyhole,
  Eye,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";

const LoginPage = () => {
  const { register, handleSubmit, getValues, loginHandleSubmit, errors } =
    AuthHook();

  const { showPassword, setShowPassword } = useContext(AuthContextStore);

  const inputClass =
    "w-full rounded-xl border border-[#3A4B63] bg-[#1B2A3D] py-3.5 pl-12 pr-12 text-sm text-[#F1F5F9] placeholder:text-[#8190A5] outline-none transition duration-200 focus:border-[#4F8CFF] focus:ring-2 focus:ring-[#4F8CFF]/20";

  const labelClass = "mb-2 block text-sm font-medium text-[#D5DEEA]";

  const iconClass =
    "absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8190A5]";

  return (
    <div className="min-h-screen bg-[#172337] text-[#F1F5F9]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Decorative Panel */}
        <div className="relative hidden overflow-hidden bg-[#22334A] p-12 lg:flex lg:flex-col lg:justify-between xl:p-16">
          {/* Background Effects */}
          <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#4F8CFF]/10 blur-3xl" />

          <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-[#6B7CFF]/10 blur-3xl" />

          {/* Brand */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#6B7CFF] shadow-lg shadow-blue-500/20">
              <Zap className="h-6 w-6 text-white" />
            </div>

            <span className="text-xl font-bold tracking-tight">
              CreateSpace
            </span>
          </div>

          {/* Main Illustration */}
          <div className="relative z-10 mx-auto w-full max-w-lg py-12">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#4F8CFF]/20 bg-[#1B2A3D]/70 px-4 py-2 text-sm text-[#AFC8FF]">
              <Sparkles className="h-4 w-4" />
              Your creative journey continues
            </div>

            <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
              Welcome back to your
              <span className="mt-2 block bg-gradient-to-r from-[#6DA8FF] to-[#A5A0FF] bg-clip-text text-transparent">
                creative space.
              </span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-[#A8B5C8]">
              Pick up where you left off. Your ideas, projects, and
              possibilities are waiting for you.
            </p>

            {/* Decorative Card */}
            <div className="mt-12 rounded-2xl border border-[#3A4B63] bg-[#1B2A3D]/80 p-6 shadow-2xl shadow-black/10 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A8B5C8]">YOUR NEXT CHAPTER</p>

                  <p className="mt-2 text-lg font-semibold">
                    Great things start here.
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#4F8CFF]/15">
                  <Sparkles className="h-6 w-6 text-[#6DA8FF]" />
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-[#4F8CFF]" />
                <div className="h-1.5 flex-1 rounded-full bg-[#4F8CFF]/50" />
                <div className="h-1.5 flex-1 rounded-full bg-[#3A4B63]" />
                <div className="h-1.5 flex-1 rounded-full bg-[#3A4B63]" />
              </div>
            </div>
          </div>

          {/* Left Footer */}
          <div className="relative z-10 flex items-center gap-2 text-sm text-[#8190A5]">
            <ShieldCheck className="h-4 w-4" />A space for your ideas and
            ambitions.
          </div>
        </div>

        {/* Right Login Panel */}
        <div className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-12 xl:px-20">
          <div className="w-full max-w-md">
            {/* Mobile Brand */}
            <div className="mb-12 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#6B7CFF]">
                <Zap className="h-6 w-6 text-white" />
              </div>

              <span className="text-xl font-bold">CreateSpace</span>
            </div>

            {/* Heading */}
            <div className="mb-9">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#4F8CFF]/20 bg-[#4F8CFF]/10">
                <LockKeyhole className="h-7 w-7 text-[#6DA8FF]" />
              </div>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome back
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#A8B5C8]">
                Enter your details below to access your account.
              </p>
            </div>

            {/* Login Form - UI Only */}
            <form
              onSubmit={handleSubmit(loginHandleSubmit)}
              className="space-y-6"
            >
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
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">
                    {" "}
                    {errors.email.message}{" "}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor="password" className={labelClass + " mb-0"}>
                    Password
                  </label>
                </div>

                <div className="relative">
                  <LockKeyhole className={iconClass} />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={inputClass}
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide Password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8190A5]"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>

                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">
                    {" "}
                    {errors.password.message}{" "}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#4F8CFF] to-[#6B7CFF] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-500/25"
              >
                Sign in to your account
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </form>

            {/* Register Link */}
            <p className="mt-8 text-center text-sm text-[#A8B5C8]">
              Don't have an account?{" "}
              <NavLink
                to="/register"
                className="font-semibold text-[#6DA8FF] transition hover:text-[#A5A0FF]"
              >
                Create account
              </NavLink>
            </p>

            {/* Bottom Footer */}
            <div className="mt-10 flex items-center justify-center gap-2 border-t border-[#3A4B63]/70 pt-6 text-xs text-[#8190A5]">
              <ShieldCheck className="h-4 w-4" />
              Your account, your space.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
