// components/RouteDelayChart.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Cell,
  LabelList,
  Rectangle,
} from "recharts";

// Gradient color logic
const getGradientId = (value: number) => {
  if (value === 0) return "gradientEmpty";
  if (value <= 10) return "gradientLow";
  if (value <= 20) return "gradientMedium";
  return "gradientHigh";
};

const getHoverColor = (value: number) => {
  if (value === 0) return "rgba(160,160,160,0.3)";
  if (value <= 10) return "rgba(86, 210, 195, 0.3)";
  if (value <= 20) return "rgba(251, 228, 109, 0.3)";
  return "rgba(247, 107, 106, 0.3)";
};

// ✅ Custom Cursor
const CustomCursor = (props: any) => {
  const { payload, ...rest } = props;
  if (!payload || !payload[0]) return null;
  const value = payload[0].value;
  const fill = getHoverColor(value);
  return <Rectangle {...rest} fill={fill} />;
};

// Vertical route name
const VerticalNameLabel = (props: any) => {
  const { x, width, value, viewBox } = props;
  if (!viewBox) return null;
  const centerX = x + width / 1.5;
  const centerY = viewBox.y + viewBox.height - 15;
  return (
    <text
      x={centerX}
      y={centerY}
      fill="#000"
      fontSize={11}
      fontWeight={500}
      textAnchor="top"
      transform={`rotate(-90, ${centerX}, ${centerY})`}
    >
      {value}
    </text>
  );
};

// Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 px-3 py-2 rounded-lg shadow-md">
        <p className="text-sm font-medium text-gray-700">{`Route : ${label}`}</p>
        <p className="text-base font-semibold text-gray-900">{`Late Days : ${payload[0].value} days`}</p>
      </div>
    );
  }
  return null;
};

type RouteDelayChartProps = {
  data: { name: string; latedays: number }[];
};

const RouteDelayChart: React.FC<RouteDelayChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);
  const [progress, setProgress] = useState(0);

  // Animate when chart is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          let start: number | null = null;
          const duration = 200; // animation duration in ms

          const animate = (timestamp: number) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const newProgress = Math.min(elapsed / duration, 1);
            setProgress(newProgress);
            if (newProgress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );

    if (chartRef.current) observer.observe(chartRef.current);
    return () => {
      if (chartRef.current) observer.unobserve(chartRef.current);
    };
  }, []);

  // ✅ Scale all bars together
  const animatedData = data.map((d) => ({
    ...d,
    latedays: Math.floor(d.latedays * progress),
  }));

  return (
    <div className="bg-white rounded-2xl p-6" ref={chartRef}>
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter'] pl-6">
          Route-Wise Delay
        </span>
        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
        <span className="text-gray-500 text-base sm:text-md font-semibold font-['Inter']">
          Day ( 1 - 30 )
        </span>
      </div>

      <div className="w-full flex justify-center">
        <ResponsiveContainer width="100%" height={520}>
          <BarChart
            data={animatedData}
            barSize={45}
            barCategoryGap={0}
            margin={{ top: 40, right: 30, left: 30, bottom: 20 }}
          >
            {/* Gradients */}
            <defs>
              <linearGradient id="gradientLow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#56D2C3" />
                <stop offset="100%" stopColor="#bdf2e7" />
              </linearGradient>
              <linearGradient id="gradientMedium" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FBE46D" />
                <stop offset="100%" stopColor="#fcf2d4" />
              </linearGradient>
              <linearGradient id="gradientHigh" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F76B6A" />
                <stop offset="100%" stopColor="#ffd1d1" />
              </linearGradient>
              <linearGradient id="gradientEmpty" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E0E0E0" />
                <stop offset="100%" stopColor="#F5F5F5" />
              </linearGradient>
            </defs>

            <Tooltip content={<CustomTooltip />} cursor={<CustomCursor />} />
            <XAxis dataKey="name" tick={false} axisLine={false} />
            
            <ReferenceLine y={0} stroke="#E0E0E0" strokeWidth={1} />

            <Bar dataKey="latedays" radius={[3, 3, 0, 0]}>
              <LabelList
                dataKey="latedays"
                position="top"
                formatter={(v: any) => (v === 0 ? "" : v)}
                style={{ fill: "#555", fontSize: 14, fontWeight: "bold" }}
              />
              <LabelList dataKey="name" content={<VerticalNameLabel />} />
              {animatedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#${getGradientId(entry.latedays)})`}
                  className="transition duration-300 hover:brightness-110 hover:stroke-gray-800 hover:stroke-[1px]"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RouteDelayChart;
