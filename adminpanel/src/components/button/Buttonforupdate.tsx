import React from "react";

interface ActionButtonProps {
  iconSrc: string;      // path to icon in assets
  iconAlt?: string;     // alt text for accessibility
  label: string;
  onClick?: () => void;
  className?: string;   // extra styles
}

const ActionButton: React.FC<ActionButtonProps> = ({
  iconSrc,
  iconAlt = "icon",
  label,
  onClick,
  className = "",
}) => {
  return (
    <button
     type="button"
      onClick={onClick}
      className={`flex items-center gap-3 px-5 py-2 bg-green-500 hover:bg-green-600 
                  text-white font-medium rounded-lg shadow-md transition-all 
                  duration-200 ease-in-out min-w-[180px] max-w-[200px] justify-center ${className}`}
    >
      <img
        src={iconSrc}
        alt={iconAlt}
        className="w-4 h-4 object-contain"
      />
      <span className="whitespace-nowrap">{label}</span>
    </button>
  );
};

export default ActionButton;
