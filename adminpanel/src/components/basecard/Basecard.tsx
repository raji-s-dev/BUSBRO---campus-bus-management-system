import React from "react";

interface BaseCardProps {
  icon: React.ReactNode;
  title: string;
  status: React.ReactNode; 
  statusColor?: string; // make optional now
  action?: string | React.ReactNode;
  actionColor?: string;
  onActionClick?: () => void;
  onClick?: () => void; 
}

const BaseCard: React.FC<BaseCardProps> = ({
  icon,
  title,
  status,
  statusColor,
  action,
  actionColor,
  onActionClick,
  onClick, 
}) => {
  return (
    <div className="flex flex-wrap sm:flex-nowrap items-center justify-between w-full bg-[#FAFAFF] rounded-lg shadow p-3 sm:p-3 gap-3">
  {/* Left Section */}
  <div className="flex items-center gap-6 pl-4">
    {/* Icon + Title */}
    <div className="flex items-center gap-4 min-w-[180px]">
      {icon}
      <span className="text-gray-900 text-sm sm:text-lg font-medium">
        {title}
      </span>
    </div>

    {/* Divider */}
    <div className="h-6 w-px bg-gray-300" />

    {/* Status */}
    {typeof status === "string" ? (
      <span
        className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${statusColor}`}
      >
        {status}
      </span>
    ) : (
      status
    )}
  </div>

  {/* Right Action */}
  {action &&
    (typeof action === "string" ? (
      <button
        onClick={onActionClick}
        className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold ${actionColor}`}
      >
        {action}
      </button>
    ) : (
      action
    ))}
</div>

  );
};

export default BaseCard;
