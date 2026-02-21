import { useParams, useNavigate } from "react-router-dom";

import Table from "../../components/table/Tablewithoutfilter"
import entrylogicon from '../../assets/dashboard/entrylogs.png';

import bus from '../../assets/components/table/bus.png';
import driver from '../../assets/components/table/person.png';
import phone from '../../assets/components/table/phone.png';
import distance from '../../assets/components/table/distance.png';
import arrowleft from '../../assets/emergency/backarrow.png';

import { nearbyBusesData } from "./emergencyAssistData";



const entrylogcolumns = [
  { label: "Bus Name", key: "bus", icon: <img src={bus} alt="bus" className="w-4 h-4" /> },
  { label: "Driver Name", key: "driver", icon: <img src={driver} alt="driver" className="w-4 h-4" /> },
  { label: "Ph.Number", key: "phone", icon: <img src={phone} alt="phone" className="w-4 h-4" /> },
  { label: "Distance", key: "distance", icon: <img src={distance} alt="location" className="w-4 h-4" /> },
];





const EmergencyAssistDetails = () => {


    const { busName } = useParams<{ busName: string }>();
     const navigate = useNavigate();

    
  // ✅ fetch the respective bus's nearby data
  const entrylogdata = busName ? nearbyBusesData[busName] || [] : [];

  return (
    <div className="h-screen p-4">
      <div className="flex flex-col space-y-4 pb-4">



 {/*header*/}
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
    Emergency Assistance : {busName} 
  </h1>

  {/* spacer to balance flex for centering */}
  <div className="w-10" />
</div>



    {/* tables*/}

<div className="p-6 pb-12 bg-white rounded-xl  ">
      <Table title="Nearby Available Buses"
        titleIcon={entrylogicon}
        columns={entrylogcolumns}
        data={entrylogdata} searchable/>
      
    </div>


        </div>
        </div>

  );
}

export default EmergencyAssistDetails;
