import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



import Information from '../../components/information/Studentprofileinformation';
import Attendance from '../../components/attendance/Attendance'
import MYselector from '../../components/dateselector/MYselector';
import Heading from '../../components/heading/Textheading';
import Summarybar from '../../components/summarybar/Summarybar';
import Fullpaid from '../../components/statusbadges/Fullypaid';
import Feepending from '../../components/statusbadges/Feepending';
import Feetable from '../../components/table/Tableoverflow';



import arrowleft from '../../assets/emergency/backarrow.png';
import persontick from '../../assets/components/attendance/persontick.png';
import feedetial from '../../assets/studentdetials/feedetial.png';






  const columns = [
    { label: "Date", key: "date" },
    { label: "Amount Paid", key: "amountPaid" },
    { label: "Mode (Cash/UPI/Bank)", key: "mode" },
    { label: "Receipt/Txn ID", key: "txnId" },
    
  ];

  const data = [
    {
      date: "01.01.2025",
      amountPaid: 33000,
      mode: "Cash",
      txnId: "239857r23923",
    },
  ];



const Studentcomponent: React.FC = () => {
   const navigate = useNavigate();
 
  const [attendanceData, setAttendanceData] = useState<any[]>([]);

    const today = new Date();
    const [month, setMonth] = useState<number>(today.getMonth() + 1);
    const [year, setYear] = useState<number>(today.getFullYear());
  

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
  

  
  return (
    <div className="h-screen p-4">
      <div className="flex flex-col space-y-4 pb-4">
      
        {/* header */}
<div className="bg-white rounded-xl py-4 w-full font-inter shadow-md flex items-center">
  {/* Back Button */}
  <button
    onClick={() => navigate(-1)}
    className="ml-4 p-1 hover:bg-gray-100 rounded-full"
  >
    <img src={arrowleft} alt="arrowleft" className="w-6 h-6 text-gray-600" />
  </button>

  {/* Title */}
  <h1 className="flex-1 text-center text-gray-600 font-semibold text-base sm:text-lg">
    Profile : Dhanasekar k
  </h1>

  {/* spacer to balance flex for centering */}
  <div className="w-10" />
</div>


<div>
  <Information
  />
</div>


<div className="p-6 pb-12 bg-white rounded-xl h-max-800px">
  <div className="flex items-center justify-between  pb-4">
   <Heading title="Attendance Section" logo={persontick} />
          <MYselector
        month={month}
        year={year}
        onChange={handleDateChange}
      />


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





<div className="p-6 pb-12 bg-white rounded-xl">
  <div className="flex items-center justify-between  pb-4">
   <Heading title="Fee Status Section" logo={feedetial} />
          
<Fullpaid />  

          </div>

          <div className="m-6 grid grid-cols-[300px_1fr] gap-y-4 text-[18px] font-inter">
          <p className="text-gray-900">Student Name</p>
<p className="text-gray-900 font-medium">: Dhanasekar K</p>

<p className="text-gray-900">Roll Number</p>
<p className="text-gray-900 font-medium">: 9123205081</p>

<p className="text-gray-900">Department</p>
<p className="text-gray-900 font-medium">: Information Technology</p>

<p className="text-gray-900">Semester</p>
<p className="text-gray-900 font-medium">: 5</p>

<p className="text-gray-900">Year</p>
<p className="text-gray-900 font-medium">: 3</p>

<p className="text-gray-900">Bus Name</p>
<p className="text-gray-900 font-medium">: West Mambalam</p>

<p className="text-gray-900">Boarding Point</p>
<p className="text-gray-900 font-medium">: Cit Nagar</p>

<p className="text-gray-900">Total Fee</p>
<p className="text-gray-900 font-medium">: 33000</p>

<p className="text-gray-900">Amount Paid</p>
<p className="text-gray-900 font-medium">: 33000</p>

        </div>
          




  
</div>

<Feetable
      columns={columns}
      data={data}
      searchable={true} // enables search + header
      title="Payment History Table"
      titleIcon={feedetial} // optional
    />













    </div>
   </div>
  );
};

export default Studentcomponent;
