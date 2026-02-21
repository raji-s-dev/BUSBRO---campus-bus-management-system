import React from "react";
import MapComponent from "../../map/Routeviewer"; // updated map component
import BusIcon from "../../assets/components/busroute/routeicon.png";
import ActionButton from "../button/Button";
import editicon from "../../assets/components/button/editicon.png";



// Props for reusable component
interface Stop {
  coords: [number, number] | number[];
  name: string;
  arrivalTime?: string;
  rawStartTime?: string;
  etaMinutes?: number;
}

interface BusRouteProps {
  stops: Stop[];
  route: GeoJSON.FeatureCollection | any;
}


const BusRoute: React.FC<BusRouteProps> = ({ stops, route }) => {
  // Normalize coords to tuples
  const typedStops = stops.map((s) => ({
    ...s,
    coords: [s.coords[0], s.coords[1]] as [number, number],
  }));

  return (
    <div className="w-full max-h-[700px] bg-white rounded-[10px] relative flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
            Bus route specified
          </h2>
          <img src={BusIcon} alt="bus icon" className="w-5 h-5" />
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left: Map */}
        <div className="w-[700px] h-[calc(700px-120px)]">
          <MapComponent stops={typedStops} routeGeoJson={route} />
        </div>

        {/* Right: Stops list */}
        <div className="flex-1 px-6 py-6 overflow-y-auto max-h-[calc(700px-120px)]">
          <div className="flex flex-col relative">
            {typedStops.map((stop, idx) => (
              <div key={idx} className="flex items-center mb-8 relative">
                {idx !== typedStops.length - 1 && (
                  <div className="absolute left-[6px] top-5 w-[2px] h-[56px] bg-gray-300"></div>
                )}
                <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 bg-white mr-4 z-10"></div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-black text-[16px]">{stop.name}</span>
                  <span className="text-gray-500 text-[15px]">
                    {stop.arrivalTime}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div className="absolute bottom-6 left-[480px]">
        <ActionButton
          iconSrc={editicon}
          iconAlt="Edit Icon"
          label="Edit Route"
          onClick={() => alert("Edit Details")}
        />
      </div>
    </div>
  );
};

export default BusRoute;
