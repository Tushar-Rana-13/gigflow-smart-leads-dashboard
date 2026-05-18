import { Pencil, Trash2 } from "lucide-react";
import type { Lead } from "../types/lead";

interface Props {
  leads: Lead[];
  onDelete: (id: string) => void;
  onEdit?: (lead: Lead) => void;
}

const LeadsTable = ({ leads, onDelete, onEdit }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">

        <thead>
          <tr className="bg-gray-100">
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Source</th>
            <th className="p-4 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>
          {leads?.map((lead) => (
            <tr
              key={lead._id}
              className="border-b hover:bg-gray-50 transition"
            >
              <td className="p-4 font-medium">{lead.name}</td>
              <td className="p-4">{lead.email}</td>

              <td className="p-4">
                <span className="bg-black text-white px-3 py-1 rounded-full text-sm capitalize">
                  {lead.status}
                </span>
              </td>

              <td className="p-4 capitalize">{lead.source}</td>

              <td className="p-4 flex gap-3">

                <button
                  onClick={() => onEdit?.(lead)}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
                >
                  <Pencil size={18} />
                </button>

                <button
                  onClick={() => onDelete(lead._id)}
                  className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
                >
                  <Trash2 size={18} />
                </button>

              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default LeadsTable;