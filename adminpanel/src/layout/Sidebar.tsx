import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/sidebar/logo.png";

import dashboardCol from "../assets/sidebar/dashboard-colored.png";
import dashboardGrey from "../assets/sidebar/dashboard-grey.png";
import entryCol from "../assets/sidebar/entrylogs-coloured.png";
import entryGrey from "../assets/sidebar/entrylogs-grey.png";
import busCol from "../assets/sidebar/busmanagement-colored.png";
import busGrey from "../assets/sidebar/bus-grey.png";
import driverCol from "../assets/drivers/drivericon.png";
import driverGrey from "../assets/sidebar/driver-grey.png";
import studentcol from '../assets/sidebar/student-coloured.png';
import studentgrey from '../assets/sidebar/student-grey.png';
import feedbackCol from "../assets/sidebar/feedbacks-colored.png";
import feedbackGrey from "../assets/sidebar/feedbacks-grey.png";
import emergencyCol from "../assets/sidebar/emergency-colored.png";
import emergencyGrey from "../assets/sidebar/emergency-grey.png";

import { Settings, LogOut } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      iconActive: dashboardCol,
      iconInactive: dashboardGrey,
    },
    {
      name: "Bus Entry Logs",
      path: "/entry-logs",
      iconActive: entryCol,
      iconInactive: entryGrey,
    },
   
    {
      name: "Bus Management",
      path: "/bus-management",
      iconActive: busCol,
      iconInactive: busGrey,
    },
    {
      name: "Driver Management",
      path: "/DriverManagement",
      iconActive: driverCol,
      iconInactive: driverGrey,
    },
    {
      name: "Driver Attendance",
      path: "/driverattendance",
      iconActive: entryCol,
      iconInactive: entryGrey,
    },
    {
      name: "StudentManagement",
      path: "/studentmanagement",
      iconActive: studentcol,
      iconInactive: studentgrey,
    },
     
    {
      name: "Complaints",
      path: "/feedbacks",
      iconActive: feedbackCol,
      iconInactive: feedbackGrey,
    },
    {
      name: "Emergency Assist",
      path: "/emergency",
      iconActive: emergencyCol,
      iconInactive: emergencyGrey,
    },
   
   
     
   
    
  ];

  return (
    <aside className="w-68 h-screen bg-white px-8 shadow-md flex flex-col rounded-tl-[30px] rounded-bl-[30px] pt-8 pb-12 ">

      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex justify-center mt-6 mb-12">
          <img src={logo} alt="BusBro" className="h-16 w-auto" />
        </div>

        {/* Menu Title */}
        <div className="text-center text-gray-400 text-xs font-semibold tracking-widest mb-4 ">
          MAIN MENU
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1.5 pt-8 max-h-[400px] ">
          {navItems.map(({ name, path, iconActive, iconInactive }) => {
            const isActive = location.pathname === path;
            return (
        <NavLink
  key={name}
  to={path}
  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors antialiased
    ${isActive ? "bg-[#F1F5FF] text-[#111827]" : "text-[#6B7280] hover:bg-[#F1F5FF]"}
    font-inter text-[18px] font-medium tracking-tightest 
  `}
>
                <img
                  src={isActive ? iconActive : iconInactive}
                  alt={`${name} icon`}
                  className="w-[14px] h-[14px]"
                  
                />
                <span className="text-sm">{name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
     <div className="flex flex-col gap-4 px-4 pb-2 mt-auto mb-4">
        <button className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors">
          <Settings size={16} /> <span className="text-sm">Settings</span>
        </button>
        <button className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors">
          <LogOut size={16} /> <span className="text-sm">Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
