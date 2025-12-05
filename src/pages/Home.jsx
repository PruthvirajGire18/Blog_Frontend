import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Home = () => {
  const { user, navigate } = useAuthContext();
  const handleGetStartedClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }
  const handleExploreClick = () => {
    navigate("/blogs");
  }
  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white pt-24">
        {/* Centered container */}
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-800/70 border border-slate-700 rounded-full px-4 py-1 text-xs sm:text-sm mb-6">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <span className="uppercase tracking-wide text-slate-200">
              Welcome to
            </span>
            <span className="font-semibold text-blue-400">BlogSpace</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 leading-tight">
            Write. Publish. <span className="text-blue-400">Inspire.</span>
          </h1>

          {/* Subheading */}
          <p className="mt-4 text-sm sm:text-base md:text-lg text-slate-300">
            Share your knowledge with the world. Create beautiful blog posts,
            connect with readers, and build a loyal audience that grows with you.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button onClick={handleGetStartedClick} className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 active:scale-95 transition transform shadow-lg shadow-blue-500/30 text-sm sm:text-base font-semibold">
              Get Started
            </button>
            <button onClick={handleExploreClick} className="px-6 py-3 rounded-xl border border-slate-600 hover:border-blue-400 hover:bg-slate-800/60 active:scale-95 transition text-sm sm:text-base font-medium">
              Explore Blogs
            </button>
          </div>

          {/* Small helper text */}
          <p className="mt-6 text-xs sm:text-sm text-slate-400">
            No coding required. Just your thoughts, your stories, and your voice.
          </p>
        </div>

        {/* Bottom gradient / decoration */}
        <div className="mt-12 flex justify-center">
          <div className="h-32 w-72 bg-blue-500/30 blur-3xl rounded-full" />
        </div>
      </div>
    </>
  );
};

export default Home;
