import React from "react";

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4 font-bold text-xl border-b">Dash</div>
        <nav className="p-4">
          <ul className="space-y-3">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            <li className="hover:text-blue-600 cursor-pointer">Analytics</li>
            <li className="hover:text-blue-600 cursor-pointer">Users</li>
            <li className="hover:text-blue-600 cursor-pointer">Settings</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Logout
          </button>
        </header>

        {/* Content */}
        <main className="p-6 flex-1 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Card */}
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Welcome back</h2>
              <p className="text-gray-600">You have 3 new messages </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">Today's Stats</h2>
              <p className="text-gray-600">+12% growth</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h2 className="text-xl font-semibold mb-2">System Health</h2>
              <p className="text-green-600 font-bold">All systems operational</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;