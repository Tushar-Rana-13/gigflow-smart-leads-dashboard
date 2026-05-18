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

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const data = await getLeads(
        token as string,
        1, // fixed page = 1 (since pagination is not implemented in UI)
        search,
        status
      );

      setLeads(data.leads);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [search, status]); // removed page dependency

  const handleDelete = async (id: string) => {
    try {
      await deleteLead(id, token as string);
      toast.success("Lead deleted");
      fetchLeads();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Delete failed");
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
      link.remove();
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
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <BarChart3 className="text-blue-600" />
              GigFlow Dashboard
            </h1>

            <p className="text-gray-500">
              Welcome back,{" "}
              <span className="font-semibold">{user?.name}</span>
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">

          <div className="bg-blue-500 text-white p-5 rounded-2xl">
            <Users />
            <h2 className="text-2xl font-bold">{stats.new}</h2>
            <p>New Leads</p>
          </div>

          <div className="bg-green-500 text-white p-5 rounded-2xl">
            <Phone />
            <h2 className="text-2xl font-bold">{stats.contacted}</h2>
            <p>Contacted</p>
          </div>

          <div className="bg-yellow-500 text-white p-5 rounded-2xl">
            <UserCheck />
            <h2 className="text-2xl font-bold">{stats.qualified}</h2>
            <p>Qualified</p>
          </div>

          <div className="bg-red-500 text-white p-5 rounded-2xl">
            <UserX />
            <h2 className="text-2xl font-bold">{stats.lost}</h2>
            <p>Lost</p>
          </div>

        </div>

        {/* Chart */}
        <div className="bg-white p-6 rounded-2xl shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Lead Analytics</h2>

          <div className="h-[300px]">
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

        {/* Filters */}
        <div className="bg-white p-5 rounded-2xl shadow flex flex-col md:flex-row gap-3 items-center mb-8">

          <input
            className="flex-1 p-3 border rounded-xl"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex flex-wrap gap-2">
            {statusTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setStatus(tab.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  status === tab.key
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleExport}
            className="bg-black text-white px-4 py-3 rounded-xl flex items-center gap-2"
          >
            <Download size={18} />
            Export
          </button>

        </div>

        {/* Table */}
        <div className="bg-white p-5 rounded-2xl shadow">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <LeadsTable leads={leads} onDelete={handleDelete} />
          )}
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;