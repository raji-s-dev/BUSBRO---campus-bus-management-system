// components/Table.tsx
import React from "react";
import { useState } from "react";

import FilterIcon from "../../assets/components/table/filter.png"; // your uploaded icon path
import SearchIcon from "../../assets/components/table/searchicon.png";

// Simple cn helper to combine class names
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

type Column = {
  label: string;
  key: string;
  icon?: React.ReactNode;
};

type TableProps = {
  columns: Column[];
  data: Record<string, any>[];
  searchable?: boolean; // NEW prop
  title?: string; // NEW
  titleIcon?: string; // NEW - path to image from assets
};

const Table: React.FC<TableProps> = ({
  columns,
  data,
  searchable = false,
  title = "Today entry logs",
  titleIcon
}) => {

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = useState<"" | "Absent" | "Present">("");

  // Filter data based on search input + status filter
  const filteredData = React.useMemo(() => {
    return data.filter((row) => {
      const matchesSearch = !search || Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      );
      const matchesStatus = !statusFilter || row.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, search, statusFilter]);


  return (
    <div className="bg-white rounded-[10px] pt-6 px-6 w-full">

      
     {searchable && (
  <div className="mb-8 flex justify-between items-center">
    {/* Left section: Title + Icon */}
    <div className="flex items-center gap-2 pl-6 pr-2">
      <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
        {title || "Today entry logs"}
      </h2>
      {titleIcon && (
        <img
          src={titleIcon}
          alt="title icon"
          className="w-4 h-4 object-contain"
        />
      )}
    </div>

    {/* Right section: Search + Filter */}
    <div className="flex items-center gap-3 pr-4">
      

      {/* Filter Dropdown */}
      <div className="relative ">
        <select
          aria-label="Filter by status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="bg-stone-50  rounded-[10px] pl-8 pr-4 py-2 text-sm text-gray-700 border border-gray-200 appearance-none cursor-pointer"
        >
          <option value="">All</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <img
          src={FilterIcon}
          alt="Filter"
          className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 object-contain"
        />
      </div>
      {/* Search */}
      <div className="relative w-64 h-11">
        <div className="absolute inset-0 bg-stone-50 rounded-[10px]" />
        <img
          src={SearchIcon}
          alt="Search"
          className="absolute left-[18.84px] top-[6.11px] w-5 h-8 object-contain"
        />
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="absolute left-[49.54px] top-[8px] w-[calc(100%-60px)] h-7 bg-transparent 
                    text-zinc-700/60 text-base font-normal font-['Inter'] leading-snug 
                    focus:outline-none"
        />
      </div>
    </div>
  </div>
)}


      <div className="max-h-[600px] overflow-y-auto">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="text-gray-500 text-[15px] font-normal border-y border-gray-300">
              {columns.map((col) => (
                <th key={col.key} className="pb-4 pt-4 font-normal px-6">
                  <div className="flex flex-row items-start gap-[8px] leading-tight">
                    <span className="text-[16px] text-[#6B7280] font-normal leading-none font-[Inter]">
                      {col.label}
                    </span>
                    {col.icon && (
                      <span className="text-[13px] text-gray-500 mt-[1px]">
                        {col.icon}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="text-[#000] text-[16px] font-normal leading-none font-[Inter]">
            {filteredData.map((row, i) => (
              <tr
                key={i}
                className={cn(
                  "border-b",
                  i === filteredData.length - 1 ? "border-transparent" : "border-[#F2F2F2]"
                )}
              >
                {columns.map((col) => {
                  const value = row[col.key];
                  const isStatus = col.key === "status";

                  return (
                    <td key={col.key} className="py-[12px] px-6">
                      {isStatus ? (
                        <span
                          className={cn(
                            "w-[106px] text-center px-4 py-2 text-[16px] font-medium rounded-full inline-block",
                            value === "Absent"
                              ? "bg-red-100 text-red-800"
                              : "bg-emerald-100 text-emerald-800"
                          )}
                        >
                          {value}
                        </span>
                      ) : (
                        value
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table; 
