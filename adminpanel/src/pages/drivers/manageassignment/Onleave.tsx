import { useParams, useNavigate} from "react-router-dom";
import { useState } from 'react';

import TextHeading from '../../../components/heading/Textheading';
import DateSelector from '../../../components/dateselector/DMYselector';
import ActionButton from "../../../components/button/Button";

import DriverIcon from "../../../assets/drivers/drivericon.png";
import arrowleft from '../../../assets/emergency/backarrow.png';



import confirmicon from '../../../assets/drivers/manageassignment/confirmicon.png'; // your local asset
import onleaveicon from '../../../assets/drivers/manageassignment/onleaveicon.png'; // your local asset
import cancelicon from '../../../assets/drivers/manageassignment/cancelicon.png'; // your local asset

const Unassign: React.FC = () => {
  const { driverId } = useParams();  // will be used later for API
  const navigate = useNavigate();


   const [fromDate, setFromDate] = useState<number | "">("");
    const [fromMonth, setFromMonth] = useState<number | "">("");
    const [fromYear, setFromYear] = useState<number | "">("");

    const [reason, setReason] = useState<string>("");

    
  const handleExportExcel = () => {
    console.log("Exporting to Excel");
  };

  const handleExportPDF = () => {
    console.log("Exporting to PDF");
  };


  return (
    <div className="h-screen p-4">
      <div className="flex flex-col space-y-4 pb-4">
        {/* Header */}
        <div className="bg-white rounded-xl py-4 w-full font-inter shadow-md flex items-center">
          {/* Back Button */}
          <button className="ml-4 p-1 hover:bg-gray-100 rounded-full" 
          onClick={() => navigate(`/drivers/${driverId}/manage`)}>
            <img src={arrowleft} alt="arrowleft" className="w-6 h-6 text-gray-600" />
          </button>

          {/* Title + Icon */}
          <div className="flex-1 flex justify-center items-center gap-3">
            <h1 className="text-gray-600 font-semibold text-base sm:text-lg">
              Profile : Dhanasekar K
            </h1>
            <img src={DriverIcon} alt="title icon" className="w-4 h-4 object-contain" />
          </div>

          {/* Spacer */}
          <div className="w-10" />
        </div>

        {/* Manage Assignment Card */}
        <div className="w-full bg-white rounded-2xl p-6 relative min-h-[calc(100vh-120px)] overflow-y-auto pr-2">
          <TextHeading title="Mark as On Leave" logo={onleaveicon} />

          <div className="mt-10 px-4">
            


   <div className="w-full h-full bg-white rounded-[10px] flex flex-col gap-8 p-6">
  {/* Header */}
  <h2 className="text-[#000] text-[16px] font-normal leading-none font-[Inter]">
    Are you sure you want to dismiss this driver permanently?
  </h2>

  {/* Form */}
  <div className="grid grid-cols-[auto_1fr] gap-y-6 gap-x-4 items-center w-[450px]">
    {/* Effective Date */}
    <label className="text-[#000] text-[16px] font-normal font-[Inter] text-right">
      Leave Start :
    </label>
    <DateSelector
      date={fromDate}
      month={fromMonth}
      year={fromYear}
      onChange={(field, value) => {
        if (field === "date") setFromDate(value);
        if (field === "month") setFromMonth(value);
        if (field === "year") setFromYear(value);
      }}
    />


{/* Effective Date */}
    <label className="text-[#000] text-[16px] font-normal font-[Inter] text-left">
      Leave End :
    </label>
    <DateSelector
      date={fromDate}
      month={fromMonth}
      year={fromYear}
      onChange={(field, value) => {
        if (field === "date") setFromDate(value);
        if (field === "month") setFromMonth(value);
        if (field === "year") setFromYear(value);
      }}
    />


    

    {/* Reason */}
    <label className="text-[#000] text-[16px] font-normal font-[Inter] text-left">
      Reason :
    </label>
    <input
      type="text"
      className="bg-stone-50 rounded-lg border border-gray-200 px-4 py-2"
      placeholder="Enter reason for dismissal"
      value={reason}
      onChange={(e) => setReason(e.target.value)}
    />
  </div>

  {/* Action section */}
  <div className="flex gap-4 mt-4">
    <ActionButton
      iconSrc={confirmicon}
      iconAlt="Excel"
      label="Confirm Leave"
      onClick={handleExportExcel}
      className="bg-[#2ECC71] text-[#FFFFFF] hover:bg-[#27ae60]"
    />
    <ActionButton
      iconSrc={cancelicon}
      iconAlt="PDF"
      label="Cancel"
      onClick={handleExportPDF}
      className="bg-[#FECDCA] text-[#9E2A2B] hover:bg-[#fcb9b7]"
    />
  </div>
</div>

    


          </div>
        </div>
      </div>
    </div>
  );
};

export default Unassign;
