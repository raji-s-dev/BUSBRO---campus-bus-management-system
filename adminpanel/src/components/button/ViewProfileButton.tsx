import React from "react";
import arrowIcon from "../../assets/components/button/arrowright.png"; // your icon

type ViewProfileButtonProps = {
  onClick?: () => void;
};
const ViewProfileButton: React.FC<ViewProfileButtonProps> = ({ onClick }) => (
  <button  type="button" className="flex items-center gap-3 text-emerald-500 font-semibold text-sm sm:text-base mr-4" onClick={onClick}>
    View Profile
    <img src={arrowIcon} alt="arrow" className="w-4 h-4" />
  </button>
);

export default ViewProfileButton;
