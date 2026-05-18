import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  BarChart3,
  Users,
  UserCheck,
  UserX,
  Phone,
  Download,
  LogOut,
} from "lucide-react";

import { useAuthStore } from "../store/authStore";
import { getLeads, deleteLead, exportCSV } from "../services/leadService";
import type { Lead } from "../types/lead";

import LeadsTable from "../components/LeadsTable";
import CreateLeadForm from "../components/CreateLeadForm";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

const statusTabs = [
  { key: "", label: "All" },
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "qualified", label: "Qualified" },
  { key: "lost", label: "Lost" },
];

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout, token } = useAuthStore();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const data = await getLeads(
        token as string,
        page,
        search,
        status
      );

      setLeads(data.leads);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch leads"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, search, status]);

  const handleDelete = async (id: string) => {
    try {
      await deleteLead(id, token as string);
      toast.success("Lead deleted");
      fetchLeads();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const handleExport = async () => {
    try {
      const blob = await exportCSV(token as string);

      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");

      link.href = url;
      link.setAttribute("download", "leads.csv");

      document.body.appendChild(link);
      link.click();
    } catch {
      toast.error("Export failed");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const stats = {
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    qualified: leads.filter((l) => l.status === "qualified").length,
    lost: leads.filter((l) => l.status === "lost").length,
  };

  const chartData = [
    { name: "New", value: stats.new },
    { name: "Contacted", value: stats.contacted },
    { name: "Qualified", value: stats.qualified },
    { name: "Lost", value: stats.lost },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50">

      {/* Header */}
      <div className="bg-white shadow-md border-b">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">

          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <BarChart3 className="text-blue-600" />
              GigFlow Dashboard
            </h1>

            <p className="text-gray-500 mt-1">
              Welcome back,{" "}
              <span className="font-semibold">{user?.name}</span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
            <Users size={40} />
            <p>New Leads</p>
            <h2 className="text-4xl font-bold">{stats.new}</h2>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
            <Phone size={40} />
            <p>Contacted</p>
            <h2 className="text-4xl font-bold">{stats.contacted}</h2>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-2xl shadow-lg">
            <UserCheck size={40} />
            <p>Qualified</p>
            <h2 className="text-4xl font-bold">{stats.qualified}</h2>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg">
            <UserX size={40} />
            <p>Lost Leads</p>
            <h2 className="text-4xl font-bold">{stats.lost}</h2>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">Lead Analytics</h2>

          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} dataKey="value" outerRadius={120} label>
                  {chartData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Create Lead */}
        <CreateLeadForm refreshLeads={fetchLeads} />

        {/* Filters with BEAUTIFUL TABS */}
        <div className="bg-white rounded-3xl shadow-lg p-5 mb-8 flex flex-col md:flex-row gap-4 items-center">

          {/* Search */}
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {/* Status Tabs */}
          <div className="flex flex-wrap gap-2">
            {statusTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatus(tab.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${
                    status === tab.key
                      ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Export */}
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-5 py-3 rounded-xl transition"
          >
            <Download size={18} />
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-lg p-5 overflow-x-auto">
          {loading ? (
            <p>Loading leads...</p>
          ) : (
            <LeadsTable leads={leads} onDelete={handleDelete} />
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            className="bg-white shadow px-5 py-2 rounded-xl hover:bg-gray-100"
          >
            Prev
          </button>

          <button
            onClick={() => setPage((p) => p + 1)}
            className="bg-white shadow px-5 py-2 rounded-xl hover:bg-gray-100"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;