// components/Table.tsx
import React from "react";
import SearchIcon from "../../assets/components/table/searchicon.png";

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
  searchable?: boolean;
  title?: string;
  titleIcon?: string;
};

const Tableoverflow: React.FC<TableProps> = ({
  columns,
  data,
  searchable = false,
  title = "Today entry logs",
  titleIcon
}) => {
  const [search, setSearch] = React.useState("");
  const [typeFilter, setTypeFilter] = React.useState("");
  const [sourceFilter, setSourceFilter] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("");

  const normalize = (v: any) => String(v ?? "").toLowerCase().trim();
  const searchLower = search.toLowerCase().trim();

  // Filter data based on search + dropdowns
 // Filter data based on search + dropdowns (case-insensitive)
  const filteredData = React.useMemo(() => {
    return data.filter((row) => {
      // search across all visible row values (ignore JSX components safely)
      const matchesSearch = search
        ? Object.values(row).some((value) =>
            normalize(value).includes(searchLower)
          )
        : true;

      const matchesType = typeFilter
        ? normalize(row.type) === normalize(typeFilter)
        : true;

      const matchesSource = sourceFilter
        ? normalize(row.source) === normalize(sourceFilter)
        : true;

      // your dataset uses currentStatus
      const matchesStatus = statusFilter
        ? normalize(row.currentStatus) === normalize(statusFilter)
        : true;

      return matchesSearch && matchesType && matchesSource && matchesStatus;
    });
  }, [data, searchLower, typeFilter, sourceFilter, statusFilter]);


  return (
    <div className="bg-white rounded-[10px] pt-6 px-6 w-full">
      {searchable && (
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          {/* Title */}
          <div className="flex items-center gap-2 pl-6 pr-2">
            <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
              {title}
            </h2>
            {titleIcon && (
              <img
                src={titleIcon}
                alt="title icon"
                className="w-4 h-4 object-contain"
              />
            )}
          </div>

          {/* Search + Filters */}
           <div className="flex flex-col md:flex-row gap-3 items-center">
            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                aria-label="Filter by type"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="bg-stone-50 rounded-[10px] px-3 py-3 text-gray-800 text-base font-['Inter'] focus:outline-none cursor-pointer"
              >
                <option value="">Type</option>
                <option value="Complaint">Complaint</option>
                <option value="Feedback">Feedback</option>
                <option value="Suggestion">Suggestion</option>
              </select>

              <select
                aria-label="Filter by source"
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="bg-stone-50 rounded-[10px] px-3 py-2 text-gray-800 text-base font-['Inter'] focus:outline-none cursor-pointer"
              >
                <option value="">Source</option>
                <option value="Student App">Student App</option>
                <option value="Driver App">Driver App</option>
              </select>

              <select
                aria-label="Filter by status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-stone-50 rounded-[10px] px-3 py-2 text-gray-800 text-base font-['Inter'] focus:outline-none cursor-pointer"
              >
                <option value="">Status</option>
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            {/* Search Bar */}
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="text-gray-500 text-[15px] font-normal border-y border-gray-300">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="pb-4 pt-4 font-normal px-6 min-w-[280px]"
                >
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
                  i === filteredData.length - 1
                    ? "border-transparent"
                    : "border-[#F2F2F2]"
                )}
              >
                {columns.map((col) => (
                  <td key={col.key} className="py-[14px] px-6 min-w-[150px]">
                    {row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tableoverflow;
