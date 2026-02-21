import {
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Sector,
} from 'recharts';
import React, { useState, useEffect, useRef } from 'react';

type PieChartData = {
  name: string | number;
  value: number;
  fill: string;
};

interface PieChartProps {
  data: PieChartData[];
  title?: string;
}

interface SectorProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: PieChartData;
  percent: number;
  value: number;
}

const renderSectorWithLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  startAngle,
  endAngle,
  fill,
  payload,
  value,
}: SectorProps): JSX.Element => {
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * (midAngle ?? 0));
  const cos = Math.cos(-RADIAN * (midAngle ?? 0));

  const sx = cx + outerRadius * cos;
  const sy = cy + outerRadius * sin;
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 10;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g key={payload.name}>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill="none"
        stroke="#fff"
        strokeWidth={2}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 12 : -12)}
        y={ey}
        textAnchor={textAnchor}
        fill="#000"
        fontWeight="bold"
      >
        {payload.name}
      </text>
      <text
        x={ex + (cos >= 0 ? 12 : -12)}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#6B7280"
      >
        {` ${value} buses / day`}
      </text>
    </g>
  );
};

const Piechartbus: React.FC<PieChartProps> = ({ data, title = 'Total Buses' }) => {
  const centerX = 350;
  const centerY = 200;
  const innerRadius = 90;
  const outerRadius = 150;

  const [progress, setProgress] = useState(0); // 0 → 1 animation
  
  const chartRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer — start animation when in view
useEffect(() => {
  if (!chartRef.current) return;
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !hasAnimated) {
      hasAnimated = true; // ✅ prevent re-animation unless data changes
      let start: number | null = null;
      const duration = 1200;

      const animate = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const newProgress = Math.min(elapsed / duration, 1);
        setProgress(newProgress);
        if (newProgress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }
  }, { threshold: 0.4 });

  observer.observe(chartRef.current);

  return () => observer.disconnect();
}, [data]); // 👈 still reset when data changes


  const total = data.reduce((sum, d) => sum + d.value, 0);

  let cumulativeAngle = 0;
  const sectors = data.map((entry) => {
    const angle = (entry.value / total) * 360 * progress; // scale by progress
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle += (entry.value / total) * 360;

    const midAngle = (startAngle + endAngle) / 2;

    return renderSectorWithLabel({
      cx: centerX,
      cy: centerY,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      midAngle,
      fill: entry.fill,
      payload: entry,
      percent: entry.value / total,
      value: entry.value,
    });
  });

  return (
    <div ref={chartRef}>
      <ResponsiveContainer width="100%" height={400}>
        <RechartsPieChart>
          {sectors}
          <text
            x={centerX}
            y={centerY - 10}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={18}
            fill="#6B7280"
          >
            {title}
          </text>
          <text
            x={centerX}
            y={centerY + 15}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={28}
            fontWeight="bold"
            fill="#000"
          >
            {total}
          </text>
        </RechartsPieChart>
      </ResponsiveContainer>


      
   {/* Custom Legend (Fixed Categories) */}

<div className="flex gap-6 justify-center">
  <div className="flex items-center gap-2">
    <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
    <span className="text-sm text-gray-600">Before 8:30</span>
  </div>

  <div className="flex items-center gap-2">
    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
    <span className="text-sm text-gray-600">8:30 to 9:00</span>
  </div>

  <div className="flex items-center gap-2">
    <span className="w-3 h-3 rounded-full bg-red-400"></span>
    <span className="text-sm text-gray-600">After 9:00</span>
  </div>
</div>


    </div>
  );
};

export default Piechartbus;
