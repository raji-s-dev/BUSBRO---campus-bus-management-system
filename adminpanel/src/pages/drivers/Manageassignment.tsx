import { useParams, useNavigate } from "react-router-dom";


import TextHeading from '../../components/heading/Textheading';

import DriverIcon from "../../assets/drivers/drivericon.png";
import arrowleft from '../../assets/emergency/backarrow.png';
import editicon from "../../assets/components/button/editiconblack.png";
import busicon from "../../assets/drivers/manageassignment/busiconblack.png";
import unassignicon from "../../assets/drivers/manageassignment/unassignicon.png";
import dismissicon from "../../assets/drivers/manageassignment/dismissicon.png";
import leaveicon from "../../assets/drivers/manageassignment/onleaveicon.png";
import rightarrow from "../../assets/drivers/manageassignment/rightarrowicon.png";

const Manageassignment: React.FC = () => {
  const { driverId } = useParams();  // will be used later for API
  const navigate = useNavigate();


  return (
    <div className="h-screen p-4">
      <div className="flex flex-col space-y-4 pb-4">
        {/* Header */}
        <div className="bg-white rounded-xl py-4 w-full font-inter shadow-md flex items-center">
          {/* Back Button */}
          <button className="ml-4 p-1 hover:bg-gray-100 rounded-full" onClick={() => navigate(`/DriverManagement/${driverId}`)}>
            <img src={arrowleft} alt="arrowleft" className="w-6 h-6 text-gray-600" />
          </button>

          {/* Title + Icon */}
          <div className="flex-1 flex justify-center items-center gap-3">
            <h1 className="text-gray-600 font-semibold text-base sm:text-lg">
              Profile : Dhanasekar K
            </h1>
            <img src={DriverIcon} alt="title icon" className="w-4 h-4 object-contain" />
          </div>

          {/* Spacer */}
          <div className="w-10" />
        </div>

        {/* Manage Assignment Card */}
        <div className="w-full bg-white rounded-2xl p-6 relative min-h-[calc(100vh-120px)] overflow-y-auto pr-2">
          <TextHeading title="Manage Assignment" logo={editicon} />

          <div className="mt-10 px-4">
            <div className="border-t border-gray-200">
              {[
                  { icon: busicon, text: "Assign to Another Bus", path: "assign" },
  { icon: unassignicon, text: "Mark as Unassigned", path: "unassign" },
  { icon: dismissicon, text: "Dismiss Driver", path: "dismiss" },
  { icon: leaveicon, text: "Mark as On Leave", path: "leave" },
              ].map((item, idx, arr) => (
                <button
                  key={idx}
                   onClick={() => navigate(`/drivers/${driverId}/manage/${item.path}`)}
    className={`w-full flex items-center justify-between py-4 px-2 cursor-pointer hover:bg-gray-50
      ${idx < arr.length - 1 ? "border-b border-gray-200" : ""}`}
  >
              
                  
                  <div className="flex items-center gap-3 text-gray-900 text-sm sm:text-lg font-medium">
                    <img src={item.icon} alt={item.text} className="w-4 h-4 object-contain" />
                    {item.text}
                  </div>
                  <img src={rightarrow} alt="right arrow" className="w-4 h-4 object-contain" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manageassignment;
