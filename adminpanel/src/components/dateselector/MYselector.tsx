// components/DateSelector.tsx
import React from "react";

type DateSelectorProps = {
  month: number | "";
  year: number | "";
  onChange: (field: "month" | "year", value: number | "") => void;
};

const DateSelector: React.FC<DateSelectorProps> = ({
  month,
  year,
  onChange,
}) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className="inline-flex items-center bg-stone-50 rounded-lg border border-gray-200 px-4 py-2 gap-4">
      
      {/* Month */}
      <select
        aria-label="Select Month"
        value={month}
        onChange={(e) =>
          onChange("month", e.target.value ? parseInt(e.target.value) : "")
        }
        className="bg-transparent text-gray-900 text-base font-normal font-['Inter'] outline-none cursor-pointer"
      >
        <option value="">Month</option>
        {months.map((m, idx) => (
          <option key={idx} value={idx + 1}>{m}</option>
        ))}
      </select>

      {/* Divider */}
      <div className="hidden sm:block w-px h-6 bg-black/10" />

      {/* Year */}
      <select
        aria-label="Select Year"
        value={year}
        onChange={(e) =>
          onChange("year", e.target.value ? parseInt(e.target.value) : "")
        }
        className="bg-transparent text-gray-900 text-base font-normal font-['Inter'] outline-none cursor-pointer"
      >
        <option value="">Year</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
};

export default DateSelector;
