import { NavLink } from "react-router";
import AuthHook from "../hooks/AuthHook";
import {
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  ArrowRight,
  ShieldCheck,
  Zap,
  Link2,
} from "lucide-react";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    handleLoginSubmit,
    errors,
    isSubmitting,
    showPassword,
    setShowPassword,
  } = AuthHook();


  return (
    <div className="min-h-screen bg-[#090D18] text-white flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-6xl min-h-[680px] grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-[#111827] shadow-2xl shadow-black/40">
        {/* LEFT IMAGE SECTION */}
        <div className="relative hidden lg:flex flex-col justify-between overflow-hidden p-10 xl:p-12">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85"
            alt="Modern workspace"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#090D18]/90 via-[#111827]/65 to-violet-950/70" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#090D18]/90 via-transparent to-transparent" />

          {/* Brand */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-600/30">
              <Link2 size={23} />
            </div>

            <span className="text-xl font-bold tracking-wide">
              Link<span className="text-violet-400">Flow</span>
            </span>
          </div>

          {/* Main content */}
          <div className="relative z-10 max-w-md">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-200 backdrop-blur-md">
              <Zap size={15} />
              Your links, simplified
            </span>

            <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
              Welcome back to your
              <span className="block text-violet-400">link workspace.</span>
            </h1>

            <p className="mt-5 text-base leading-7 text-gray-300">
              Manage your shortened URLs, track clicks, and keep everything
              organized in one simple workspace.
            </p>

            {/* Feature cards */}
            <div className="mt-9 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <Link2 className="mb-3 text-violet-300" size={22} />
                <h3 className="font-semibold">Smart Links</h3>
                <p className="mt-1 text-xs text-gray-300">
                  Create and manage your URLs.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-md">
                <ShieldCheck className="mb-3 text-violet-300" size={22} />
                <h3 className="font-semibold">Private Space</h3>
                <p className="mt-1 text-xs text-gray-300">
                  Your links stay in your account.
                </p>
              </div>
            </div>
          </div>

          <p className="relative z-10 text-xs text-gray-400">
            © 2026 LinkFlow. All rights reserved.
          </p>
        </div>

        {/* RIGHT LOGIN FORM SECTION */}
        <div className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">
            {/* Mobile brand */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600">
                <Link2 size={23} />
              </div>

              <span className="text-xl font-bold">
                Link<span className="text-violet-400">Flow</span>
              </span>
            </div>

            {/* Heading */}
            <div className="mb-9">
              <p className="mb-3 text-sm font-medium tracking-wide text-violet-400">
                WELCOME BACK
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Sign in to your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                Enter your credentials to access your dashboard.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(handleLoginSubmit)}
              className="space-y-6"
            >
              {/* Email */}
              <div>

                <div
                  className={`flex items-center rounded-xl border bg-[#090D18] transition ${
                    errors.email
                      ? "border-red-500"
                      : "border-white/10 focus-within:border-violet-500"
                  }`}
                >
                  <Mail className="ml-4 text-gray-500" size={19} />

                  <input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    className="w-full bg-transparent px-4 py-4 text-sm text-white outline-none placeholder:text-gray-600"
                  />
                </div>

                {errors.email && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between">
                </div>

                <div
                  className={`flex items-center rounded-xl border bg-[#090D18] transition ${
                    errors.password
                      ? "border-red-500"
                      : "border-white/10 focus-within:border-violet-500"
                  }`}
                >
                  <LockKeyhole className="ml-4 text-gray-500" size={19} />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className="w-full bg-transparent px-4 py-4 text-sm text-white outline-none placeholder:text-gray-600"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="mr-4 text-gray-500 transition hover:text-violet-400"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-2 text-xs text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Signing in..." : "Sign in to your account"}

                {!isSubmitting && (
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            {/* Register link */}
            <div className="mt-8 border-t border-white/10 pt-7 text-center">
              <p className="text-sm text-gray-400">
                Don't have an account?
                <NavLink
                  to="/register"
                  className="ml-2 font-semibold text-violet-400 transition hover:text-violet-300"
                >
                  Create account
                </NavLink>
              </p>
            </div>

            <p className="mt-8 text-center text-xs text-gray-600">
              Secure authentication · Your account, your links
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
