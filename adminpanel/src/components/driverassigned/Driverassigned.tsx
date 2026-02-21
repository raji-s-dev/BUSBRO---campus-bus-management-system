import React from "react";
import ActionButton from "../button/Button";
import driverIcon from "../../assets/components/driverassigned/drivericon.png";
import detailsIcon from "../../assets/components/driverassigned/detialsicon.png";

type DriverAssignedProps = {
  photo: string;
  name: string;
  contact: string;
  assignedSince: string;
  rating: number; // e.g., 4.2
  complaints: number;
  feedback: string;
  onMoreDetails?: () => void;
};

const DriverAssigned: React.FC<DriverAssignedProps> = ({
  photo,
  name,
  contact,
  assignedSince,
  rating,
  complaints,
  feedback,
  onMoreDetails,
}) => {
  // convert rating (like 4.2) into stars ★
  const stars = "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));

  return (
    <div className="w-full bg-white rounded-[20px] p-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2 ml-4">
          <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
            Assigned Driver Details
          </h2>
          <img src={driverIcon} alt="driver icon" className="w-5 h-5" />
        </div>
        <ActionButton
        
          iconSrc={detailsIcon}
          iconAlt="More details"
          label="More details"
          onClick={onMoreDetails || (() => alert("More details"))}
        />
      </div>

      {/* Body */}
      <div className="flex gap-20 my-6">
        {/* Driver Image */}
        <div className="relative ml-8">
          <div className="w-64 h-64 rounded-full bg-green-200 shadow-[2px_2px_20px_0px_rgba(163,217,165,0.25)]" />
          <img
            src={photo}
            alt="Driver"
            className="w-64 h-64 rounded-full outline outline-1 absolute top-0 left-0"
          />
        </div>

        {/* Driver Details */}
        <div className="grid grid-cols-[220px_1fr] gap-y-5 text-lg font-inter">
          <p className="text-gray-900">Name</p>
          <p className="text-gray-900 font-medium">: {name}</p>

          <p className="text-gray-900">Contact Number</p>
          <p className="text-gray-900 font-medium">: {contact}</p>

          <p className="text-gray-900">Assigned Since</p>
          <p className="text-gray-900 font-medium">: {assignedSince}</p>

          <p className="text-gray-900">Performance Rating</p>
          <p className="text-gray-900 font-semibold">
            : <span className="text-amber-500">{stars}</span> ({rating} / 5)
          </p>

          <p className="text-gray-900">Total Complaints</p>
          <p className="text-gray-900 font-medium">: {complaints}</p>

          <p className="text-gray-900">Feedback Summary</p>
          <p className="text-gray-900 font-medium">: “{feedback}”</p>
        </div>
      </div>
    </div>
  );
};

export default DriverAssigned;
