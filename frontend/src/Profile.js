import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/auth");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      
      {/* Profile Card */}
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">

        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="mt-4 text-2xl font-bold text-white">
            {user.name}
          </h2>
          <p className="text-slate-400 text-sm">
            {user.email}
          </p>
        </div>

        {/* Info Section */}
        <div className="space-y-4 text-slate-300">
          <div className="flex justify-between bg-slate-800/60 rounded-xl px-4 py-3">
            <span className="text-slate-400">Role</span>
            <span className="font-medium capitalize">{user.role || "user"}</span>
          </div>

          <div className="flex justify-between bg-slate-800/60 rounded-xl px-4 py-3">
            <span className="text-slate-400">Account Type</span>
            <span className="font-medium">Standard</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => navigate("/home")}
            className="w-full py-3 rounded-xl bg-slate-800/70 border border-slate-700/50 text-slate-300 hover:bg-slate-700 transition"
          >
            Back to Home
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-xl bg-red-500/90 text-white font-semibold hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
