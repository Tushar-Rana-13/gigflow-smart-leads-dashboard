import {
  LayoutDashboard,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } =
    useAuthStore();

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <div className="bg-white shadow-md px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="bg-black text-white p-3 rounded-xl">
          <LayoutDashboard />
        </div>

        <div>
          <h1 className="text-3xl font-bold">
            GigFlow
          </h1>

          <p className="text-gray-500">
            Welcome back,{" "}
            {user?.name}
          </p>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl transition"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
};

export default Navbar;