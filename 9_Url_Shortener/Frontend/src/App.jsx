import React from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="min-h-screen bg-[#060D17] text-slate-100 selection:bg-emerald-400 selection:text-black">
      <Navbar />
      <HomePage />
    </div>
  );
}

export default App;