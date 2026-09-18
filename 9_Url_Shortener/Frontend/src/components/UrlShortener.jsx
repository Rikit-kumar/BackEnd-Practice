import React, { useState } from "react";
import { Link2, Sparkles } from "lucide-react";

const UrlShortener = ({onShorten, loading}) => {

  const [inputUrl, setInputUrl] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();

    if(!inputUrl.trim()) return;
    onShorten(inputUrl);
    setInputUrl("");
  }


  return (
    <section id="home" className="py-12">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10">
        <div className="max-w-xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700/60 text-xs text-slate-300 font-medium mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Shorten • Share • Track
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Turn long URLs into <br />
            <span className="text-emerald-400">short and simple links</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Paste your long URL below and get a short, easy-to-share link in
            seconds.
          </p>
        </div>

        {/* Right Preview Graphic */}
        <div className="w-full max-w-sm rounded-2xl bg-slate-900/90 border border-slate-800 p-5 shadow-2xl relative overflow-hidden hidden md:block">
          <div className="flex gap-2 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          <div className="bg-slate-800/60 rounded-xl p-3 flex items-center gap-3 border border-slate-700/40 text-slate-300 text-sm font-mono">
            <Link2 className="w-4 h-4 text-emerald-400" />
            <span>yourlink.co/abc123</span>
          </div>
        </div>
      </div>

      {/* Input Box */}
      <form onSubmit={handleSubmit}
       className="relative flex items-center bg-slate-900/90 border border-slate-800 rounded-2xl p-2 shadow-xl focus-within:border-emerald-500/50 transition-all">
        <Link2 className="w-5 h-5 text-slate-500 ml-3 shrink-0" />
        <input
          type="text"
          value= {inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          placeholder="Paste your long URL here..."
          className="w-full bg-transparent px-3 py-2 text-sm md:text-base text-slate-200 placeholder:text-slate-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-semibold px-6 py-3 rounded-xl transition-all shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          {loading ? "Shortening..." : "Shorten"}
        </button>
      </form>
    </section>
  );
};

export default UrlShortener;
