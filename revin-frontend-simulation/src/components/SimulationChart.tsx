import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type { PlantState } from "../types/simulation.types";

interface Props {
  data: PlantState[];

  title: string;

  dataKey: "growth" | "health";

  color?: string;
}

export default function SimulationChart({
  data,
  title,
  dataKey,
  color = "var(--color-primary)",
}: Props) {
  return (
    <div
      className="
        animate-panel-in
        rounded-[var(--radius-card)]
        border
        border-[var(--color-border)]
        bg-[var(--color-card)]
        p-5
        shadow-[var(--shadow-card)]
        sm:p-6
      "
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-xl font-black text-[var(--color-secondary)]">
          {title}
        </h2>

        <span className="rounded-[var(--radius-control)] bg-[var(--color-surface-soft)] px-3 py-1.5 text-sm font-bold text-[var(--color-muted)]">
          {data.length} days
        </span>
      </div>

      <div className="h-[280px] sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 16, left: -18, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#dfe7dc" />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#667085", fontSize: 12 }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#667085", fontSize: 12 }}
              domain={[0, 100]}
            />

            <Tooltip
              contentStyle={{
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-control)",
                boxShadow: "var(--shadow-card)",
              }}
            />

            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={3}
              dot={{ r: 3, fill: color, strokeWidth: 0 }}
              activeDot={{ r: 6, fill: color, stroke: "#fff", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
