import { NavLink } from "react-router";
import AuthHook from "../hooks/AuthHook";
import { Link2, User, Mail, Lock, Eye, ArrowRight, EyeOff } from "lucide-react";
import { useState } from "react";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    handleRegisterSubmit,
    errors,
    isSubmitting,
    getValues,
    showPassword,
    setShowPassword,
  } = AuthHook();

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#090D18] flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-6xl min-h-[700px] grid lg:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-[#111827] shadow-2xl">
        {/* LEFT SIDE - IMAGE SECTION */}
        <div className="relative hidden lg:block overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=85"
            alt="Modern technology and digital connectivity"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090D18] via-[#090D18]/60 to-[#090D18]/20" />

          {/* Image content */}
          <div className="relative z-10 h-full flex flex-col justify-between p-12">
            <NavLink to="/" className="flex items-center gap-3 w-fit">
              <div className="h-11 w-11 rounded-xl bg-violet-600 flex items-center justify-center">
                <Link2 size={24} className="text-white" />
              </div>

              <span className="text-xl font-bold text-white">
                URL<span className="text-violet-400">Shortener</span>
              </span>
            </NavLink>

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs text-violet-300 mb-6">
                <span className="h-2 w-2 rounded-full bg-violet-400" />
                SMARTER LINKS. BETTER CONNECTIONS.
              </div>

              <h1 className="text-4xl xl:text-5xl font-bold leading-tight text-white">
                Make every
                <br />
                link count.
                <br />
                <span className="text-violet-400">Share smarter.</span>
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-slate-300">
                Simplify your long URLs, manage all your links in one place, and
                track every click with ease.
              </p>

              <div className="mt-10 flex items-center gap-4">
                <div className="h-1 w-12 rounded-full bg-violet-500" />
                <span className="text-xs tracking-widest text-slate-400">
                  YOUR LINKS, YOUR CONTROL
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              © 2026 URL Shortener. All rights reserved.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - REGISTER FORM */}
        <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-14">
          {/* Mobile logo */}
          <NavLink to="/" className="flex lg:hidden items-center gap-3 mb-10">
            <div className="h-10 w-10 rounded-xl bg-violet-600 flex items-center justify-center">
              <Link2 size={22} className="text-white"/>
            </div>

            <span className="text-xl font-bold text-white">
              URL<span className="text-violet-400">Shortener</span>
            </span>
          </NavLink>

          <div className="mb-8">
            <p className="text-sm font-semibold tracking-wider text-violet-400">
              GET STARTED FOR FREE
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white">
              Create your account
            </h2>

            <p className="mt-3 text-sm text-slate-400">
              Start managing and shortening your links today.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleRegisterSubmit)}
            className="space-y-6"
          >
            {/* Name */}
            <div>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />

                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-white/10 bg-[#090D18] py-4 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                    maxLength: {
                      value: 50,
                      message: "Name cannot exceed 50 characters",
                    },
                  })}
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-[#090D18] py-4 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  className="w-full rounded-xl border border-white/10 bg-[#090D18] py-4 pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    maxLength: {
                      value: 128,
                      message: "Password cannot exceed 128 characters",
                    },
                    validate: {
                      uppercase: (val) =>
                        /[A-Z]/.test(val) ||
                        "At least one uppercase letter is required",
                      Number: (val) =>
                        /[0-9]/.test(val) || "At least one number is required",
                      special: (val) =>
                        /[^A-Za-z0-9\s]/.test(val) ||
                        "At least one special character is required",
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide Password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#91A4BF]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>  

            {/* Confirm Password */}
            <div>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                />

                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="w-full rounded-xl border border-white/10 bg-[#090D18] py-4 pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
                  {...register("confirmPassword", {
                    required: "ConfirmPassword is required",
                    deps: ["password"],
                    validate: (val) =>
                      val === getValues("password") || "Password do not match",
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={showConfirmPassword ? "Hide Password" : "Show password"}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#91A4BF]"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-violet-600 py-4 text-sm font-semibold text-white transition hover:bg-violet-500 active:scale-[0.98]"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <NavLink
              to="/login"
              className="font-semibold text-violet-400 hover:text-violet-300"
            >
              Sign in
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
