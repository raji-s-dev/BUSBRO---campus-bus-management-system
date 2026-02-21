import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BaseCard from '../../components/basecard/Basecard.tsx';

import busIcon from '../../assets/bus/bus-icon.png';

import ActiveBadge from "../../components/statusbadges/ActiveBadge.tsx";
import EmergencyAssistButton from "../../components/button/EmergencyAssistButton.tsx";
import SearchIcon from "../../assets/bus/searchicon.png";
import { buses } from "./emergencyAssistData.ts";




const EmergencyAssist = () => {

  const [search, setSearch] = useState("");
  const navigate = useNavigate();


   

  const filteredBuses = buses.filter((bus) =>
    bus.name.toLowerCase().includes(search.toLowerCase())
  );



  return (
    <div className="h-screen p-4">
      <div className="flex flex-col space-y-4">
      
      

      {/*header*/}

       <div className="bg-white rounded-xl py-4 w-full text-center font-inter shadow-md">
    <h1 className="text-gray-600 font-semibold text-base sm:text-lg">
    Emergency Assist
    </h1>
    </div>

    {/* Main Content Wrapper */}
    <div className="bg-white rounded-[10px] pt-6 px-6 w-full">
  <div className="mb-4 flex justify-between items-center">
      <div className="flex items-center gap-2 pl-6 pr-2">
      <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
        All Active Buses
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
        {filteredBuses.map((bus, index) => (
          <BaseCard
            key={index}
            icon={<img src={busIcon} alt="Bus" className="w-4 h-4 object-contain" />}
            title={bus.name}
            status={<ActiveBadge />}
             action={
                <EmergencyAssistButton
                onClick={() => navigate(`/emergency-assist/${bus.name}`)}
                />
                }
          />
        ))}
      </div>
    </div>



    </div>
   </div>
  );
};

export default EmergencyAssist;
