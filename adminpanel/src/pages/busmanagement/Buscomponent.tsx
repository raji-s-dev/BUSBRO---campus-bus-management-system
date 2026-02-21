import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


import TextHeading from '../../components/heading/Textheading';
import PageHeading from '../../components/heading/Pageheading';

import BusInformation from '../../components/information/Businformation';
import Busroute from '../../components/busroute/Busroute';


import DriverAssigned from '../../components/driverassigned/Driverassigned';
import BusEntryLog from '../../components/busentrylog/BusEntrylog';


import Linechartarrival from '../../components/linechart/Linechartarrival';

import MYselector from '../../components/dateselector/MYselector';

import Piechart from "../../components/piechart/Piechartbus";

import piecharticon from '../../assets/components/piechart/piechart.png';

import Insights from "../../components/insights/Insights";


import linegraph from '../../assets/components/linechart/graph.png';









const Buscomponent: React.FC = () => {


 const { busId } = useParams(); // e.g., BUS-001

  const [busData, setBusData] = useState<any | null>(null);
  const [driverData, setDriverData] = useState<any | null>(null);
  const [routeData, setRouteData] = useState<any | null>(null);


useEffect(() => {
  if (!busId) return;
  const fetchBusDetails = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/buses/${busId}`);
      const data = await res.json();

      // ✅ Store correctly
      setBusData(data.busData);

      setDriverData(data.driverData);

      setRouteData(data.routeData);
    } catch (err) {
      console.error("Error fetching bus details:", err);
    }
  };
  fetchBusDetails();
}, [busId]);



  // ✅ Entry Log State
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState({
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  });
  const [entryLogData, setEntryLogData] = useState<any[]>([]);

  useEffect(() => {
    if (!busId) return;
    if (selectedDate.month && selectedDate.year) {
      fetch(
        `http://localhost:5000/api/buses/${busId}/entrylogs?month=${selectedDate.month}&year=${selectedDate.year}`
      )
        .then((res) => res.json())
        .then((data) => setEntryLogData(data));
    }
  }, [busId, selectedDate]);

  // ✅ Arrival Timeline
  const [selectedChartDate, setSelectedChartDate] = useState({
    month: today.getMonth() + 1,
    year: today.getFullYear(),
  });
  const [arrivalTimes, setArrivalTimes] = useState<(number | null)[]>([]);

  useEffect(() => {
    if (!busId) return;
    if (selectedChartDate.month && selectedChartDate.year) {
      fetch(
        `http://localhost:5000/api/buses/${busId}/arrivaltimeline?month=${selectedChartDate.month}&year=${selectedChartDate.year}`
      )
        .then((res) => res.json())
        .then((data) => setArrivalTimes(data));
    }
  }, [busId, selectedChartDate]);

  // ✅ Pie Chart
  const [pieData, setPieData] = useState<any[]>([]);
  useEffect(() => {
    if (!busId) return;
    if (selectedDate.month && selectedDate.year) {
      fetch(
        `http://localhost:5000/api/buses/${busId}/pie?month=${selectedDate.month}&year=${selectedDate.year}`
      )
        .then((res) => res.json())
        .then((data) => setPieData(data));
    }
  }, [busId, selectedDate]);

  if (!busData) {
    return <div className="p-4">Loading bus details...</div>;
  }

  
  return (
    <div className="h-screen p-4">
      <div className="flex flex-col space-y-4  pb-4">
      

        {/* header */}
      <PageHeading title={busData.busName} />




 <BusInformation
      {...busData}  // 🔹 Spread operator passes all props
      onEdit={() => alert("Edit clicked")}
      onExportExcel={() => alert("Excel Export")}
      onExportPDF={() => alert("PDF Export")}
    />

    
<div>
  <div>
  {routeData && (
    <Busroute
      stops={routeData.stops}
      route={routeData.route}
    />
  )}
</div>

</div>



<DriverAssigned
      {...driverData}
      onMoreDetails={() => console.log("More details clicked")}
    />


<div>
   <BusEntryLog
      entrylogdata={entryLogData}
      selectedDate={selectedDate}
      onDateChange={(field, value) =>
            setSelectedDate((prev) => ({ ...prev, [field]: value }))
          }
      onExportExcel={(data) => console.log("Export Excel:", data)}
      onExportPDF={(data) => console.log("Export PDF:", data)}
    />
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
    West Mambalam Bus 
  </span>
</div>


<div className="p-6 pb-12 bg-white rounded-xl h-max-800px">
  <div className="flex items-center justify-between  pb-4">
    <TextHeading title="Arrival Time Line Graph" logo={linegraph} />
   
          <MYselector
  month={selectedChartDate.month}
  year={selectedChartDate.year}
   onChange={(field, value) =>
                setSelectedChartDate((prev) => ({ ...prev, [field]: value }))
              }
/>



          </div>
  <Linechartarrival
        title="Arrival Time vs Day"
        label="Arrival Time"
        dataPoints={arrivalTimes}
        target={8.5} // 08:30
      />

</div>


<div className="flex flex-col lg:flex-row gap-4">
  {/* Left Side - Pie Chart */}
  <div className="p-6 bg-white rounded-xl w-full lg:w-2/3">
    <div className="flex justify-between items-center mb-4">
      
    <TextHeading title="Punctuality pie chart" logo={piecharticon } />
      {/* Month & Year Dropdown */}
    <MYselector
         month={selectedDate.month}
        year={selectedDate.year}
        onChange={(field, value) =>
                  setSelectedDate((prev) => ({ ...prev, [field]: value }))
                }
      />
    </div>

    {/* Chart Component */}
    <Piechart data={pieData} />

    
  </div>

  {/* Right Side - Insights */}
  <div className="p-6 bg-white rounded-xl w-full lg:w-1/3">
  <Insights
  arrivalTimes={arrivalTimes}
  month={selectedChartDate.month}
  year={selectedChartDate.year}
/>

  </div>
</div>



    </div>
   </div>
  );
};

export default Buscomponent;
