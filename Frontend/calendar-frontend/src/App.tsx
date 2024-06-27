import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";
function App() {
  return (
    <>
      <div className="flex flex-col md:flex-row flex-wrap">
        <div className="w-full md:w-72 md:h-screen p-2">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col h-screen justify-center items-center">
          <Navbar />
          <div className="w-[calc(100%-75px)] h-[calc(100vh-75px)] rounded-2xl bg-base-200 bg-opacity-20 backdrop-blur-2xl shadow-xl p-2 my-5">

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
