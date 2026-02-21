import React from "react";
import Table from "../table/Table";
import ActionButton from "../button/Button";
import DateSelector from "../dateselector/MYselector";

import excelicon from "../../assets/components/button/excelicon.png";
import pdficon from "../../assets/components/button/pdficon.png";
import entrylogicon from "../../assets/dashboard/entrylogs.png";
import calendar from "../../assets/components/busentrylog/calender.png";
import delay from "../../assets/components/busentrylog/delay.png";
import clock from "../../assets/components/table/entrytime.png";
import status from "../../assets/components/table/status.png";
import entrylog from "../../assets/components/busentrylog/entrylogs-coloured.png";

const entrylogcolumns = [
  { label: "Date", key: "date", icon: <img src={calendar} alt="calendar" className="w-4 h-4" /> },
  { label: "Entry Time", key: "entryTime", icon: <img src={clock} alt="clock" className="w-4 h-4" /> },
  { label: "Status", key: "status", icon: <img src={status} alt="status" className="w-4 h-4" /> },
  { label: "Delay(mins)", key: "delay", icon: <img src={delay} alt="delay" className="w-4 h-4" /> },
];

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
]; 

type EntryLog = {
  date: string;
  entryTime: string;
  status: string;
  delay: string;
};

type Props = {
  entrylogdata: EntryLog[];
  selectedDate: { month: number | ""; year: number | "" };
  onDateChange: (field: "month" | "year", value: number | "") => void;
  onExportExcel: (data: EntryLog[]) => void;
  onExportPDF: (data: EntryLog[]) => void;
};

const BusEntryLog: React.FC<Props> = ({
  entrylogdata,
  selectedDate,
  onDateChange,
  onExportExcel,
  onExportPDF,
}) => {
  return (
    <div className="p-6 pb-12 bg-white rounded-xl">
      {/* Title */}
      <div className="flex items-center gap-2 pl-6 pr-2 mb-10">
        <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
          Monthly entry logs (this bus only)
        </h2>
        <img src={entrylog} alt="title icon" className="w-4 h-4 object-contain" />
      </div>

      {/* Date Selector */}
      <div className="pl-8">
        <DateSelector
          month={selectedDate.month}
          year={selectedDate.year}
          onChange={onDateChange}
        />
      </div>

      {/* Table */}
      <Table
        title={
          selectedDate.month && selectedDate.year
      ? `Entry Logs - ${monthNames[selectedDate.month - 1]}, ${selectedDate.year}`
      : "Select month and year to view logs"
        }
        titleIcon={entrylogicon}
        columns={entrylogcolumns}
        data={entrylogdata}
        searchable
      />

      {/* Export Buttons */}
      <div className="flex flex-row gap-4 mt-12 mr-8 justify-end">
        <ActionButton
          iconSrc={excelicon}
          iconAlt="excel Icon"
          label="Export to Excel"
          onClick={() => onExportExcel(entrylogdata)}
        />
        <ActionButton
          iconSrc={pdficon}
          iconAlt="PDF Icon"
          label="Export as PDF"
          onClick={() => onExportPDF(entrylogdata)}
        />
      </div>
    </div>
  );
};

export default BusEntryLog;
