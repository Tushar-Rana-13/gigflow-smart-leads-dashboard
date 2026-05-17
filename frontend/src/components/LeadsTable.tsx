import type { Lead } from "../types/lead";

interface Props {
  leads: Lead[];

  onDelete: (id: string) => void;
}

const LeadsTable = ({
  leads,
  onDelete,
}: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3 text-left">
              Name
            </th>

            <th className="p-3 text-left">
              Email
            </th>

            <th className="p-3 text-left">
              Status
            </th>

            <th className="p-3 text-left">
              Source
            </th>

            <th className="p-3 text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead._id}
              className="border-b"
            >
              <td className="p-3">
                {lead.name}
              </td>

              <td className="p-3">
                {lead.email}
              </td>

              <td className="p-3">
                {lead.status}
              </td>

              <td className="p-3">
                {lead.source}
              </td>

              <td className="p-3">
                <button
                  onClick={() =>
                    onDelete(lead._id)
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
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