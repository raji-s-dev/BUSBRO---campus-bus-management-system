import { useMemo, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BaseCard from "../../components/basecard/Basecard.tsx";
import DriverIcon from "../../assets/drivers/drivericon.png";
import Assigned from "../../components/statusbadges/AssignedBadge.tsx";
import UnAssigned from "../../components/statusbadges/UnAssignedBadge.tsx";
import FormerDriver from "../../components/statusbadges/FormerDriverBadge.tsx";
import OnLeaveBadge from "../../components/statusbadges/OnLeaveBadge.tsx";
import Suspended from "../../components/statusbadges/SuspendedBadge.tsx";
import ViewProfileButton from "../../components/button/ViewProfileButton.tsx";
import Button from '../../components/button/Button.tsx';
import SearchIcon from "../../assets/bus/searchicon.png";
import addprofile from '../../assets/drivers/addprofile.png';

type DriverStatus = "Assigned" | "UnAssigned" | "OnLeave" | "Suspended" | "FormerDriver";
type Driver = { id: string; name: string; status: DriverStatus };

const DriverManagement = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [drivers, setDrivers] = useState<Driver[]>([]);

  const sectionRefs = {
    Total: useRef<HTMLDivElement>(null),
    Assigned: useRef<HTMLDivElement>(null),
    UnAssigned: useRef<HTMLDivElement>(null),
    OnLeave: useRef<HTMLDivElement>(null),
    Suspended: useRef<HTMLDivElement>(null),
    FormerDriver: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (status: keyof typeof sectionRefs) => {
    sectionRefs[status]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch drivers from backend
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/drivers");
        const data: Driver[] = await res.json();
        setDrivers(data);
      } catch (err) {
        console.error("Failed to fetch drivers", err);
      }
    };
    fetchDrivers();
  }, []);

  const getStatusBadge = (status: DriverStatus) => {
    switch (status) {
      case "Assigned": return <Assigned />;
      case "UnAssigned": return <UnAssigned />;
      case "OnLeave": return <OnLeaveBadge />;
      case "Suspended": return <Suspended />;
      case "FormerDriver": return <FormerDriver />;
      default: return null;
    }
  };

  const counts = useMemo(() => {
    const base = { total: drivers.length, Assigned: 0, UnAssigned: 0, OnLeave: 0, Suspended: 0, FormerDriver: 0 };
    drivers.forEach(d => { (base as any)[d.status]++; });
    return base as typeof base;
  }, [drivers]);

  const filteredDrivers = drivers.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const groupedDrivers = useMemo(() => {
    const groups: Record<DriverStatus, Driver[]> = {
      Assigned: [],
      UnAssigned: [],
      OnLeave: [],
      Suspended: [],
      FormerDriver: [],
    };
    filteredDrivers.forEach(d => groups[d.status].push(d));
    return groups;
  }, [filteredDrivers]);

  return (
    <div className="h-screen p-4">
      <div className="flex flex-col space-y-4">
        {/* Header */}
        <div className="bg-white rounded-xl py-4 w-full text-center font-inter shadow-md">
          <h1 className="text-gray-600 font-semibold text-base sm:text-lg">
            Driver Management
          </h1>
        </div>

        {/* Main Content Wrapper */}
        <div className="bg-white rounded-[10px] pt-6 px-6 w-full">
          {/* === Title + Search (row 1) AND Summary Card (row 2) === */}
          <div className="mb-4 flex flex-col gap-4">
            {/* row 1: title + search */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 pl-6 pr-2">
                <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
                  Driver Profiles
                </h2>
                <img
                  src={DriverIcon}
                  alt="title icon"
                  className="w-4 h-4 object-contain"
                />
              </div>

              
               <Button
        iconSrc={addprofile}
        iconAlt="Add Profile"
        label="Add Profile"
        onClick={() => alert("Exporting...")}
      />
            </div>


<div className="mt-2 flex flex-row items-center justify-between">
            {/* row 2: Summary card */}
            <div className="inline-flex items-center bg-stone-50 rounded-lg border border-gray-200 px-4 py-2 gap-6 max-w-[900px] overflow-x-auto">
    <button
    onClick={() => scrollToSection("Total")}
    className="text-gray-900 text-base font-normal font-['Inter'] hover:underline"
  >
    Total: {counts.total}
  </button>
  <div className="hidden sm:block w-px h-6 bg-black/10" />
  <button
    onClick={() => scrollToSection("Assigned")}
    className="text-gray-900 text-base font-normal font-['Inter'] hover:underline"
  >
    Assigned: {counts.Assigned}
  </button>
  <div className="hidden sm:block w-px h-6 bg-black/10" />
  <button
    onClick={() => scrollToSection("UnAssigned")}
    className="text-gray-900 text-base font-normal font-['Inter'] hover:underline"
  >
    UnAssigned: {counts.UnAssigned}
  </button>
  <div className="hidden sm:block w-px h-6 bg-black/10" />
  <button
    onClick={() => scrollToSection("OnLeave")}
    className="text-gray-900 text-base font-normal font-['Inter'] hover:underline"
  >
    On Leave: {counts.OnLeave}
  </button>
  <div className="hidden sm:block w-px h-6 bg-black/10" />
  <button
    onClick={() => scrollToSection("Suspended")}
    className="text-gray-900 text-base font-normal font-['Inter'] hover:underline"
  >
    Suspended: {counts.Suspended}
  </button>
  <div className="hidden sm:block w-px h-6 bg-black/10" />
  <button
    onClick={() => scrollToSection("FormerDriver")}
    className="text-gray-900 text-base font-normal font-['Inter'] hover:underline"
  >
    Former Driver: {counts.FormerDriver}
  </button>
</div>

            {/* Search Bar */}
              <div className="relative w-64 h-11">
                <div className="absolute inset-0 bg-stone-50 rounded-[10px]" />
                <img
                  src={SearchIcon}
                  alt="Search"
                  className="absolute left-[18.84px] top-[6.11px] w-5 h-8 object-contain"
                />
                <input
                  type="text"
                  placeholder="Search by Driver Name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="absolute left-[49.54px] top-[8px] w-[calc(100%-60px)] h-7 bg-transparent 
                            text-zinc-700/60 text-base font-normal font-['Inter'] leading-snug 
                            focus:outline-none"
                />
              </div>
              </div>
          </div>

          {/* Driver Groups */}
          <div className="flex flex-col gap-6 pb-6 mt-8">
            {(
              Object.entries(groupedDrivers) as Array<[DriverStatus, Driver[]]>
            ).map(([status, list]) =>
              list.length > 0 ? (
                <div key={status} ref={sectionRefs[status as DriverStatus]}>
                  <h2 className="text-base sm:text-md text-gray-800 font-semibold font-['Inter'] mb-4 ml-6">
                    {status}
                  </h2>
                  <div className="flex flex-col gap-2">
                    {list.map((driver, idx) => (
                      <BaseCard
                        key={idx}
                        icon={<img src={DriverIcon} alt="Driver" className="w-4 h-4" />}
                        title={driver.name}
                        status={getStatusBadge(driver.status)}
                        action={
      <ViewProfileButton onClick={() => navigate(`/DriverManagement/${driver.id}`)} />
    }
                      />
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverManagement;
