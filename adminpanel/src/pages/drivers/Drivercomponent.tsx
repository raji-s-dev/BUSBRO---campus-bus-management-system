import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Information from '../../components/information/Profileinformation';
import Attendance from '../../components/attendance/Attendance';
import Linechartarrival from '../../components/linechart/Linechartarrival';
import Linechartdeparture from '../../components/linechart/Linechartdeparture';
import MYselector from '../../components/dateselector/MYselector';
import Piechart from "../../components/piechart/Piechartdriver";
import Tablewithoutstatus from '../../components/table/Tablewithoutstatus';
import Assignment from '../../components/manageassignment/Assignment';
import Heading from '../../components/heading/Textheading';
import Summarybar from '../../components/summarybar/Summarybar';

import linegraph from '../../assets/components/linechart/graph.png';
import piecharticon from '../../assets/components/piechart/piechart.png';
import entrylogicon from '../../assets/dashboard/entrylogs.png';
import arrowleft from '../../assets/emergency/backarrow.png';
import calendar from '../../assets/dashboard/date.png';
import clock from '../../assets/components/table/entrytime.png';
import speedIcon from '../../assets/dashboard/speed.png';
import timerIcon from '../../assets/dashboard/durationicon.png';
import persontick from '../../assets/components/attendance/persontick.png';






const speedingColumns = [
  { label: "Date", key: "date", icon: <img src={calendar} alt="calendar" className="w-4 h-4" /> },
  { label: "Time", key: "time", icon: <img src={clock} alt="time" className="w-4 h-4" /> },
  { label: "Speed Recorded", key: "speedRecorded", icon: <img src={speedIcon} alt="speed" className="w-4 h-4" /> },
  { label: "Duration Over Limit", key: "durationOverLimit", icon: <img src={timerIcon} alt="duration" className="w-4 h-4" /> }
];


// ----- Driver Component -----
const Drivercomponent: React.FC = () => {
  const navigate = useNavigate();
  const { driverId } = useParams<{ driverId: string }>();
  
  const [driverData, setDriverData] = useState<any | null>(null);
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any | null>(null);
  const [departureTimes, setDepartureTimes] = useState<(number | null)[]>([]);
  const [arrivalTimes, setArrivalTimes] = useState<(number | null)[]>([]);
  const [pieData, setPieData] = useState<any[]>([]);
  const [speedingData, setSpeedingData] = useState([]);

  const today = new Date();
  const [month, setMonth] = useState<number>(today.getMonth() + 1);
  const [year, setYear] = useState<number>(today.getFullYear());

  // Fetch driver info including assignments
  useEffect(() => {
    const fetchDriver = async () => {
      const res = await fetch(`http://localhost:5000/api/drivers/${driverId}`);
      const data = await res.json();
      setDriverData(data);
      setSpeedingData(data.speedingRecords || []);

      // ✅ Assignments from API
      if (data.assignments && data.assignments.length > 0) {
        setAssignments(data.assignments[0]); // assuming first object contains current driver assignment
      }
    };
    fetchDriver();
  }, []);

  // Fetch attendance
  useEffect(() => {
    if (!month || !year) return;

    const fetchAttendance = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/attendance/${month}/${year}`);
        const data = await res.json();
        setAttendanceData(data.attendanceData);
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    };
    fetchAttendance();
  }, [month, year]);

  const workingDays = attendanceData.filter(d => d.status !== "non-working" && d.status !== "upcoming").length;
  const present = attendanceData.filter(d => d.status === "present").length;
  const absent = attendanceData.filter(d => d.status === "absent").length;
  const attendancePercent = Math.round((present / workingDays) * 100);

  const handleDateChange = (field: "month" | "year", value: number | "") => {
    if (field === "month") setMonth(value as number);
    if (field === "year") setYear(value as number);
  };


  // Fetch departure timeline dynamically
useEffect(() => {
  if (!driverId) return;

  if (month && year) {
    fetch(
      `http://localhost:5000/api/drivers/${driverId}/departuretimeline?month=${month}&year=${year}`
    )
      .then((res) => res.json())
      .then((data: (number | null)[]) => {
        // data is already aligned with day index (0 = day 1)
        setDepartureTimes(data);
      })
      .catch((err) => console.error("Error fetching departure timeline:", err));
  }
}, [driverId, month, year]);


  // Fetch arrival timeline dynamically
useEffect(() => {
  if (!driverId) return;

  if (month && year) {
    fetch(
      `http://localhost:5000/api/drivers/${driverId}/arrivaltimeline?month=${month}&year=${year}`
    )
      .then((res) => res.json())
      .then((data: (number | null)[]) => {
        // data is already aligned with day index (0 = day 1)
        setArrivalTimes(data);
      })
      .catch((err) => console.error("Error fetching arrival timeline:", err));
  }
}, [driverId, month, year]);



  // ✅ Pie Chart
  
  useEffect(() => {
    if (!driverId) return;
    if (month && year) {
      fetch(
        `http://localhost:5000/api/drivers/${driverId}/pie?month=${month}&year=${year}`
      )
        .then((res) => res.json())
        .then((data) => setPieData(data));
    }
  },  [driverId, month, year]);


  return (
    <div className="h-screen p-4">
      <div className="flex flex-col space-y-4 pb-4">

        {/* Header */}
        <div className="bg-white rounded-xl py-4 w-full font-inter shadow-md flex items-center">
          <button className="ml-4 p-1 hover:bg-gray-100 rounded-full"   onClick={() => navigate("/DriverManagement")}>
            <img src={arrowleft} alt="arrowleft" className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="flex-1 text-center text-gray-600 font-semibold text-base sm:text-lg">
           Profile : {driverData?.basicInfo?.displayName || "Driver"}
          </h1>
          <div className="w-10" />
        </div>

        {/* Driver Info */}
        {driverData && (
          <Information
            photoSrc={driverData.photo}
            basicInfo={driverData.basicInfo}
            identification={driverData.identification}
            contact={driverData.contact}
            license={driverData.license}
          />
        )}

        {/* Attendance Section */}
        <div className="p-6 pb-12 bg-white rounded-xl h-max-800px">
          <div className="flex items-center justify-between pb-4">
            <Heading title="Attendance Section" logo={persontick} />
            <MYselector month={month} year={year} onChange={handleDateChange} />
          </div>

          <Summarybar
            data={[
              { label: "Working Days", value: workingDays },
              { label: "Present", value: present },
              { label: "Absent", value: absent },
              { label: "Attendance", value: `${attendancePercent}%` },
            ]}
          />

          <div className="mt-6">
            <Attendance attendanceData={attendanceData} />
          </div>
        </div>

        {/* Assignments */}
        {assignments && (
          <Assignment
            driverName={assignments.driverName}
            currentBus={assignments.currentBus}
            assignments={assignments.history}
          />
        )}

        {/* Analytics Separator */}
        <div className="flex items-center gap-2">
          <span className="text-base sm:text-lg text-gray-800 font-semibold pl-6">Analytics</span>
          <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
          <span className="text-gray-500 text-base sm:text-lg font-semibold">{driverData?.basicInfo?.displayName || "Driver"}</span>
        </div>

        {/* Departure Line Chart */}
        <div className="p-6 pb-12 bg-white rounded-xl h-max-800px">
          <div className="flex items-center justify-between pb-4">
            <Heading title="Departure Time Line Graph" logo={linegraph} />
            <MYselector month={month} year={year} onChange={handleDateChange} />
          </div>
          <Linechartdeparture
            title="Departure Time vs Day"
            label="Departure Time"
            dataPoints={departureTimes}
            target={7.33}
          />
        </div>

        {/* Arrival Line Chart */}
        <div className="p-6 pb-12 bg-white rounded-xl h-max-800px">
          <div className="flex items-center justify-between pb-4">
            <Heading title="Arrival Time Line Graph" logo={linegraph} />
            <MYselector month={month} year={year} onChange={handleDateChange} />
          </div>
          <Linechartarrival
            title="Arrival Time vs Day"
            label="Arrival Time"
            dataPoints={arrivalTimes}
            target={8.5}
          />
        </div>

        {/* Punctuality Pie Chart */}
        <div className="p-6 bg-white rounded-xl w-full">
          <div className="flex justify-between items-center mb-4">
            <Heading title="Punctuality pie chart" logo={piecharticon} />
            <MYselector month={month} year={year} onChange={handleDateChange} />
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-[700px]">
              <Piechart data={pieData} />
            </div>
          </div>
        </div>

        {/* Speeding Records Table */}
        <div className="p-6 pb-8 bg-white rounded-xl">
          <Tablewithoutstatus
            title="Speeding Records"
            titleIcon={entrylogicon}
            columns={speedingColumns}
            data={speedingData}
            searchable
          />
        </div>

      </div>
    </div>
  );
};

export default Drivercomponent;
