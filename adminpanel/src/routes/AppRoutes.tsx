// src/routes/AppRoutes.tsx
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/Loginpage';
import Layout from "../layout/Layout";

import Dashboard from '../pages/dashboard/Dashboard';
import EntryLogs from '../pages/entrylogs/EntryLogs';
import Driverattendance from '../pages/Driverattendancee/Driverattendance';
import BusManagement from '../pages/busmanagement/BusManagement';
import Buscomponent from '../pages/busmanagement/Buscomponent';
import DriverManagement from '../pages/drivers/DriverManagement';
import Drivercomponent from '../pages/drivers/Drivercomponent';
import Studentmanagemnet from '../pages/studentmanagement/Studentmanagent';
import Studentcomponent from '../pages/studentmanagement/Studentcomponent';
import Studentlist from '../pages/studentmanagement/Studentlist';
import Feedback from '../pages/feedback/Feedback';
import Emergency from '../pages/emergency/EmergencyAssist';
import EmergencyAssistDetails from "../pages/emergency/EmergencyAssistDetails";



import Manageassignment from '../pages/drivers/Manageassignment';
import Assign from '../pages/drivers/manageassignment/Assign';
import Unassign from '../pages/drivers/manageassignment/Unassign';
import Dismiss from '../pages/drivers/manageassignment/Dismiss';
import Onleave from '../pages/drivers/manageassignment/Onleave';


export default function AppRoutes() {
  return (
    <Routes>
      {/* Public route: Login page */}
      <Route path="/" element={<LoginPage />} />

      {/* Protected layout */}
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="entry-logs" element={<EntryLogs />} />
        <Route path="bus-management" element={<BusManagement />} />
        <Route path="driverattendance" element={<Driverattendance />} />
        <Route path="studentmanagement" element={<Studentmanagemnet />} />
        <Route path="DriverManagement" element={<DriverManagement />} />
        <Route path="feedbacks" element={<Feedback />} />
        <Route path="emergency" element={<Emergency />} />
       
        <Route path="/studentlist/:busId" element={<Studentlist />} />
        <Route path="studentcomponent" element={<Studentcomponent />} />
        
        

        {/* Dynamic route for Emergency Assist Details */}
        <Route path="emergency-assist/:busName" element={<EmergencyAssistDetails />} />
        <Route path="bus-management/:busId" element={<Buscomponent />} />


        <Route path="DriverManagement/:driverId" element={<Drivercomponent />} />
        <Route path="/drivers/:driverId/manage" element={<Manageassignment />} />
        <Route path="/drivers/:driverId/manage/assign" element={<Assign />} />
        <Route path="/drivers/:driverId/manage/unassign" element={<Unassign />} />
        <Route path="/drivers/:driverId/manage/dismiss" element={<Dismiss />} />
        <Route path="/drivers/:driverId/manage/leave" element={<Onleave />} />
        {/* Optional redirect from "/" to "/dashboard" */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Route>
    </Routes>
  );
}
