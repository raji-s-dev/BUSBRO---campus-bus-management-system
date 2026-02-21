// Assignment.tsx
import { useParams, useNavigate } from "react-router-dom";

import Button from '../../components/button/Button';

import BusIcon from '../../assets/dashboard/bus-icon.png';
import historyicon from '../../assets/components/assignment/history.png';
import editicon from "../../assets/components/button/editicon.png";
import arrow from '../../assets/components/assignment/arrow.png';
import calendar  from '../../assets/components/assignment/calendar.png';

interface AssignmentProps {
  driverName: string;
  currentBus: {
    name: string;
    id: string;
    assignedSince: string;
  };
  assignments: {
    name: string;
    from: string;
    to: string;
  }[];
}

const Assignment = ({ driverName, currentBus, assignments }: AssignmentProps) => {

  const { driverId } = useParams();   // for navigation
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter'] pl-6">
          Assignment Management
        </span>
        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
        <span className="text-gray-500 text-base sm:text-lg font-semibold font-['Inter']">
          {driverName}
        </span>
      </div>

      {/* Assignment Management */}
      <div className="flex flex-col lg:flex-row gap-4 mt-4">
        <div className="p-8 bg-white rounded-xl w-full lg:w-2/3">
          <div className="flex items-center gap-2 pl-6 pr-2">
            <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
              Current Assignment
            </h2>
            <img src={BusIcon} alt="title icon" className="w-4 h-4 object-contain" />
          </div>

          <div className="mt-12 grid grid-cols-[200px_1fr] gap-y-4 text-[18px] font-inter pl-6 ">
            <p className="text-gray-900">Current Bus</p>
            <p className="text-gray-900 font-medium">: {currentBus.name}</p>

            <p className="text-gray-900">Bus ID</p>
            <p className="text-gray-900 font-medium">: {currentBus.id}</p>

            <p className="text-gray-900">Assigned Since</p>
            <p className="text-gray-900 font-medium">: {currentBus.assignedSince}</p>
          </div>

          <div className="my-8 pl-6">
            <Button
              iconSrc={editicon}
              iconAlt="edit Icon"
              label="Manage Assignment"
              onClick={() => navigate(`/drivers/${driverId}/manage`)}
            />
          </div>
        </div>

        {/* Assignment History */}
        <div className="flex flex-col gap-4 w-full lg:w-1/3">
          <div className="bg-white rounded-[10px] p-5 shadow-sm min-h-[360px] max-h-[360px] overflow-y-auto">
            <div className="flex items-center gap-3 pl-6 pr-2">
              <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
                Assignment History
              </h2>
              <img src={historyicon} alt="title icon" className="w-4 h-4 object-contain" />
            </div>

            <div className="mt-8 pl-4">
              <div className="space-y-4 overflow-y-auto">
                {assignments.map((item, index) => (
                  <div key={index} className="space-y-4">
                    <div className="flex items-center gap-3 px-4">
                      <img src={BusIcon} alt="Bus" className="w-[14px] h-[16px]" />
                      <p className="text-[#000] text-[16px] font-normal leading-none font-[Inter]">
                        {item.name}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 px-4">
                      <img src={calendar} alt="Calendar" className="w-[14px] h-[16px]" />
                      <span className="text-black text-lg">{item.from}</span>
                      <img src={arrow} alt="Arrow" className="w-[10px] h-[10px]" />
                      <span className="text-black text-lg">{item.to}</span>
                    </div>

                    <div className="border-t border-zinc-100 mt-3" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;
