import { useState } from 'react';

import TableforDA from '../../components/table/TableforDA';
import ActionButton from "../../components/button/Button";
import DateSelector from '../../components/dateselector/DMYselector';
import Summarybar from "../../components/summarybar/Summarybar";




import excelicon from "../../assets/components/button/excelicon.png"; // your local asset
import pdficon from "../../assets/components/button/pdficon.png"; // your local asset
import entrylogicon from '../../assets/dashboard/entrylogs.png';
import bus from '../../assets/components/table/bus.png';
import driver from '../../assets/components/table/person.png';
import clock from '../../assets/components/table/entrytime.png';
import status from '../../assets/components/table/status.png';
import exporticon from '../../assets/entry logs/exporticon.png'; // your local asset
import downloadicon from '../../assets/entry logs/download.png'; // your local asset



const workingDays = 19;
  const present = 17;
  const absent = 2;
  const attendancePercent = Math.round((present / workingDays) * 100);



// When you use <Table />, pass icons like this:
const entrylogcolumns = [
  { label: "Driver", key: "driver", icon: <img src={driver} alt="driver" className="w-4  h-4" /> },
  { label: "Bus", key: "bus", icon: <img src={bus} alt="bus" className="w-4  h-4" /> },
  { label: "Entry Time", key: "entryTime", icon: <img src={clock} alt="clock" className="w-4  h-4" /> },
  { label: "Status", key: "status", icon: <img src={status} alt="status" className="w-4  h-4" /> },
];

const entrylogdata = [
  { bus: "Avadi", driver: "R. Raja", entryTime: "-", status: "Absent" },
  { bus: "Ambattur", driver: "M. Murugan", entryTime: "-", status: "Absent" },
  { bus: "Adyar", driver: "C. Chandran", entryTime: "-", status: "Absent" },
  { bus: "Anakaputhur", driver: "G. Gopal", entryTime: "08:01 AM", status: "Present" },
  { bus: "Chengelpet", driver: "P. Paramasivam", entryTime: "08:01 AM", status: "Present" },
  { bus: "ECR-1", driver: "A. Anand", entryTime: "08:01 AM", status: "Present" },
  { bus: "ECR-2", driver: "R. Ramesh", entryTime: "08:01 AM", status: "Present" },
  { bus: "Kalpakkam", driver: "D. Dileep", entryTime: "08:01 AM", status: "Present" },
  { bus: "Koyambedu", driver: "S. Subramaniyan", entryTime: "08:01 AM", status: "Present" },
  { bus: "Avadi", driver: "R. Raja", entryTime: "-", status: "Absent" },
  { bus: "Ambattur", driver: "M. Murugan", entryTime: "-", status: "Absent" },
  { bus: "Adyar", driver: "C. Chandran", entryTime: "-", status: "Absent" },
  { bus: "Anakaputhur", driver: "G. Gopal", entryTime: "08:01 AM", status: "Present" },
  { bus: "Chengelpet", driver: "P. Paramasivam", entryTime: "08:01 AM", status: "Present" },
  { bus: "ECR-1", driver: "A. Anand", entryTime: "08:01 AM", status: "Present" },
  { bus: "ECR-2", driver: "R. Ramesh", entryTime: "08:01 AM", status: "Present" },
  { bus: "Kalpakkam", driver: "D. Dileep", entryTime: "08:01 AM", status: "Present" },

];


const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];  



const Driverattendance = () => {
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


  
// Selected date state

  const [selectedDate, setSelectedDate] = useState<{
  date: number | "";
  month: number | "";
  year: number | "";
}>({
  date: "",
  month: "",
  year: ""
});


  const handleDateChange = (field: "date" | "month" | "year", value: number | "") => {
    setSelectedDate((prev) => ({ ...prev, [field]: value }));
  };


  return (


    <div className="h-screen p-4">
      <div className="flex flex-col space-y-4  pb-4">



        {/* Top Header */}
       
    <div className="bg-white rounded-xl py-4 max-w-full font-inter  flex flex-col justify-center items-center"> 
    <h1 className="text-gray-600 font-semibold text-base sm:text-lg text-center">
    Driver Attendance 
    </h1>
    <div className="w-2/3 my-2 border-t border-black/10"></div>
    <p className="text-gray-500/80 text-base sm:text-lg font-semibold text-center">
    Overview of all Driver’s Attendance records 
    </p>
    </div>

    {/* tables*/}

<div className="p-6 pb-12 bg-white rounded-xl">
<div className="pl-8">
   <DateSelector
        date={selectedDate.date}
        month={selectedDate.month}
        year={selectedDate.year}
        onChange={handleDateChange}
      />
      </div>
      <div className="pl-8 mt-4">
      <Summarybar
  data={[
    { label: "Total Drivers", value: workingDays },
    { label: "Present", value: present },
    { label: "Absent", value: absent },
    { label: "Attendance", value: `${attendancePercent}%` },
  ]}
/>
</div>


      <TableforDA
      title={
    selectedDate.date && selectedDate.month && selectedDate.year
      ? `Driver Attendance - ${selectedDate.date} ${monthNames[selectedDate.month - 1]}, ${selectedDate.year}`
      : "Today Driver Attendance"
  }
        titleIcon={entrylogicon}
        columns={entrylogcolumns}
        data={entrylogdata} searchable/>


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




 <div className="w-full h-full bg-white rounded-[10px] p-10 flex flex-col gap-8 ">
      {/* Header */}
      <div className="flex items-center gap-4">
        <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">Batch Export Logs</h2>
        <img
          src={exporticon}
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

      {/* Info Box */}
      <div className="bg-gray-200 rounded-[10px] px-6 py-6 text-gray-500 text-sm font-medium ml-6 max-w-[500px] text-center">
        Choose the From Date and To Date using dropdowns
      </div>

      {/* Export Section */}
      <div className="flex flex-col gap-4 pl-6">
        <div className="flex items-center gap-2">
          <span className="text-base sm:text-md text-gray-800 font-semibold font-['Inter']">Export options :</span>
           <img
          src={downloadicon}
          alt="title icon"
          className="w-4 h-4 object-contain"
        />
        </div>
        <div className="flex gap-4 mt-2">
          <ActionButton
            iconSrc={excelicon}
            iconAlt="Excel"
            label="Export to Excel"
            onClick={handleExportExcel}
            className={`${isExportDisabled ? "bg-gray-300 cursor-not-allowed text-gray-500" : "bg-green-500 hover:bg-green-600"}`}
          />
          <ActionButton
            iconSrc={pdficon}
            iconAlt="PDF"
            label="Export to PDF"
            onClick={handleExportPDF}
            className={`${isExportDisabled ? "bg-gray-300 cursor-not-allowed text-gray-500" : "bg-red-500 hover:bg-red-600"}`}
          />
        </div>
      </div>
    </div>




    

    </div>
    </div>
  );
};

export default Driverattendance;
