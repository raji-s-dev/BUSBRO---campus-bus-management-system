import React from "react";

type AttendanceStatus = "present" | "absent" | "non-working" | "upcoming";

interface AttendanceDay {
  day: number;
  status: AttendanceStatus;
}

interface AttendanceProps {
  attendanceData: AttendanceDay[];
}

const statusStyles: Record<AttendanceStatus, string> = {
  present: "bg-green-600 text-white",
  absent: "bg-red-600 text-white",
  "non-working": "bg-stone-300 text-white",
  upcoming: "border border-black/40 text-black",
};

const Attendance: React.FC<AttendanceProps> = ({ attendanceData }) => {
  return (
    <div className="w-full p-4  bg-white ">
     <div className="w-full flex justify-center mb-6">
  <div className="grid grid-cols-10 gap-1">
   {attendanceData.map((day, index) => (
  <div
    key={index}
    className={`w-11 h-11 flex items-center justify-center rounded-lg text-sm font-medium ${statusStyles[day.status]}`}
  >
    {day.day}
  </div>
))}

  </div>
</div>



      {/* Legend */}
      <div className="flex justify-end gap-4 mt-8 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-green-600 rounded-sm"></div>
          <span>Present</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-red-600 rounded-sm"></div>
          <span>Absent</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-stone-300 rounded-sm"></div>
          <span>Non working day</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border border-black/40 rounded-sm"></div>
          <span>Upcoming</span>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
