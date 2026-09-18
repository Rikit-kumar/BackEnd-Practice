import React from "react";
import { Link2, Home, History } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-5 max-w-6xl mx-auto border-b border-slate-800/60">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
          <Link2 className="w-5 h-5 -rotate-45" />
        </div>
        <span className="text-xl font-bold text-white tracking-wide">
          URL Shortener
        </span>
      </div>

      <div className="flex items-center gap-6 text-sm text-slate-400 font-medium">
        <a
          href="#home"
          className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
        >
          <Home className="w-4 h-4" /> Home
        </a>
        <a
          href="#history"
          className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
        >
          <History className="w-4 h-4" /> History
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
