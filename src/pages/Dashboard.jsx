// Dashboard.jsx
import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // TODO: backend se user ke blogs laa (API call)

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top section */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Welcome back, <span className="text-blue-400">{user?.name?.split(" ")[0]}</span> 👋
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage your blogs, drafts and see your writing activity here.
            </p>
          </div>
          <button
            onClick={() => navigate("/create-blog")}
            className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-sm font-semibold shadow-lg"
          >
            + Create New Blog
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/70 rounded-xl border border-slate-800 p-4">
            <p className="text-xs text-slate-400">Total Blogs</p>
            <p className="text-2xl font-bold mt-1">12</p>
          </div>
          <div className="bg-slate-900/70 rounded-xl border border-slate-800 p-4">
            <p className="text-xs text-slate-400">Published</p>
            <p className="text-2xl font-bold mt-1">8</p>
          </div>
          <div className="bg-slate-900/70 rounded-xl border border-slate-800 p-4">
            <p className="text-xs text-slate-400">Drafts</p>
            <p className="text-2xl font-bold mt-1">4</p>
          </div>
          <div className="bg-slate-900/70 rounded-xl border border-slate-800 p-4">
            <p className="text-xs text-slate-400">Total Views</p>
            <p className="text-2xl font-bold mt-1">1.2k</p>
          </div>
        </div>

        {/* User blogs list (placeholder) */}
        <div className="bg-slate-900/70 rounded-xl border border-slate-800 p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Your Blogs</h2>
            <span className="text-xs text-slate-400">Showing latest</span>
          </div>

          {/* TODO: map userBlogs */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-medium">How to start with React</h3>
                <p className="text-xs text-slate-500">Published • Jan 5, 2025</p>
              </div>
              <div className="flex gap-2 text-xs">
                <button className="px-3 py-1 rounded-lg border border-slate-600 hover:border-blue-400">
                  Edit
                </button>
                <button className="px-3 py-1 rounded-lg border border-red-500/60 hover:bg-red-500/10 text-red-300">
                  Delete
                </button>
                <button className="px-3 py-1 rounded-lg bg-blue-500/80 hover:bg-blue-600">
                  View
                </button>
              </div>
            </div>

            {/* More rows from API… */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
