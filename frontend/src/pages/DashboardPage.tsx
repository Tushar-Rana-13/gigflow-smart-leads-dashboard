import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  useNavigate,
} from "react-router-dom";

import { useAuthStore } from "../store/authStore";

import {
  getLeads,
  deleteLead,
  exportCSV,
} from "../services/leadService";

import type { Lead } from "../types/lead";

import LeadsTable from "../components/LeadsTable";

import CreateLeadForm from "../components/CreateLeadForm";

const DashboardPage = () => {
  const navigate = useNavigate();

  const { user, logout, token } =
    useAuthStore();

  const [leads, setLeads] = useState<
    Lead[]
  >([]);

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [page, setPage] =
    useState(1);

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const data =
        await getLeads(
          token as string,
          page,
          search,
          status
        );

      setLeads(data.leads);
    } catch (error: any) {
      toast.error(
        error.response?.data
          ?.message ||
          "Failed to fetch leads"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, search, status]);

  const handleDelete = async (
    id: string
  ) => {
    try {
      await deleteLead(
        id,
        token as string
      );

      toast.success(
        "Lead deleted"
      );

      fetchLeads();
    } catch (error: any) {
      toast.error(
        error.response?.data
          ?.message ||
          "Delete failed"
      );
    }
  };

  const handleExport =
    async () => {
      try {
        const blob =
          await exportCSV(
            token as string
          );

        const url =
          window.URL.createObjectURL(
            new Blob([blob])
          );

        const link =
          document.createElement("a");

        link.href = url;

        link.setAttribute(
          "download",
          "leads.csv"
        );

        document.body.appendChild(
          link
        );

        link.click();
      } catch {
        toast.error(
          "Export failed"
        );
      }
    };

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md p-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">
            GigFlow Dashboard
          </h1>

          <p className="text-gray-600">
            Welcome, {user?.name}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="p-8">
        <CreateLeadForm
          refreshLeads={fetchLeads}
        />

        <div className="bg-white p-5 rounded-xl shadow-md mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="p-3 border rounded-lg w-full"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
            }
            className="p-3 border rounded-lg"
          >
            <option value="">
              All Status
            </option>

            <option value="new">
              New
            </option>

            <option value="contacted">
              Contacted
            </option>

            <option value="converted">
              Converted
            </option>
          </select>

          <button
            onClick={handleExport}
            className="bg-black text-white px-5 rounded-lg"
          >
            Export CSV
          </button>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md">
          {loading ? (
            <p>Loading leads...</p>
          ) : (
            <LeadsTable
              leads={leads}
              onDelete={
                handleDelete
              }
            />
          )}
        </div>

        <div className="flex gap-4 mt-5">
          <button
            onClick={() =>
              setPage((prev) =>
                Math.max(
                  prev - 1,
                  1
                )
              )
            }
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            Prev
          </button>

          <button
            onClick={() =>
              setPage(
                (prev) => prev + 1
              )
            }
            className="bg-gray-300 px-4 py-2 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;