import React, { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  title: string;
  label: string;
  dataPoints: (number | null)[]; // ✅ allow null values
  target?: number;
}

const labels: string[] = Array.from({ length: 30 }, (_, i) => String(i + 1));

// ✅ Hardcoded departure range
const range = { min: 6.0, max: 8.0, title: "Departure Time (HH:mm)" };

const LineChart: React.FC<LineChartProps> = ({
  title,
  label,
  dataPoints,
  target,
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  // Observer → start animation when chart is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          setShouldAnimate(true);
        }
      },
      { threshold: 0.4 }
    );

    if (chartRef.current) observer.observe(chartRef.current);
    return () => {
      if (chartRef.current) observer.unobserve(chartRef.current);
    };
  }, []);

  const targetData = target ? new Array(30).fill(target) : undefined;

  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label,
        data: dataPoints,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: dataPoints.map((val) => {
          if (val === null) return "transparent"; // weekend gap → invisible point
          if (target !== undefined) return val > target ? "red" : "green";
          return "green";
        }),
        pointBorderColor: dataPoints.map((val) => {
          if (val === null) return "transparent";
          if (target !== undefined) return val > target ? "red" : "green";
          return "green";
        }),
        segment: {
          borderColor: (ctx) => {
            const current = ctx.p0.parsed.y;
            const next = ctx.p1.parsed.y;
            if (isNaN(current) || isNaN(next)) return "transparent"; // skip weekend gaps
            if (target === undefined) return "green";
            return current > target && next > target ? "red" : "green";
          },
        },
      },
      ...(targetData
        ? [
            {
              label: `Target Time (${formatTime(target!)})`,
              data: targetData,
              borderColor: "green",
              borderDash: [6, 6],
              fill: false,
              pointRadius: 0,
            },
          ]
        : []),
    ],
  };

  // ✅ Animation config → only applied when shouldAnimate = true
  const options: ChartOptions<"line"> = {
    responsive: true,
    animation: shouldAnimate
      ? {
          duration: 1500,
          easing: "easeInOutCubic",
        }
      : false,
    animations: shouldAnimate
      ? {
          x: {
            type: "number",
            easing: "easeInOutCubic",
            duration: 1200,
            from: NaN,
            delay(ctx) {
              return ctx.type === "data" ? ctx.dataIndex * 150 : 0;
            },
          },
          y: {
            type: "number",
            easing: "easeOutQuad",
            duration: 1200,
            from: (ctx) =>
              ctx.type === "data" ? ctx.chart.scales.y.min : undefined,
            delay(ctx) {
              return ctx.type === "data" ? ctx.dataIndex * 150 : 0;
            },
          },
        }
      : {},
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: title },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            if (value === null || isNaN(value))
              return `${context.dataset.label}: (no data)`;
            return `${context.dataset.label}: ${formatTime(value)}`;
          },
        },
      },
    },
    scales: {
      y: {
        min: range.min,
        max: range.max,
        ticks: {
          stepSize: 0.1667,
          callback: (value: string | number) => formatTime(Number(value)),
        },
        title: { display: true, text: range.title },
      },
      x: {
        title: { display: true, text: "Day" },
        ticks: {
          color: (ctx) => {
            const index = ctx.index;
            // Highlight weekends (nulls) in red
            return dataPoints[index] === null ? "red" : "#666";
          },
          callback: (val, index) => labels[index],
        },
      },
    },
  };

  return (
    <div ref={chartRef}>
      <Line options={options} data={data} />
    </div>
  );
};

// ✅ Helper: format numeric time like 6.25 → "6:15"
function formatTime(value: number): string {
  const hour = Math.floor(value);
  const minutes = Math.round((value - hour) * 60);
  return `${hour}:${minutes.toString().padStart(2, "0")}`;
}

export default React.memo(LineChart);
