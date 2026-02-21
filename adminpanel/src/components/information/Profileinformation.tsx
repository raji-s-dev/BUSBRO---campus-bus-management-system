import React from "react";
import ActionButton from "../button/Button"; 
import excelicon from "../../assets/components/button/excelicon.png";
import pdficon from "../../assets/components/button/pdficon.png";
import editicon from "../../assets/components/button/editicon.png";
import driverIcon from '../../assets/drivers/drivericon.png';

// ----------------------
// Types for Driver Info
// ----------------------
interface DriverBasicInfo {
  displayName: string;           // e.g. "Mr. Suresh Kumar"
  contactNumber: string;
  assignedSince: string;
  performanceRating:  number;     // e.g. "★★★★☆ (4.2 / 5)"
  totalComplaints: number;
  feedbackSummary: string;
}

interface DriverIdentification {
  driverId: string;
  driverName: string;
  aadhaarNumber: string;
  employeeCode: string;
  employmentType: string;
}

interface DriverContact {
  phoneNumber: string;
  alternateContact: string;
  email: string;
  address: string;
  emergencyContactPerson: string;
  emergencyContactNumber: string;
}

interface DriverLicense {
  licenseNumber: string;
  licenseType: string;
  issuedDate: string;
  expiryDate: string;
  issuingAuthority: string;
  badgeNumber?: string;
  experienceYears: number;
}

interface DriverInfoProps {
  photoSrc: string;
  basicInfo: DriverBasicInfo;
  identification: DriverIdentification;
  contact: DriverContact;
  license: DriverLicense;
}

// ----------------------
// Dynamic Driver Info Component
// ----------------------
const Information: React.FC<DriverInfoProps> = ({
  photoSrc,
  basicInfo,
  identification,
  contact,
  license
}) => {

   const stars = "★".repeat(Math.floor(basicInfo.performanceRating)) + "☆".repeat(5 - Math.floor(basicInfo.performanceRating));

  return (
    <div className="w-full bg-white rounded-2xl p-8 relative">

      {/* Scrollable Section */}
      <div className="max-h-[calc(100vh-320px)] overflow-y-auto pr-2">

        {/* Edit Button */}
        <div className="flex justify-end mr-4">
          <ActionButton
            iconSrc={editicon}
            iconAlt="Edit Icon"
            label="Edit Details"
            onClick={() => alert("Edit Details")}
          />
        </div>

        {/* Basic Info */}
        <div className="flex gap-20 my-2">
          <div className="relative ml-8">
            <div className="w-64 h-64 rounded-full bg-green-200 shadow-[2px_2px_20px_0px_rgba(163,217,165,0.25)]" />
            <img
              src={photoSrc}
              alt="Driver"
              className="w-64 h-64 rounded-full outline outline-1 absolute top-0 left-0"
            />
          </div>

          <div className="grid grid-cols-[220px_1fr] gap-y-4 text-lg font-inter">
            <p className="text-gray-900">Name</p>
            <p className="text-gray-900 font-medium">: {basicInfo.displayName}</p>

            <p className="text-gray-900">Contact Number</p>
            <p className="text-gray-900 font-medium">: {basicInfo.contactNumber}</p>

            <p className="text-gray-900">Assigned Since</p>
            <p className="text-gray-900 font-medium">: {basicInfo.assignedSince}</p>

             <p className="text-gray-900">Performance Rating</p>
          <p className="text-gray-900 font-semibold">
            : <span className="text-amber-500">{stars}</span> ({basicInfo.performanceRating} / 5)
          </p>

            <p className="text-gray-900">Total Complaints</p>
            <p className="text-gray-900 font-medium">: {basicInfo.totalComplaints}</p>

            <p className="text-gray-900">Feedback Summary</p>
            <p className="text-gray-900 font-medium">: {basicInfo.feedbackSummary}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8" />

        {/* Driver Identification */}
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
            Driver Identification
          </h2>
          <img src={driverIcon} alt="title icon" className="w-4 h-4 object-contain" />
        </div>

        <div className="mt-8 grid grid-cols-[280px_1fr] gap-y-4 text-[18px] font-inter">
          <p className="text-gray-900">Driver ID</p>
          <p className="text-gray-900 font-medium">: {identification.driverId}</p>

          <p className="text-gray-900">Driver Name</p>
          <p className="text-gray-900 font-medium">: {identification.driverName}</p>

          <p className="text-gray-900">Aadhaar Number</p>
          <p className="text-gray-900 font-medium">: {identification.aadhaarNumber}</p>

          <p className="text-gray-900">Employee Code / College ID</p>
          <p className="text-gray-900 font-medium">: {identification.employeeCode}</p>

          <p className="text-gray-900">Employment Type</p>
          <p className="text-gray-900 font-medium">: {identification.employmentType}</p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8" />

        {/* Contact Info */}
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
            Contact Information
          </h2>
          <img src={driverIcon} alt="title icon" className="w-4 h-4 object-contain" />
        </div>

        <div className="mt-8 grid grid-cols-[280px_1fr] gap-y-4 text-[18px] font-inter">
          <p className="text-gray-900">Phone Number</p>
          <p className="text-gray-900 font-medium">: {contact.phoneNumber}</p>

          <p className="text-gray-900">Alternate Contact</p>
          <p className="text-gray-900 font-medium">: {contact.alternateContact}</p>

          <p className="text-gray-900">Email Address</p>
          <p className="text-gray-900 font-medium">: {contact.email}</p>

          <p className="text-gray-900">Address</p>
          <p className="text-gray-900 font-medium">: {contact.address}</p>

          <p className="text-gray-900">Emergency Contact Person</p>
          <p className="text-gray-900 font-medium">: {contact.emergencyContactPerson}</p>

          <p className="text-gray-900">Emergency Contact Number</p>
          <p className="text-gray-900 font-medium">: {contact.emergencyContactNumber}</p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8" />

        {/* License Info */}
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
            Driving & License Details
          </h2>
          <img src={driverIcon} alt="title icon" className="w-4 h-4 object-contain" />
        </div>

        <div className="mt-8 grid grid-cols-[280px_1fr] gap-y-4 text-[18px] font-inter">
          <p className="text-gray-900">License Number</p>
          <p className="text-gray-900 font-medium">: {license.licenseNumber}</p>

          <p className="text-gray-900">License Type</p>
          <p className="text-gray-900 font-medium">: {license.licenseType}</p>

          <p className="text-gray-900">License Issued Date</p>
          <p className="text-gray-900 font-medium">: {license.issuedDate}</p>

          <p className="text-gray-900">License Expiry Date</p>
          <p className="text-gray-900 font-medium">: {license.expiryDate}</p>

          <p className="text-gray-900">Issuing Authority</p>
          <p className="text-gray-900 font-medium">: {license.issuingAuthority}</p>

          <p className="text-gray-900">Badge Number (if applicable)</p>
          <p className="text-gray-900 font-medium">: {license.badgeNumber || "-"}</p>

          <p className="text-gray-900">Experience (Years)</p>
          <p className="text-gray-900 font-medium">: {license.experienceYears} Years</p>
        </div>

      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <ActionButton
          iconSrc={excelicon}
          iconAlt="excel Icon"
          label="Export to Excel"
          onClick={() => alert("Exporting Excel...")}
        />
        <ActionButton
          iconSrc={pdficon}
          iconAlt="pdf Icon"
          label="Export to PDF"
          onClick={() => alert("Exporting PDF...")}
        />
      </div>
    </div>
  );
};

export default Information;
