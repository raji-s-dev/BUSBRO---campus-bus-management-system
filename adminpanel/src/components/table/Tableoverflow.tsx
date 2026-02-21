// components/Table.tsx
import React from "react";


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

  // Filter data based on search input
  const filteredData = React.useMemo(() => {
    if (!search) return data;
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);


  return (
    <div className="bg-white rounded-[10px] pt-6 px-6 w-full">
      {searchable && (
        <div className="mb-8 flex justify-between items-center">
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

          <div className="relative w-64 h-11 mr-4">
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
      )}

      {/* Horizontal scroll wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="text-gray-500 text-[15px] font-normal border-y border-gray-300">
              {columns.map((col, idx) => (
                <th
                  key={col.key}
                  className="pb-4 pt-4 font-normal px-6 min-w-[280px]" // min-width so columns have room
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
                  <td key={col.key} className="py-[20px] px-6 min-w-[150px]">
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
