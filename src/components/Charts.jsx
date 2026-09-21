import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { growthData, stackData, radarData, makeHeatmap } from "../data";

const tooltipStyle = {
  background: "#141414",
  border: "1px solid #2A2A2A",
  borderRadius: 12,
  color: "#FFFFFF",
};

function ChartCard({ title, subtitle, children, className = "" }) {
  return (
    <Reveal className={`chart-card ${className}`}>
      <div className="chart-heading">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <span className="live-dot" aria-label="Animated data visualization" />
      </div>
      <div className="chart-body">{children}</div>
    </Reveal>
  );
}

export default function Charts() {
  const heatmap = makeHeatmap();

  return (
    <div className="charts-grid">
      <ChartCard
        title="Learning velocity"
        subtitle="Illustrative progress index over the last 9 months"
        className="chart-wide"
      >
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={growthData}>
            <defs>
              <linearGradient id="blueFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.34} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#2A2A2A" vertical={false} />
            <XAxis dataKey="month" stroke="#A3A3A3" tickLine={false} axisLine={false} />
            <YAxis stroke="#A3A3A3" tickLine={false} axisLine={false} width={34} />
            <Tooltip contentStyle={tooltipStyle} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={3}
              fill="url(#blueFill)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Focus distribution"
        subtitle="Current practice mix"
      >
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={stackData} layout="vertical" margin={{ left: 6, right: 12 }}>
            <CartesianGrid stroke="#2A2A2A" horizontal={false} />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              stroke="#A3A3A3"
              tickLine={false}
              axisLine={false}
              width={76}
            />
            <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#1F1F1F" }} />
            <Bar
              dataKey="value"
              fill="#3B82F6"
              radius={[0, 7, 7, 0]}
              barSize={20}
              animationDuration={1200}
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Engineering profile"
        subtitle="Self-assessed capability map"
      >
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart data={radarData} outerRadius="70%">
            <PolarGrid stroke="#2A2A2A" />
            <PolarAngleAxis dataKey="subject" stroke="#A3A3A3" tick={{ fontSize: 11 }} />
            <PolarRadiusAxis stroke="#2A2A2A" tick={false} axisLine={false} />
            <Radar
              name="Score"
              dataKey="score"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.22}
              animationDuration={1400}
            />
          </RadarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Contribution rhythm"
        subtitle="Sample GitHub-style activity data"
        className="chart-wide"
      >
        <div className="heatmap-wrap" aria-label="Sample contribution heatmap">
          <div className="heatmap-labels">
            <span>Mon</span><span>Wed</span><span>Fri</span>
          </div>
          <div className="heatmap">
            {heatmap.map((level, index) => (
              <motion.span
                key={index}
                className={`heat-cell level-${level}`}
                initial={{ opacity: 0, scale: 0.65 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.22, delay: Math.min(index * 0.004, 0.6) }}
                title={`${level} contribution intensity`}
              />
            ))}
          </div>
        </div>
      </ChartCard>
    </div>
  );
}