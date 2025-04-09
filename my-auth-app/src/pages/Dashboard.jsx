import React from "react";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
<div className="min-h-screen flex items-center justify-center bg-customBg bg-dots">
<div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Dashboard</h1>
        <p className="text-center text-blue-600">
          Welcome, <span className="font-semibold">{user?.email}</span>
        </p>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
