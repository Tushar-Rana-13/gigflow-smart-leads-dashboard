import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  getLeads,
  deleteLead,
  exportCSV,
} from "../services/leadService";

import { useAuthStore } from "../store/authStore";

import type { Lead } from "../types/lead";

import LeadsTable from "../components/LeadsTable";

import CreateLeadForm from "../components/CreateLeadForm";

import EditLeadModal from "../components/EditLeadModel";

import Loader from "../components/Loader";

import EmptyState from "../components/EmptyState";

import Navbar from "../components/Navbar";

import useDebounce from "../hooks/useDebounce";

import StatsCard from "../components/StatsCard";

import LeadChart from "../components/LeadChart";

const DashboardPage = () => {
  const { token } =
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

  const [selectedLead,
    setSelectedLead] =
    useState<Lead | null>(null);

  const debouncedSearch =
    useDebounce(search, 500);

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const data =
        await getLeads(
          token as string,
          page,
          debouncedSearch,
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
  }, [
    page,
    debouncedSearch,
    status,
  ]);

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
    } catch {
      toast.error(
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

  const totalLeads =
    leads.length;

  const newLeads = leads.filter(
    (lead) =>
      lead.status === "new"
  ).length;

  const contactedLeads =
    leads.filter(
      (lead) =>
        lead.status ===
        "contacted"
    ).length;

  const convertedLeads =
    leads.filter(
      (lead) =>
        lead.status ===
        "converted"
    ).length;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-4 md:p-8">
        <CreateLeadForm
          refreshLeads={fetchLeads}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          <StatsCard
            title="Total Leads"
            value={totalLeads}
            color="bg-black"
          />

          <StatsCard
            title="New Leads"
            value={newLeads}
            color="bg-blue-600"
          />

          <StatsCard
            title="Contacted"
            value={contactedLeads}
            color="bg-yellow-500"
          />

          <StatsCard
            title="Converted"
            value={convertedLeads}
            color="bg-green-600"
          />
        </div>

        <div className="mb-6">
          <LeadChart leads={leads} />
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md mb-6 flex flex-col md:flex-row gap-4">
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

            <option value="qualified">
              Qualified
            </option>

            <option value="converted">
              Converted
            </option>

            <option value="lost">
              Lost
            </option>
          </select>

          <button
            onClick={handleExport}
            className="bg-black hover:bg-gray-800 text-white px-5 py-3 rounded-lg"
          >
            Export CSV
          </button>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-md">
          {loading ? (
            <Loader />
          ) : leads.length === 0 ? (
            <EmptyState />
          ) : (
            <LeadsTable
              leads={leads}
              onDelete={handleDelete}
              onEdit={setSelectedLead}
            />
          )}
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() =>
              setPage((prev) =>
                Math.max(
                  prev - 1,
                  1
                )
              )
            }
            className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-lg"
          >
            Prev
          </button>

          <button
            onClick={() =>
              setPage(
                (prev) => prev + 1
              )
            }
            className="bg-gray-300 hover:bg-gray-400 px-5 py-2 rounded-lg"
          >
            Next
          </button>
        </div>
      </div>

      {selectedLead && (
        <EditLeadModal
          lead={selectedLead}
          onClose={() =>
            setSelectedLead(null)
          }
          refreshLeads={fetchLeads}
        />
      )}
    </div>
  );
};

export default DashboardPage;