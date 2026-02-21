import { useParams, useNavigate} from "react-router-dom";
import { useState } from 'react';

import TextHeading from '../../../components/heading/Textheading';
import DateSelector from '../../../components/dateselector/DMYselector';
import ActionButton from "../../../components/button/Button";

import DriverIcon from "../../../assets/drivers/drivericon.png";
import arrowleft from '../../../assets/emergency/backarrow.png';

import unassignicon from "../../../assets/drivers/manageassignment/unassignicon.png";


import confirmicon from '../../../assets/drivers/manageassignment/confirmicon.png'; // your local asset
import cancelicon from '../../../assets/drivers/manageassignment/cancelicon.png'; // your local asset

const Unassign: React.FC = () => {
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
          <TextHeading title="Mark as Unassigned" logo={unassignicon} />

          <div className="mt-10 px-4">
            


            
 <div className="w-full h-full bg-white rounded-[10px]  flex flex-col gap-8 p-6 ">
      {/* Header */}
     
<div className="">
<h2 className="text-[#000] text-[16px] font-normal leading-none font-[Inter]">
        Are you sure you want to unassign Dhanasekar K from Bus 04?
      </h2>
</div>

      {/* From Date */}
      <div className="flex items-center gap-4 ">
        <span className="text-[#000] text-[16px] font-normal leading-none font-[Inter]">Effective Date :</span>
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
            label="ConfirmUnassignment"
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

export default Unassign;
