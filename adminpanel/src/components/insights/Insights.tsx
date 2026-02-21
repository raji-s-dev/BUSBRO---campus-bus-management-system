import React, { useEffect, useState } from "react";
import insightsIcon from '../../assets/dashboard/insight.png';

// --- Helpers ---
function toHM(decimalHour: number): { hour: number; minute: number } {
  const hour = Math.floor(decimalHour);
  const minute = Math.round((decimalHour - hour) * 60);
  return { hour, minute };
}

function formatHM(decimalHour: number): string {
  const { hour, minute } = toHM(decimalHour);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
  return `${displayHour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")} ${ampm}`;
}

function calculateInsights(arrivalTimes: (number | null)[], month: number, year: number) {
  const valid = arrivalTimes
    .map((v, i) =>
      v !== null
        ? {
            day: new Date(year, month - 1, i + 1).getDate(), // actual calendar date
            time: v,
          }
        : null
    )
    .filter((x): x is { day: number; time: number } => x !== null);

  if (valid.length === 0) return null;

  const avg = valid.reduce((sum, v) => sum + v.time, 0) / valid.length;
  const onTimeCount = valid.filter((v) => v.time <= 8.5).length;
  const onTimePercentage = Math.round((onTimeCount / valid.length) * 100);

  const earliest = valid.reduce((min, v) => (v.time < min.time ? v : min), valid[0]);
  const latest = valid.reduce((max, v) => (v.time > max.time ? v : max), valid[0]);

  const half = Math.floor(valid.length / 2);
  const firstHalfAvg = valid.slice(0, half).reduce((s, v) => s + v.time, 0) / half;
  const secondHalfAvg =
    valid.slice(half).reduce((s, v) => s + v.time, 0) / (valid.length - half);

let trend: "↓ Delayed" | "↑ Improving" | "→ Stable";
  if (secondHalfAvg - firstHalfAvg > 0.1) trend = "↓ Delayed";
  else if (firstHalfAvg - secondHalfAvg > 0.1) trend = "↑ Improving";
  else trend = "→ Stable";

  return {
    avg: formatHM(avg),
    onTimePercentage,
    earliest: `Day ${earliest.day} – ${formatHM(earliest.time)}`,
    latest: `Day ${latest.day} – ${formatHM(latest.time)}`,
    trend,
  };
}


// --- Component ---
interface InsightsProps {
  arrivalTimes: (number | null)[];
  month: number;
  year: number;
}

const Insights: React.FC<InsightsProps> = ({ arrivalTimes, month, year }) => {
  const [insights, setInsights] = useState<ReturnType<typeof calculateInsights> | null>(null);

  useEffect(() => {
    if (arrivalTimes.length > 0) {
       setInsights(calculateInsights(arrivalTimes, month, year));
    }
  }, [arrivalTimes]);

  if (!insights) return null;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-left pl-2 gap-2">
        <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
          Insights ({month}/{year})
        </h2>
        <img src={insightsIcon} alt="Insights" className="w-5 h-5" />
      </div>

      {/* Details */}
      <div className="mt-8 grid grid-cols-[180px_1fr] gap-y-4 text-[16px] font-inter">
        <p className="text-gray-800">Avg Arrival Time</p>
        <p className="font-semibold">: {insights.avg}</p>

        <p className="text-gray-800">On-time Percentage</p>
        <p className="font-semibold">: {insights.onTimePercentage}%</p>

        <p className="text-gray-800">Earliest Arrival</p>
        <p className="font-semibold">: {insights.earliest}</p>

        <p className="text-gray-800">Most Delayed Day</p>
        <p className="font-semibold">: {insights.latest}</p>

        <p className="text-gray-800">Trend Indicator</p>
        <p
          className={`font-semibold ${
            insights.trend === "↓ Delayed"
              ? "text-red-600"
              : insights.trend === "↑ Improving"
              ? "text-green-600"
              : "text-gray-600"
          }`}
        >
          : {insights.trend}
        </p>
      </div>
    </div>
  );
};

export default Insights;
