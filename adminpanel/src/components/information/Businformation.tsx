import React from "react";
import ActionButton from "../button/Button"; 
import excelicon from "../../assets/components/button/excelicon.png";
import pdficon from "../../assets/components/button/pdficon.png";
import editicon from "../../assets/components/button/editicon.png";
import BusIcon from "../../assets/dashboard/bus-icon.png";

type BusInfoProps = {
  busId: string;
  registrationNumber: string;
  busName: string;

  busType: string;
  seatingCapacity: number;
  standingCapacity: number;
  manufacturer: string;
  manufactureYear: string;
  fitnessExpiry: string;

  insuranceDetails: string;
  pollutionExpiry: string;
  permitDetails: string;
  lastMaintenance: string;
  nextMaintenance: string;

  onEdit?: () => void;
  onExportExcel?: () => void;
  onExportPDF?: () => void;
};

const BusInformation: React.FC<BusInfoProps> = ({
  busId,
  registrationNumber,
  busName,

  busType,
  seatingCapacity,
  standingCapacity,
  manufacturer,
  manufactureYear,
  fitnessExpiry,

  insuranceDetails,
  pollutionExpiry,
  permitDetails,
  lastMaintenance,
  nextMaintenance,

  onEdit,
  onExportExcel,
  onExportPDF,
}) => {
  return (
    <div className="w-full bg-white rounded-2xl p-8 relative">
      {/* Scrollable Info Section */}
      <div className="max-h-[calc(100vh-320px)] overflow-y-auto pr-2">
        
        {/* Header */}
        <div className="flex justify-between mr-4">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
              Bus Identification
            </h2>
            <img src={BusIcon} alt="title icon" className="w-4 h-4 object-contain" />
          </div>

          <ActionButton
            iconSrc={editicon}
            iconAlt="Edit Icon"
            label="Edit Details"
            onClick={onEdit || (() => alert("Edit Details"))}
          />
        </div>

        {/* ================= Bus Identification ================= */}
        <div className="mt-8 grid grid-cols-[300px_1fr] gap-y-4 text-[18px] font-inter">
          <p className="text-gray-900">Bus ID</p>
          <p className="text-gray-900 font-medium">: {busId}</p>

          <p className="text-gray-900">Registration Number</p>
          <p className="text-gray-900 font-medium">: {registrationNumber}</p>

          <p className="text-gray-900">Bus Name</p>
          <p className="text-gray-900 font-medium">: {busName}</p>
        </div>

        <div className="border-t border-gray-200 my-8" />

        {/* ================= Physical Information ================= */}
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
            Physical Information
          </h2>
          <img src={BusIcon} alt="title icon" className="w-4 h-4 object-contain" />
        </div>

        <div className="mt-8 grid grid-cols-[300px_1fr] gap-y-4 text-[18px] font-inter">
          <p className="text-gray-900">Bus Type</p>
          <p className="text-gray-900 font-medium">: {busType}</p>

          <p className="text-gray-900">Seating Capacity</p>
          <p className="text-gray-900 font-medium">: {seatingCapacity}</p>

          <p className="text-gray-900">Standing Capacity</p>
          <p className="text-gray-900 font-medium">: {standingCapacity}</p>

          <p className="text-gray-900">Model / Manufacturer</p>
          <p className="text-gray-900 font-medium">: {manufacturer}</p>

          <p className="text-gray-900">Year of Manufacture / Purchase</p>
          <p className="text-gray-900 font-medium">: {manufactureYear}</p>

          <p className="text-gray-900">Fitness Certificate Expiry Date</p>
          <p className="text-gray-900 font-medium">: {fitnessExpiry}</p>
        </div>

        <div className="border-t border-gray-200 my-8" />

        {/* ================= Compliance & Maintenance ================= */}
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
            Compliance & Maintenance
          </h2>
          <img src={BusIcon} alt="title icon" className="w-4 h-4 object-contain" />
        </div>

        <div className="mt-8 grid grid-cols-[300px_1fr] gap-y-4 text-[18px] font-inter">
          <p className="text-gray-900">Insurance Details</p>
          <p className="text-gray-900 font-medium">: {insuranceDetails}</p>

          <p className="text-gray-900">Pollution Certificate (PUC) Expiry</p>
          <p className="text-gray-900 font-medium">: {pollutionExpiry}</p>

          <p className="text-gray-900">Permit Details & Validity</p>
          <p className="text-gray-900 font-medium">: {permitDetails}</p>

          <p className="text-gray-900">Last Maintenance Date</p>
          <p className="text-gray-900 font-medium">: {lastMaintenance}</p>

          <p className="text-gray-900">Next Maintenance Due Date</p>
          <p className="text-gray-900 font-medium">: {nextMaintenance}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-8" />

      {/* Bottom Buttons */}
      <div className="flex justify-end gap-4">
        <ActionButton
          iconSrc={excelicon}
          iconAlt="excel Icon"
          label="Export to Excel"
          onClick={onExportExcel || (() => alert("Exporting Excel..."))}
        />
        <ActionButton
          iconSrc={pdficon}
          iconAlt="pdf Icon"
          label="Export to PDF"
          onClick={onExportPDF || (() => alert("Exporting PDF..."))}
        />
      </div>
    </div>
  );
};

export default BusInformation;
