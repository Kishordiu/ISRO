import { Line, LineChart, ResponsiveContainer, YAxis } from "recharts";

interface Props {
  data: { i: number; v: number }[];
  color?: string;
  height?: number;
}

export default function Sparkline({ data, color = "#1E5AA8", height = 36 }: Props) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
          <YAxis domain={["dataMin", "dataMax"]} hide />
          <Line
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.8}
            dot={false}
            isAnimationActive
            animationDuration={900}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
