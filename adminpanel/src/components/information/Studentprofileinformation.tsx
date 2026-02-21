import React from "react";
import ActionButton from "../button/Button";
import excelicon from "../../assets/components/button/excelicon.png";
import pdficon from "../../assets/components/button/pdficon.png";
import editicon from "../../assets/components/button/editicon.png";
import driverIcon from '../../assets/drivers/drivericon.png';

const Information: React.FC = () => {
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

        {/* Student Basic Info */}
        <div className="flex gap-20 my-2">
          <div className="relative ml-8">
            <div className="w-64 h-64 rounded-full bg-green-200 shadow-[2px_2px_20px_0px_rgba(163,217,165,0.25)]" />
            <img
              src="/studentphoto.png"
              alt="Student"
              className="w-64 h-64 rounded-full outline outline-1 absolute top-0 left-0"
            />
          </div>

          <div className="grid grid-cols-[220px_1fr] gap-y-4 text-lg font-inter">
            <p className="text-gray-900">Full Name</p>
            <p className="text-gray-900 font-medium">: Ravi Kumar</p>

            <p className="text-gray-900">Roll Number</p>
            <p className="text-gray-900 font-medium">: 21CSE1023</p>

            <p className="text-gray-900">Department</p>
            <p className="text-gray-900 font-medium">: Computer Science and Engineering</p>

            <p className="text-gray-900">Year & Section</p>
            <p className="text-gray-900 font-medium">: III Year - B</p>

            <p className="text-gray-900">Course Type</p>
            <p className="text-gray-900 font-medium">: B.E.</p>

            <p className="text-gray-900">Academic Year</p>
            <p className="text-gray-900 font-medium">: 2024–2025</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8" />

        {/* Contact Information */}
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
            Contact Information
          </h2>
          <img src={driverIcon} alt="title icon" className="w-4 h-4 object-contain" />
        </div>

        <div className="mt-8 grid grid-cols-[280px_1fr] gap-y-4 text-[18px] font-inter">
          <p className="text-gray-900">Phone Number</p>
          <p className="text-gray-900 font-medium">: +91 98765 43210</p>

          <p className="text-gray-900">Email Address</p>
          <p className="text-gray-900 font-medium">: ravi.kumar@college.edu</p>

          <p className="text-gray-900">Home Address</p>
          <p className="text-gray-900 font-medium">: 12, VGN Nagar, Mogappair, Chennai</p>

          <p className="text-gray-900">Emergency Contact Person</p>
          <p className="text-gray-900 font-medium">: Mr. Kumar (Father)</p>

          <p className="text-gray-900">Emergency Contact Number</p>
          <p className="text-gray-900 font-medium">: +91 98765 11122</p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8" />

        {/* Parent / Guardian Info */}
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
            Parent / Guardian Information
          </h2>
          <img src={driverIcon} alt="title icon" className="w-4 h-4 object-contain" />
        </div>

        <div className="mt-8 grid grid-cols-[280px_1fr] gap-y-4 text-[18px] font-inter">
          <p className="text-gray-900">Parent / Guardian Name</p>
          <p className="text-gray-900 font-medium">: Mr. R. Kumar</p>

          <p className="text-gray-900">Relationship</p>
          <p className="text-gray-900 font-medium">: Father</p>

          <p className="text-gray-900">Contact Number</p>
          <p className="text-gray-900 font-medium">: +91 98765 43210</p>

          <p className="text-gray-900">Alternate Contact</p>
          <p className="text-gray-900 font-medium">: +91 99999 88888</p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8" />

        {/* Bus Route & Stop Details */}
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
            Bus Route & Stop Details
          </h2>
          <img src={driverIcon} alt="title icon" className="w-4 h-4 object-contain" />
        </div>

        <div className="mt-8 grid grid-cols-[280px_1fr] gap-y-4 text-[18px] font-inter">
          <p className="text-gray-900">Bus Name / Route Name</p>
          <p className="text-gray-900 font-medium">: Bus 12 – West Mambalam</p>

          <p className="text-gray-900">Registered Stop</p>
          <p className="text-gray-900 font-medium">: Mogappair West Stop</p>

          <p className="text-gray-900">Total Distance to College</p>
          <p className="text-gray-900 font-medium">: 14.2 km</p>
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
