// EmergencyAssistButton.tsx
import React from "react";

interface Props {
  onClick?: () => void;
}

const EmergencyAssistButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 bg-red-200 text-red-700 rounded-lg text-sm sm:text-base font-semibold hover:shadow-md transition-shadow duration-200"
    >
      Emergency Assist
    </button>
  );
};

export default EmergencyAssistButton;



