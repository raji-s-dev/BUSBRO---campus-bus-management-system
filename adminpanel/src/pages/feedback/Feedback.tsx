import { useState } from 'react';
import Tableoverflow from '../../components/table/tableforCF';
import DateSelector from '../../components/dateselector/DMYselector';
import ActionButton from "../../components/button/Button";
import UpdateStatusDropdown from '../../components/updatestatusdropdown/UpdateStatusDropdown';


import entrylogicon from '../../assets/dashboard/entrylogs.png';
import calendar from '../../assets/dashboard/date.png';
import userIcon from '../../assets/dashboard/usericon.png';
import sourceIcon from '../../assets/feedback/sourceicon.png';
import subjectIcon from '../../assets/feedback/subjecticon.png';
import statusIcon from '../../assets/feedback/statusicon.png';
import changeIcon from '../../assets/feedback/changestatus.png';


import FilterIcon from "../../assets/components/table/filter.png"; 
import reseticon from '../../assets/feedback/reseticon.png';
import applyicon from '../../assets/feedback/applyfiltericon.png';

import excelicon from "../../assets/components/button/excelicon.png"; // your local asset
import pdficon from "../../assets/components/button/pdficon.png"; // your local asset


// Table columns with icons (matching Speeding Alerts style)
const complaintColumns = [
  { label: "ID", key: "id" },
  { label: "Date", key: "date", icon: <img src={calendar} alt="calendar" className="w-4 h-4" /> },
  { label: "Submitted by", key: "submittedBy", icon: <img src={userIcon} alt="user" className="w-4 h-4" /> },
  { label: "Source", key: "source", icon: <img src={sourceIcon} alt="source" className="w-4 h-4" /> },
  { label: "Type", key: "type" },
  { label: "Subject", key: "subject", icon: <img src={subjectIcon} alt="subject" className="w-4 h-4" /> },
  { label: "Current Status", key: "currentStatus", icon: <img src={statusIcon} alt="status" className="w-4 h-4" /> },
  { label: "Change Status", key: "changeStatus", icon: <img src={changeIcon} alt="change" className="w-4 h-4" /> }
];

// Table data matching the Speeding Alerts image
const complaintData = [
  {
    id: "01",
    date: "01-06-2025",
    submittedBy: "R. Raja",
    source: "Student App",
    type: "Complaint",
    subject: "Bus came late",
    currentStatus: "New",
    changeStatus: (
      <UpdateStatusDropdown
        currentStatus="New"
        onChange={(status) => console.log("Row 1 status changed to:", status)}
      />
    ),
  },
  {
    id: "02",
    date: "02-06-2025",
    submittedBy: "M. Murugan",
    source: "Driver App",
    type: "Feedback",
    subject: "Map glitch",
    currentStatus: "In Progress",
    changeStatus: (
      <UpdateStatusDropdown
        currentStatus="In Progress"
        onChange={(status) => console.log("Row 2 status changed to:", status)}
      />
    ),
  },
  {
    id: "03",
    date: "03-06-2025",
    submittedBy: "C. Chandran",
    source: "Student App",
    type: "Complaint",
    subject: "Missed pickup",
    currentStatus: "New",
    changeStatus: (
      <UpdateStatusDropdown
        currentStatus="New"
        onChange={(status) => console.log("Row 3 status changed to:", status)}
      />
    ),
  },
  {
    id: "04",
    date: "03-06-2025",
    submittedBy: "G. Gopal",
    source: "Driver App",
    type: "Suggestion",
    subject: "Route issue",
    currentStatus: "In Progress",
    changeStatus: (
      <UpdateStatusDropdown
        currentStatus="In Progress"
        onChange={(status) => console.log("Row 4 status changed to:", status)}
      />
    ),
  },
  {
    id: "05",
    date: "04-06-2025",
    submittedBy: "P. Paramasivam",
    source: "Student App",
    type: "Complaint",
    subject: "No seat available",
    currentStatus: "New",
    changeStatus: (
      <UpdateStatusDropdown
        currentStatus="New"
        onChange={(status) => console.log("Row 5 status changed to:", status)}
      />
    ),
  },
  {
    id: "06",
    date: "04-06-2025",
    submittedBy: "A. Anand",
    source: "Driver App",
    type: "Complaint",
    subject: "Overcrowded route",
    currentStatus: "In Progress",
    changeStatus: (
      <UpdateStatusDropdown
        currentStatus="In Progress"
        onChange={(status) => console.log("Row 6 status changed to:", status)}
      />
    ),
  },
  {
    id: "07",
    date: "04-06-2025",
    submittedBy: "R. Ramesh",
    source: "Student App",
    type: "Complaint",
    subject: "Driver rude behavior",
    currentStatus: "In Progress",
    changeStatus: (
      <UpdateStatusDropdown
        currentStatus="In Progress"
        onChange={(status) => console.log("Row 7 status changed to:", status)}
      />
    ),
  },
  {
    id: "08",
    date: "04-06-2025",
    submittedBy: "D. Dileep",
    source: "Driver App",
    type: "Feedback",
    subject: "Inaccurate student list",
    currentStatus: "In Progress",
    changeStatus: (
      <UpdateStatusDropdown
        currentStatus="In Progress"
        onChange={(status) => console.log("Row 8 status changed to:", status)}
      />
    ),
  },
  {
    id: "09",
    date: "05-06-2025",
    submittedBy: "S. Subramaniyan",
    source: "Student App",
    type: "Complaint",
    subject: "Bus came late",
    currentStatus: "New",
    changeStatus: (
      <UpdateStatusDropdown
        currentStatus="New"
        onChange={(status) => console.log("Row 9 status changed to:", status)}
      />
    ),
  },
];




const Feedback = () => {

  //batch export state
     const [fromDate, setFromDate] = useState<number | "">("");
    const [fromMonth, setFromMonth] = useState<number | "">("");
    const [fromYear, setFromYear] = useState<number | "">("");
  
    const [toDate, setToDate] = useState<number | "">("");
    const [toMonth, setToMonth] = useState<number | "">("");
    const [toYear, setToYear] = useState<number | "">("");
  
    const handleExportExcel = () => {
      console.log("Exporting to Excel");
    };
  
    const handleExportPDF = () => {
      console.log("Exporting to PDF");
    };
  
    const isExportDisabled = !fromDate || !fromMonth || !fromYear || !toDate || !toMonth || !toYear;



  return (
    <div className="h-screen p-4">
      <div className="flex flex-col space-y-4 pb-4">








<div className="bg-white rounded-xl py-4 max-w-full font-inter  flex flex-col justify-center items-center"> 
    <h1 className="text-gray-600 font-semibold text-base sm:text-lg text-center">
    Complaints and Feedback
    </h1>
    
    </div>




    {/* tables*/}

<div className="p-6 pb-8 bg-white rounded-xl">



   <div className="w-full h-full bg-white rounded-[10px] p-6 flex flex-col gap-6 ">
      {/* Header */}
      <div className="flex items-center gap-4 pl-6">
        <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">Filter Options</h2>
        <img
          src={FilterIcon}
          alt="title icon"
          className="w-4 h-4 object-contain"
        />
      </div>

      {/* From Date */}
      <div className="flex items-center gap-4 pl-6">
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

      {/* To Date */}
      <div className="flex items-center gap-8 pl-6">
        <span className="text-[#000] text-[16px] font-normal leading-none font-[Inter]">To Date :</span>
        <DateSelector
          date={toDate}
          month={toMonth}
          year={toYear}
          onChange={(field, value) => {
            if (field === "date") setToDate(value);
            if (field === "month") setToMonth(value);
            if (field === "year") setToYear(value);
          }}
        />
      </div>

      

      {/* Export Section */}
      <div className="flex flex-col gap-4 pl-6">
       
        <div className="flex gap-4 mt-2">
          <ActionButton
            iconSrc={applyicon}
            iconAlt="applyicon"
            label="Apply Filters"
            onClick={handleExportExcel}
            className={`${isExportDisabled ? "bg-gray-300  text-gray-500" : "bg-red-500 hover:bg-green-600"}`}
          />
          <ActionButton
            iconSrc={reseticon}
            iconAlt="PDF"
            label="Reset Filters"
            onClick={handleExportPDF}
            className={`${isExportDisabled ? "bg-gray-300  text-gray-500" : "bg-red-500 hover:bg-red-600"}`}
          />
        </div>
      </div>
    </div>



       <Tableoverflow
    title="Complaints and Feedback"
    titleIcon={entrylogicon}
    columns={complaintColumns}
    data={complaintData}
    searchable
  />
  
  


   <div className="p-0">
     <div className='flex flex-row gap-4 mt-12 mr-8 justify-end'>
      <ActionButton
        iconSrc={excelicon}
        iconAlt="excel Icon"
        label="Export to Excel"
        onClick={() => alert("Exporting...")}
      />
      <ActionButton
        iconSrc={pdficon}
        iconAlt="PDF Icon"
        label="Export as PDF"
        onClick={() => alert("Exporting...")}
      />
      </div>
    </div>



    </div>




        </div>
    </div>
  );
};

export default Feedback;
