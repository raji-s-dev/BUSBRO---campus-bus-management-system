import React from "react";

interface SummaryBarProps {
  data: { label: string; value: string | number }[];
}

const Summarybar: React.FC<SummaryBarProps> = ({ data }) => {
  return (
    <div className="inline-flex items-center bg-stone-50 rounded-lg border border-gray-200 px-4 py-2 gap-6 ">
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <span className="text-gray-900 text-sm sm:text-base font-normal font-['Inter']">
            {item.label}: {item.value}
          </span>
          {index < data.length - 1 && (
            <div className="hidden sm:block w-px h-6 bg-black/10" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Summarybar;
