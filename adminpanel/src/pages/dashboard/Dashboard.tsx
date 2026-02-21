import Table from '../../components/table/Table';
import Map from '../../map/Map';
import Piechart from '../../components/piechart/Piechartdashboard';
import Tablewithoutstatus from '../../components/table/Tablewithoutstatus';
import Tableoverflow from '../../components/table/Tableoverflow';
import Barchart from '../../components/barchart/Barchart';


//assets

import ActiveIcon from '../../assets/dashboard/active icon.png';
import StuckIcon from '../../assets/dashboard/stuck icon.png';
import DelayIcon from '../../assets/dashboard/delay icon.png';
import BusIcon from '../../assets/dashboard/bus-icon.png';
import CheckIcon from '../../assets/dashboard/reaached icon.png';


import driver from '../../assets/components/table/person.png';

import status from '../../assets/components/table/status.png';

import insightsIcon from '../../assets/dashboard/insight.png';
import entrylogicon from '../../assets/dashboard/entrylogs.png';

import bus from '../../assets/components/table/bus.png';
import calendar from '../../assets/dashboard/date.png';
import clock from '../../assets/components/table/entrytime.png';
import userIcon from '../../assets/dashboard/usericon.png';
import speedIcon from '../../assets/dashboard/speed.png';
import timerIcon from '../../assets/dashboard/durationicon.png';
import piecharticon from '../../assets/components/piechart/piechart.png';




//variables
// When you use <Table />, pass icons like this:
const entrylogcolumns = [
  { label: "Bus", key: "bus", icon: <img src={bus} alt="bus" className="w-4  h-4" /> },
  { label: "Driver", key: "driver", icon: <img src={driver} alt="driver" className="w-4  h-4" /> },
  { label: "Entry Time", key: "entryTime", icon: <img src={clock} alt="clock" className="w-4  h-4" /> },
  { label: "Status", key: "status", icon: <img src={status} alt="status" className="w-4  h-4" /> },
];

// ...existing code...
const entrylogdata = [
  { bus: "Avadi", driver: "R. Raja", entryTime: "08:01 AM", status: "Late" },
  { bus: "Ambattur", driver: "M. Murugan", entryTime: "08:01 AM", status: "Late" },
  { bus: "Adyar", driver: "C. Chandran", entryTime: "08:01 AM", status: "Late" },
  { bus: "Anakaputhur", driver: "G. Gopal", entryTime: "08:01 AM", status: "On Time" },
  { bus: "Chengelpet", driver: "P. Paramasivam", entryTime: "08:01 AM", status: "On Time" },
  { bus: "ECR-1", driver: "A. Anand", entryTime: "08:01 AM", status: "On Time" },
  { bus: "ECR-2", driver: "R. Ramesh", entryTime: "08:01 AM", status: "On Time" },
  { bus: "Kalpakkam", driver: "D. Dileep", entryTime: "08:01 AM", status: "On Time" },
  { bus: "Koyambedu", driver: "S. Subramaniyan", entryTime: "08:01 AM", status: "On Time" },
  { bus: "Medavakkam", driver: "M. Mahesh", entryTime: "08:01 AM", status: "On Time" },
];
// ...existing code...

const chartdata = [
  { name: "Ontime Entries", value: 8, fill: "#56D2C3" },
  { name: "Slight Delay", value: 7, fill: "#FBE46D" },
  { name: "Late Entries", value: 4, fill: "#F76B6A" },
];

 const lateRoutes = ["Avadi", "Ambattur", "Kalpakkam", "Ambattur", "Kalpakkam", "Ambattur", "Kalpakkam"];



 // Table columns with icons
const complaintsColumns = [
  { label: "Date", key: "date", icon: <img src={calendar} alt="calendar" className="w-4 h-4" /> },
  { label: "Bus Name", key: "busName", icon: <img src={bus} alt="bus" className="w-4 h-4" /> },
  { label: "Type", key: "type" },
  { label: "Status", key: "status", icon: <img src={status} alt="info" className="w-4 h-4" /> },
];

// Table data
const complaintsData = [
  { date: "May 4", busName: "Avadi", type: "Rash Driving", status: "New" },
  { date: "May 5", busName: "Ambattur", type: "Late Arrival", status: "New" },
  { date: "April 22", busName: "Adyar", type: "Missed Pickup", status: "In Review" },
  { date: "April 20", busName: "Anakaputhur", type: "Driver Rudeness", status: "Resolved" },
];




// Table columns with icons (matching Speeding Alerts style)
const speedingColumns = [
  { label: "Date", key: "date", icon: <img src={calendar} alt="calendar" className="w-4 h-4" /> },
  { label: "Time", key: "time", icon: <img src={clock} alt="time" className="w-4 h-4" /> },
  { label: "Driver Name", key: "driverName", icon: <img src={userIcon} alt="driver" className="w-4 h-4" /> },
  { label: "Bus Name", key: "busName", icon: <img src={bus} alt="bus" className="w-4 h-4" /> },
  { label: "Speed Recorded", key: "speedRecorded", icon: <img src={speedIcon} alt="speed" className="w-4 h-4" /> },
  { label: "Duration Over Limit", key: "durationOverLimit", icon: <img src={timerIcon} alt="duration" className="w-4 h-4" /> }
];

// Table data matching the Speeding Alerts image
const speedingData = [
  { date: "01-06-2025", time: "08:42 AM", driverName: "R. Raja", busName: "Avadi", speedRecorded: 88, durationOverLimit: "2 min 30 sec" },
  { date: "02-06-2025", time: "05:18 AM", driverName: "M. Murugan", busName: "Ambattur", speedRecorded: 74, durationOverLimit: "1 min 10 sec" },
  { date: "03-06-2025", time: "05:18 AM", driverName: "C. Chandran", busName: "Adyar", speedRecorded: 80, durationOverLimit: "3 min" }
];


const data = [
  { name: "Avadi", latedays: 1 },
  { name: "Ambattur", latedays: 2 },
  { name: "Adyar", latedays: 3 },
  { name: "Anakaputhur", latedays: 4 },
  { name: "Chengelpet", latedays: 6 },
  { name: "ECR-1", latedays: 8 },
  { name: "ECR-2", latedays: 10 },
  { name: "Kalpakkam", latedays: 12 },
  { name: "Koyambedu", latedays: 14 },
  { name: "Medavakkam", latedays: 16 },
  { name: "Madipakkam-I", latedays: 17 },
  { name: "Madipakkam-II", latedays: 18 },
  { name: "Madhavaram", latedays: 20 },
  { name: "Padappai", latedays: 22 },
  { name: "Poonamallee", latedays: 24},
  { name: "Tambaram", latedays: 26 },
  { name: "Thiruvottiyur", latedays: 28 },
  { name: "West Mambalam", latedays: 30 },
  { name: "Velachery", latedays: 30 },
];





const Dashboard = () => {




  return (
    <div className="h-screen p-4">
      <div className="flex flex-col space-y-4  pb-4">
        {/* Top Header */}
       
    <div className="bg-white rounded-xl px-6 py-4 w-full flex items-center justify-between max-w-full mx-auto font-inter shadow-md">
    <h1 className="pl-0 sm:pl-32 md:pl-60 lg:pl-80 text-gray-600 font-semibold text-base sm:text-lg">
    KCG college of technology – <span className="font-bold">Transport Control Panel</span>
    </h1>
    <span className="pr-2 text-gray-500 text-sm sm:text-base">May 5, 2025</span>
    </div>




        {/* Main Content Wrapper (Map + Cards) */}
        




         <div className="w-full bg-white rounded-xl pt-4 relative">
  {/* Title Row */}
  <div className="flex items-center gap-2 mb-3">
   <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter'] pl-8 pr-2"> 
  Live Bus Positions
</h2>

    

    {/* Imported Bus Icon (replace with actual component) */}
    <img src={BusIcon} alt="busicon" className="w-[14px] h-[16px]"/>

    {/* Diamond Connector */}
  <div className="w-[6px] h-[6px] rotate-45 bg-zinc-300 rounded-[1px] shrink-0 ml-2" />

  {/* Horizontal Line that touches the diamond */}
  <div className="flex-grow h-px bg-gradient-to-r from-zinc-300 to-white" />
  </div>

  
  

  {/* Map or Content Placeholder */}
       <div className="h-[calc(100vh-200px)] bg-gray-100 flex items-center justify-center text-gray-400 rounded-b-xl shadow-md overflow-hidden">
    <Map />
  </div>
</div>


          {/* Summary Cards */}
        <div className="flex flex-wrap gap-4 items-start">
  {/* Card 1 - Active Buses */}
  <div className="bg-white border-l-4 border-emerald-500 rounded-xl shadow-md flex-1 p-4 flex flex-col gap-4">
    <div className="flex items-center gap-2">
      <img src={ActiveIcon} alt="bus icon" className="w-[20px] h-[20px] ml-2 mr-2" />
      <span className="text-gray-500 text-[16px] font-medium font-['Inter']">Active Buses</span>
    </div>
    <div className="h-px bg-gray-200" />
    <div className="flex items-start gap-3">
      <div className="text-black text-3xl font-medium font-['Inter'] ml-2">7</div>
    <div className="text-[#6B7280] text-[16px] font-normal font-['Inter'] leading-normal ml-2">Running <br/> smoothly</div>

    </div>
  </div>

  {/* Card 2 - Stuck Buses */}
  <div className="bg-white border-l-4 border-red-400 rounded-xl shadow-md  flex-1 p-4 flex flex-col gap-4">
    <div className="flex items-center gap-2">
      <img src={StuckIcon} alt="stuck icon" className="w-[20px] h-[20px] ml-2 mr-2" />
      <span className="text-gray-500 text-[16px] font-medium font-['Inter']">Stuck Buses</span>
    </div>
    <div className="h-px bg-gray-200" />
    <div className="flex items-start gap-3">
      <div className="text-black text-3xl font-medium font-['Inter'] ml-2">1</div>
      <div className="text-[#6B7280] text-[16px] font-normal font-['Inter'] leading-normal ml-2">halted or<br/> stuck</div>
    </div>
  </div>

  {/* Card 3 - Delays Detected */}
  <div className="bg-white border-l-4 border-yellow-400 rounded-xl shadow-md  flex-1 p-4 flex flex-col gap-4">
    <div className="flex items-center gap-2">
      <img src={DelayIcon} alt="delay icon" className="w-[14px] h-[16px] ml-2 mr-2" />
      <span className="text-gray-500 text-[16px] font-medium font-['Inter']">Delays Detected</span>
    </div>
    <div className="h-px bg-gray-200" />
    <div className="flex items-start gap-3">
      <div className="text-black text-3xl font-medium font-['Inter'] ml-2">1</div>
      <div className="text-[#6B7280] text-[16px] font-normal font-['Inter'] leading-normal ml-2">over 10<br/>  min late</div>
    </div>
  </div>

  {/* Vertical Divider */}
  <div className="h-[120px] w-px bg-gray-300 self-center" />

  {/* Card 4 - Reached College */}
  <div className="bg-white border-l-4 border-emerald-400 rounded-xl shadow-md  flex-1 p-4 flex flex-col gap-4">
    <div className="flex items-center gap-2">
      <img src={CheckIcon} alt="check icon" className="w-[14px] h-[16px] ml-2 mr-2" />
      <span className="text-gray-500 text-[16px] font-medium font-['Inter']">Reached College</span>
    </div>
    <div className="h-px bg-gray-200" />
    <div className="flex items-start gap-3">
      <div className="text-black text-3xl font-medium font-['Inter'] ml-2">10</div>
      <div className="text-[#6B7280] text-[16px] font-normal font-['Inter'] leading-normal ml-2">buses arrived<br/> at campus</div>
    </div>
  </div>
</div>








{/* tables*/}

<div className="p-6 pb-12 bg-white rounded-xl ">
      <Table title="Today entry logs"
        titleIcon={entrylogicon}
        columns={entrylogcolumns}
        data={entrylogdata} searchable/>
      
    </div>



{/*separator analytics */}
<div className="flex items-center gap-2">
  {/* Title */}
  <span className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter'] pl-6">
    Analytics
  </span>

  {/* Dot */}
  <span className="w-1.5 h-1.5 bg-black rounded-full"></span>

  {/* Subtitle */}
  <span className="text-gray-500 text-base sm:text-lg font-semibold font-['Inter']">
    This Month
  </span>
</div>

<div>
   <Barchart data={data} />
</div>


    {/* Pie Chart Placeholder */}
<div className="flex flex-col lg:flex-row gap-4">
  <div className="p-8 bg-white rounded-xl w-full lg:w-2/3">
    <div className="flex items-center gap-2 pl-6 pr-2">
      <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
       Punctuality pie chart
      </h2>
      
        <img
          src={piecharticon }
          alt="title icon"
          className="w-4 h-4 object-contain"
        />
      
    </div>
    <Piechart data={chartdata} />
  </div>

  <div className="flex flex-col gap-4 w-full lg:w-1/3">
    {/* Top Late Routes */}
    <div className="bg-white rounded-[10px] p-5 shadow-sm min-h-[320px] max-h-[300px] overflow-y-auto">
      <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter'] pt-4 pl-2">
        Top Late Routes
      </h2>
      <div className="mt-4 space-y-4">
        {lateRoutes.map((route, idx) => (
          <div key={idx}>
            <div className="flex items-center gap-3 px-4">
              <img src={BusIcon} alt="Bus" className="w-[14px] h-[16px]" />
              <span className="text-black text-lg">{route}</span>
            </div>
            {idx < lateRoutes.length - 1 && (
              <div className="border-t border-zinc-100 mt-3" />
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Insights */}
    <div className="bg-white rounded-[10px] p-5 shadow-sm text-center min-h-[200px]">
      <div className=" flex items-center justify-left pl-2 gap-2">
        
        <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
          
      Insights
    </h2>
    <img src={insightsIcon} alt="Insights" className="w-5 h-5" />
      </div>
      <p className="mt-8 text-gray-500 text-lg leading-relaxed tracking-tight">
        Most delays happen between{" "}<br></br>
        <span className="text-gray-800">8:40–9:00</span>.
      </p>
    </div>
  </div>
</div>

{/*separator previews */}
<div className="flex items-center gap-2">
  {/* Title */}
  <span className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter'] pl-6">
    Previews
  </span>

  {/* Dot */}
  <span className="w-1.5 h-1.5 bg-black rounded-full"></span>

  {/* Subtitle */}
  <span className="text-gray-500 text-base sm:text-lg font-semibold font-['Inter']">
    This Month
  </span>
</div>




{/* tables*/}

<div className="p-6 pb-8 bg-white rounded-xl">
      <Tablewithoutstatus title="Complaints preview"
    titleIcon={entrylogicon}
    columns={complaintsColumns}
    data={complaintsData}
    searchable// No search bar as per image
  />
      
    </div>


{/* tables*/}

<div className="p-6 pb-8 bg-white rounded-xl">
       <Tableoverflow
    title="Speeding Alerts"
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

export default Dashboard;
