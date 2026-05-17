import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { Lead } from "../types/lead";

interface Props {
  leads: Lead[];
}

const COLORS = [
  "#111827",
  "#2563EB",
  "#16A34A",
];

const LeadChart = ({
  leads,
}: Props) => {
  const newCount = leads.filter(
    (lead) =>
      lead.status === "new"
  ).length;

  const contactedCount =
    leads.filter(
      (lead) =>
        lead.status ===
        "contacted"
    ).length;

  const convertedCount =
    leads.filter(
      (lead) =>
        lead.status ===
        "converted"
    ).length;

  const data = [
    {
      name: "New",
      value: newCount,
    },

    {
      name: "Contacted",
      value: contactedCount,
    },

    {
      name: "Converted",
      value: convertedCount,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-5">
        Lead Analytics
      </h2>

      <div className="w-full h-[300px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {data.map(
                (
                  _entry,
                  index
                ) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeadChart;