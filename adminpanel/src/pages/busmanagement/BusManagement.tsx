import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BaseCard from "../../components/basecard/Basecard.tsx";



import rightArrowIcon from "../../assets/bus/rightarrowblack.svg";
import busIcon from "../../assets/bus/bus-icon.png";  

import ActiveBadge from "../../components/statusbadges/ActiveBadge.tsx";
import MaintenanceBadge from "../../components/statusbadges/MaintenanceBadge.tsx";
import OutOfServiceBadge from "../../components/statusbadges/OutOfServiceBadge.tsx";
import SearchIcon from "../../assets/bus/searchicon.png";

// Helper to map backend status string -> Badge component
const renderStatus = (status: string) => {
  switch (status) {
    case "active":
      return <ActiveBadge />;
    case "maintenance":
      return <MaintenanceBadge />;
    case "out_of_service":
      return <OutOfServiceBadge />;
    default:
      return null;
  }
};

const BusManagement = () => {

   const navigate = useNavigate();


    const handleBusClick = (busId: string) => {
  navigate(`/bus-management/${busId}`);
};


  const [search, setSearch] = useState("");
  const [buses, setBuses] = useState<
    { id:  string; name: string; status: string }[]
  >([]);

  useEffect(() => {
  const fetchBuses = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/buses");
      const data = await res.json();
      setBuses(data);
    } catch (err) {
      console.error("Failed to fetch buses", err);
    }
  };
  fetchBuses();
}, []);


  const filteredBuses = buses.filter((bus) =>
    bus.name.toLowerCase().includes(search.toLowerCase())
  );

  

  return (
    <div className="h-screen p-4">
      <div className="flex flex-col space-y-4 pb-4">
        {/* Header */}
        <div className="bg-white rounded-xl py-4 w-full text-center font-inter shadow-md">
          <h1 className="text-gray-600 font-semibold text-base sm:text-lg">
            Bus Management
          </h1>
        </div>

        {/* Main Content Wrapper */}
        <div className="bg-white rounded-[10px] pt-6 px-6 w-full">
          <div className="mb-4 flex justify-between items-center">
            {/* Title */}
            <div className="flex items-center gap-2 pl-6 pr-2">
              <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
                All Registered Buses
              </h2>
              <img
                src={busIcon}
                alt="title icon"
                className="w-4 h-4 object-contain"
              />
            </div>

            {/* Search Bar */}
            <div className="relative w-64 h-11 mb-4">
              <div className="absolute inset-0 bg-stone-50 rounded-[10px]" />
              <img
                src={SearchIcon}
                alt="Search"
                className="absolute left-[18.84px] top-[6.11px] w-5 h-8 object-contain"
              />
              <input
                type="text"
                placeholder="Search by Bus Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="absolute left-[49.54px] top-[8px] w-[calc(100%-60px)] h-7 bg-transparent 
                          text-zinc-700/60 text-base font-normal font-['Inter'] leading-snug 
                          focus:outline-none"
              />
            </div>
          </div>

          {/* Bus List */}
          <div className="flex flex-col gap-2 pb-6">
            {filteredBuses.length > 0 ? (
              filteredBuses.map((bus) => (
                <BaseCard
                  key={bus.id}
                  icon={
                    <img
                      src={busIcon}
                      alt="Bus"
                      className="w-4 h-4 object-contain"
                    />
                  }
                  title={bus.name}
                  status={renderStatus(bus.status)}
                  action={
                    <img
                      src={rightArrowIcon}
                      alt="Right Arrow"
                      className="w-4 h-4 cursor-pointer mr-4"
                      onClick={() => handleBusClick(bus.id)}
                    />
                  }
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-6">
      <div className="flex items-center gap-2">
        <img
          src={busIcon}
          alt="title icon"
          className="w-5 h-5 object-contain"
        />
        <h2 className="text-base sm:text-lg text-gray-600 font-semibold font-['Inter']">
          No buses found
        </h2>
      </div>
    </div>


            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusManagement;
    