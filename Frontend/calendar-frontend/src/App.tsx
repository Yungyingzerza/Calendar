import Sidebar from "components/Sidebar";

function App() {
  return (
    <>
      <div className="flex flex-col md:flex-row flex-wrap">
        <div className="w-full md:w-72 md:h-screen p-2">
          <Sidebar />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="w-[calc(100%-75px)] h-[calc(100vh-75px)] rounded-2xl bg-base-200 bg-opacity-20 backdrop-blur-2xl shadow-xl p-2">
            
          </div>
        </div>
      </div>         
    </>
  );
}

export default App;
