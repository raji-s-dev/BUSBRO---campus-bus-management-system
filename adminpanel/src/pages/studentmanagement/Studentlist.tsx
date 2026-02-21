import { useMemo, useState, useRef } from "react";
import {  useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import BaseCard from "../../components/basecard/Basecard.tsx";

import StudentIcon from "../../assets/studentdetials/studenticon.png";
import Fullypaid from "../../components/statusbadges/Fullypaid.tsx";
import Feepending from "../../components/statusbadges/Feepending.tsx";
import ViewProfileButton from "../../components/button/ViewProfileButton.tsx";
import Button from "../../components/button/Button.tsx";

import SearchIcon from "../../assets/bus/searchicon.png";
import addprofile from "../../assets/drivers/addprofile.png";
import arrowleft from '../../assets/emergency/backarrow.png';

// ---------- Types ----------
type FeeStatus = "Fullypaid" | "Feepending";
type Student = { name: string; status: FeeStatus };

// ---------- Component ----------
const DriverManagement = () => {
  const { busId } = useParams<{ busId: string }>();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [students, setStudents] = useState<Student[]>([]);
   const [busName, setBusName] = useState("");



  useEffect(() => {
    if (!busId) return;

    const fetchStudents = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/students/${busId}`);
        const data = await res.json();

        setBusName(data.busdetail?.busname || busId.toUpperCase());
        setStudents(data.studentlist || []);
      } catch (err) {
        console.error("Error fetching student list:", err);
      }
    };

    fetchStudents();
  }, [busId]);


  // refs for each section
  const sectionRefs = {
    Fullypaid: useRef<HTMLDivElement>(null),
    Feepending: useRef<HTMLDivElement>(null),
  };

  const scrollToSection = (status: keyof typeof sectionRefs) => {
    sectionRefs[status]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // ---------- Data ----------
  

  const getStatusBadge = (status: FeeStatus) =>
    status === "Fullypaid" ? <Fullypaid /> : <Feepending />;

  // ---------- Filter ----------
  const filtered = useMemo(
    () =>
      students.filter((s) =>
        s.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, students]
  );

  // ---------- Counts ----------
  const counts = useMemo(() => {
    const fully = filtered.filter((s) => s.status === "Fullypaid").length;
    const pending = filtered.filter((s) => s.status === "Feepending").length;
    return {
      total: filtered.length,
      fullyPaid: fully,
      feePending: pending,
    };
  }, [filtered]);

  // ---------- Grouped data ----------
  const grouped = useMemo(() => {
    return {
      Fullypaid: filtered.filter((s) => s.status === "Fullypaid"),
      Feepending: filtered.filter((s) => s.status === "Feepending"),
    };
  }, [filtered]);

  return (
     <div className="h-screen p-4">
      <div className="flex flex-col space-y-4 pb-4">
      
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
      {busName} : Student Profiles
  </h1>

  {/* spacer to balance flex for centering */}
  <div className="w-10" />
</div>

        {/* Main Content */}
        <div className="bg-white rounded-[10px] pt-6 px-6 w-full">
          {/* === Title + Search + Summary === */}
          <div className="mb-4 flex flex-col gap-4">
            {/* Title + Add button */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 pl-6 pr-2">
                <h2 className="text-base sm:text-lg text-gray-800 font-semibold font-['Inter']">
                  Student Profiles
                </h2>
                <img
                  src={StudentIcon}
                  alt="title icon"
                  className="w-4 h-4 object-contain"
                />
              </div>

              <Button
                iconSrc={addprofile}
                iconAlt="Add Profile"
                label="Add Profile"
                onClick={() => alert("Add profile")}
              />
            </div>

            {/* Summary + Search row */}
            <div className="mt-2 flex flex-row items-center justify-between">
              {/* Summary card */}
              <div className="inline-flex items-center bg-stone-50 rounded-lg border border-gray-200 px-4 py-2 gap-6 max-w-[900px] overflow-x-auto">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="text-gray-900 text-base font-normal hover:underline"
                >
                  Total: {counts.total}
                </button>
                <div className="hidden sm:block w-px h-6 bg-black/10" />
                <button
                  onClick={() => scrollToSection("Fullypaid")}
                  className="text-gray-900 text-base font-normal hover:underline"
                >
                  Fully Paid: {counts.fullyPaid}
                </button>
                <div className="hidden sm:block w-px h-6 bg-black/10" />
                <button
                  onClick={() => scrollToSection("Feepending")}
                  className="text-gray-900 text-base font-normal hover:underline"
                >
                  Fee Pending: {counts.feePending}
                </button>
              </div>

              {/* Search */}
              <div className="relative w-64 h-11">
                <div className="absolute inset-0 bg-stone-50 rounded-[10px]" />
                <img
                  src={SearchIcon}
                  alt="Search"
                  className="absolute left-[18px] top-[6px] w-5 h-8 object-contain"
                />
                <input
                  type="text"
                  placeholder="Search by Student Name"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="absolute left-[48px] top-[8px] w-[calc(100%-60px)] h-7 bg-transparent text-zinc-700/60 text-base focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* === Lists by status === */}
          <div className="flex flex-col gap-6 pb-6 mt-8">
            {(["Fullypaid", "Feepending"] as FeeStatus[]).map(
              (status) =>
                grouped[status].length > 0 && (
                  <div key={status} ref={sectionRefs[status]}>
                    <h2 className="text-base sm:text-md text-gray-800 font-semibold mb-4 ml-6">
                      {status === "Fullypaid" ? "Fully Paid" : "Fee Pending"}
                    </h2>
                    <div className="flex flex-col gap-2">
                      {grouped[status].map((student, idx) => (
                        <BaseCard
                          key={idx}
                          icon={
                            <img
                              src={StudentIcon}
                              alt="Student"
                              className="w-4 h-4"
                            />
                          }
                          title={student.name}
                          status={getStatusBadge(student.status)}
                          action={<ViewProfileButton onClick={() => navigate("/studentcomponent")} />}
                        />
                      ))}
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverManagement;
