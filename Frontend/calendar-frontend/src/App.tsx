import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";
import MainCalendar from "components/MainCalendar";
import { useSelector } from "react-redux";
import { IThemeSlice } from "interfaces/IThemeSlice";
import LoginModal from "components/LoginModal";

function App() {
  const theme = useSelector((state : IThemeSlice) => state.theme.value);
  
  return (
    <>
    <div className="relative h-full w-full bg-base-100">
    <div className={`absolute inset-0 bg-pink-400 bg-[size:20px_20px] ${theme === 'dark' ? 'opacity-15' : 'opacity-50'} blur-[350px] z-10`}> </div>
      <LoginModal />
      <div className="flex flex-col md:flex-row flex-wrap relative z-20">
        {/* Mobile */}
        <div className="w-full md:hidden block">
          <Navbar />
        </div>
        <div className="w-full md:w-72 md:h-screen">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col h-screen justify-center items-center">
          {/* PC */}
          <div className="w-full md:block hidden">
            <Navbar />
          </div>
          <div className="w-[calc(100%-75px)] h-[calc(100vh-75px)] rounded-2xl bg-base-200 bg-opacity-20 backdrop-blur-2xl shadow-xl p-2 my-5 overflow-auto scroll-smooth">
            <MainCalendar />
          </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default App;
