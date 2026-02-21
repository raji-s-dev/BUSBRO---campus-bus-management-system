import { useParams, useNavigate} from "react-router-dom";
import { useState } from 'react';

import TextHeading from '../../../components/heading/Textheading';
import DateSelector from '../../../components/dateselector/DMYselector';
import ActionButton from "../../../components/button/Button";

import DriverIcon from "../../../assets/drivers/drivericon.png";
import arrowleft from '../../../assets/emergency/backarrow.png';
import busicon from "../../../assets/drivers/manageassignment/busiconblack.png";


import confirmicon from '../../../assets/drivers/manageassignment/confirmicon.png'; // your local asset
import cancelicon from '../../../assets/drivers/manageassignment/cancelicon.png'; // your local asset

const Assign: React.FC = () => {
  const { driverId } = useParams();  // will be used later for API
  const navigate = useNavigate();


   const [fromDate, setFromDate] = useState<number | "">("");
    const [fromMonth, setFromMonth] = useState<number | "">("");
    const [fromYear, setFromYear] = useState<number | "">("");


    
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
          <TextHeading title="Assign to another Bus" logo={busicon} />

          <div className="mt-10 px-4">
            


            
 <div className="w-full h-full bg-white rounded-[10px]  flex flex-col gap-8 p-6 ">
      {/* Header */}
     
{/* Select Bus */}
<div className="flex items-center gap-4 ">
  <span className="text-[#000] text-[16px] font-normal leading-none font-['Inter']">
    Select Bus :
  </span>
  <div className="inline-flex items-center bg-stone-50 rounded-lg border border-gray-200 px-4 py-2">
    <select
      aria-label="Select Bus"
      defaultValue=""
      className="bg-transparent text-gray-900 text-base font-normal font-['Inter'] outline-none cursor-pointer"
    >
      <option value="" disabled hidden>
        List of Unassigned Buses
      </option>
      <option value="bus1">Bus 1</option>
      <option value="bus2">Bus 2</option>
      <option value="bus3">Bus 3</option>
    </select>
  </div>
</div>



      {/* From Date */}
      <div className="flex items-center gap-4 ">
        <span className="text-[#000] text-[16px] font-normal leading-none font-[Inter]">From Date :</span>
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
      </div>

      

      

      {/* action section */}
      <div className="flex flex-col gap-4 ">
        
        <div className="flex gap-4 mt-2">
          <ActionButton
            iconSrc={confirmicon}
            iconAlt="Excel"
            label="Confirm Assignment"
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
    </div>
  );
};

export default Assign;
