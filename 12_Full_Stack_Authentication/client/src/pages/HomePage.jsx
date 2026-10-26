import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { AuthContextStore } from "../context/AuthContext";

const HomePage = () => {
  const { user, logout } = useContext(AuthContextStore);
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      navigate("/login", { replace: true });
    }
  };

  const displayName = user?.name || "User";
  const firstLetter = displayName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-[#0c0d12] text-slate-100 md:flex">
      {/* Sidebar */}
      <aside className="flex w-full flex-col border-b border-white/10 bg-[#101117] p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet-500 text-lg font-bold shadow-lg shadow-violet-500/20">
            N
          </div>
          <h2 className="text-xl font-bold tracking-tight">
            Nova<span className="text-violet-400">Space</span>
          </h2>
        </div>

        <p className="mb-3 mt-8 text-xs font-semibold tracking-[0.2em] text-slate-500">
          WORKSPACE
        </p>

        <nav className="flex gap-2 overflow-x-auto md:flex-col">
          <a
            href="#overview"
            className="flex items-center gap-3 rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-3 text-sm text-violet-300"
          >
            <span>▦</span> Overview
          </a>

          <a
            href="#activity"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <span>◷</span> Activity
          </a>

          <a
            href="#projects"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <span>▤</span> Projects
          </a>

          <a
            href="#account"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            <span>⚙</span> Account
          </a>
        </nav>

        <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5 md:mt-auto">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-violet-400/20 bg-violet-500/15 font-bold text-violet-200">
            {firstLetter}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{displayName}</p>
            <p className="text-xs text-slate-500">Account member</p>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            title="Logout"
            aria-label="Logout"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-400/10 hover:text-red-300 disabled:opacity-50"
          >
            ↗
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main id="overview" className="min-w-0 flex-1">
        <header className="flex min-h-20 flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-8 lg:px-10">
          <div>
            <p className="text-xs text-slate-500">Workspace / Overview</p>
            <p className="mt-1 text-sm text-slate-300">
              Your personal dashboard
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-xs text-slate-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Session active
            </span>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="rounded-xl border border-violet-400/20 bg-violet-500/10 px-4 py-2.5 text-sm font-medium text-violet-200 transition hover:bg-violet-500/20 disabled:cursor-wait disabled:opacity-50"
            >
              {loggingOut ? "Logging out..." : "Logout ↗"}
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-7xl space-y-6 p-5 sm:p-8 lg:p-10">
          {/* Welcome banner */}
          <section className="relative overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-500/15 via-[#171620] to-[#13141b] p-6 sm:p-9">
            <div className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border border-violet-300/10" />
            <div className="pointer-events-none absolute -right-2 -top-10 h-44 w-44 rounded-full border border-violet-300/10" />

            <div className="relative">
              <p className="text-xs font-semibold tracking-[0.2em] text-violet-300">
                ✦ YOUR PERSONAL WORKSPACE
              </p>

              <h1 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                Welcome back,
                <span className="block text-violet-300">{displayName}.</span>
              </h1>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-400">
                Everything is in one place. Ready to make today productive?
              </p>

              <a
                href="#activity"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400"
              >
                Explore dashboard <span>↘</span>
              </a>
            </div>
          </section>

          {/* Summary cards */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <article className="rounded-2xl border border-white/10 bg-[#13151d] p-5 transition hover:-translate-y-1 hover:border-violet-400/30">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Workspace</span>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-violet-400/10 text-xl text-violet-300">
                  ◈
                </span>
              </div>
              <h2 className="mt-6 text-3xl font-semibold">01</h2>
              <p className="mt-2 text-sm text-slate-500">Your personal space</p>
              <div className="mt-5 border-t border-white/10 pt-4 text-xs text-violet-300">
                Ready to get started ↗
              </div>
            </article>

            <article className="rounded-2xl border border-white/10 bg-[#13151d] p-5 transition hover:-translate-y-1 hover:border-blue-400/30">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Daily activity</span>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-400/10 text-xl text-blue-300">
                  ◷
                </span>
              </div>
              <h2 className="mt-6 text-3xl font-semibold">Today</h2>
              <p className="mt-2 text-sm text-slate-500">
                Make progress at your pace
              </p>
              <div className="mt-5 border-t border-white/10 pt-4 text-xs text-blue-300">
                One step at a time ↗
              </div>
            </article>

            <article className="rounded-2xl border border-white/10 bg-[#13151d] p-5 transition hover:-translate-y-1 hover:border-emerald-400/30 sm:col-span-2 xl:col-span-1">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Account status</span>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400/10 text-xl text-emerald-300">
                  ✓
                </span>
              </div>
              <h2 className="mt-6 text-3xl font-semibold">Active</h2>
              <p className="mt-2 text-sm text-slate-500">
                Your session is authenticated
              </p>
              <div className="mt-5 border-t border-white/10 pt-4 text-xs text-emerald-300">
                You're all set ✓
              </div>
            </article>
          </section>

          {/* Main panels */}
          <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
            <article
              id="activity"
              className="rounded-2xl border border-white/10 bg-[#13151d] p-6 sm:p-7"
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-violet-300">
                YOUR SPACE
              </p>
              <h2 className="mt-2 text-xl font-semibold">Getting started</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Your dashboard is ready. Here are a few things you can do next.
              </p>

              <div className="mt-6 divide-y divide-white/10">
                {[
                  {
                    number: "01",
                    title: "Explore your dashboard",
                    description: "Get familiar with your personal workspace.",
                  },
                  {
                    number: "02",
                    title: "Review your account",
                    description: "Check your profile information.",
                  },
                  {
                    number: "03",
                    title: "Keep moving forward",
                    description: "Your next step starts when you're ready.",
                  },
                ].map((item) => (
                  <div
                    key={item.number}
                    className="flex items-center gap-4 py-5"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-400/10 text-xs font-bold text-violet-300">
                      {item.number}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-medium text-slate-200">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                    <span className="text-slate-500">↗</span>
                  </div>
                ))}
              </div>
            </article>

            <article
              id="account"
              className="rounded-2xl border border-white/10 bg-[#13151d] p-6 sm:p-7"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-violet-300">
                    PERSONAL DETAILS
                  </p>
                  <h2 className="mt-2 text-xl font-semibold">Your account</h2>
                </div>
                <span className="text-2xl text-violet-300">◈</span>
              </div>

              <div className="mt-7 flex flex-col items-center text-center">
                <div className="grid h-20 w-20 place-items-center rounded-2xl border border-violet-300/20 bg-gradient-to-br from-violet-400/30 to-violet-900/30 text-3xl font-bold text-violet-200 shadow-xl shadow-violet-500/10">
                  {firstLetter}
                </div>
                <h3 className="mt-4 max-w-full break-words text-lg font-semibold">
                  {displayName}
                </h3>
                <p className="mt-1 max-w-full break-all text-sm text-slate-400">
                  {user?.email || "Email not available"}
                </p>
              </div>

              <div className="my-6 border-t border-white/10" />

              <div className="space-y-5 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-slate-500">Full name</span>
                  <span className="max-w-[60%] break-words text-right text-slate-200">
                    {displayName}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className="text-slate-500">Email address</span>
                  <span className="max-w-[60%] break-all text-right text-slate-200">
                    {user?.email || "Not available"}
                  </span>
                </div>
              </div>

              <div className="mt-7 flex items-center justify-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/5 px-3 py-3 text-xs text-emerald-300">
                <span>✓</span> Authenticated session
              </div>
            </article>
          </section>

          <footer className="flex flex-wrap justify-between gap-3 border-t border-white/10 py-5 text-xs text-slate-500">
            <span>© 2026 NovaSpace</span>
            <span>Designed for focus. Built for progress. ✦</span>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
