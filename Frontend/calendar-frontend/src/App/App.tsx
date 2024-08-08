import useViewModel from "./useViewModel";
import Sidebar from "components/Sidebar/Sidebar";
import Navbar from "components/Navbar/Navbar";
import MainCalendarDay from "components/MainCalendar/MainCalendarDay";
import MainCalendarWeek from "components/MainCalendar/MainCalendarWeek";
import AppointmentModal from "components/AppointmentModal/AppointmentModal";
import CreateAppointmentModal from "components/CreateAppointmentModal/CreateAppointmentModal";
import ContextMenu from "components/ContextMenu/ContextMenu";
import DeleteAppointmentModal from "components/DeleteAppointmentModal/DeleteAppointmentModal";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const { theme } = useViewModel();

  return (
    <>
      <div className="relative h-full w-full bg-base-100" >
        <div className={`absolute inset-0 bg-pink-400 bg-[size:20px_20px] ${theme === 'dark' ? 'opacity-15' : 'opacity-50'} blur-[350px] z-10`}> </div>
        <AppointmentModal />
        <CreateAppointmentModal />
        <ContextMenu />
        <DeleteAppointmentModal />
        <div className="flex flex-col min-[900px]:flex-row flex-wrap relative z-20">
          {/* Mobile */}
          <div className="w-full min-[900px]:hidden block">
            <Navbar />
          </div>
          <div className="w-full min-[900px]:w-72 min-[900px]:h-screen">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col h-screen justify-center items-center">
            {/* PC */}
            <div className="w-full min-[900px]:block hidden">
              <Navbar />
            </div>
            <div className="max-w-[calc(100vw-75px)] w-[calc(100%-75px)] h-[calc(100vh-75px)] rounded-2xl bg-base-200 bg-opacity-20 backdrop-blur-2xl shadow-xl p-2 my-5 overflow-auto scroll-smooth">
              <Routes>
                <Route path="/" element={<Navigate to="/day" />} />
                <Route path="/day" element={<MainCalendarDay />} />
                <Route path="/week" element={<MainCalendarWeek/>} />
                <Route path="/month" element={<div>Month</div>} />
                <Route path="*" element={<Navigate to="/day" />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
