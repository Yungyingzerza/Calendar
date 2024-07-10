import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar";
import MainCalendar from "components/MainCalendar";
import { useSelector, useDispatch } from "react-redux";
import { IThemeSlice } from "interfaces/IThemeSlice";
import LoginModal from "components/LoginModal";
import { useEffect } from "react";
import { API } from "constants/API";
import { setEmail, setName, setPicture, setToken, setIsLogin } from "store/userSlice";
import { setAuthenLoading } from "store/loadingSlice";

import { getRefreshToken } from "utils/getRefreshToken";

function App() {
  const theme = useSelector((state: IThemeSlice) => state.theme.value);
  const token = useSelector((state: any) => state.user.token);
  const dispatch = useDispatch();


  useEffect(() => {
    const abortController = new AbortController()

    getRefreshToken(abortController)
    .then(data => {
        if (data) {
          //have cookie
          dispatch(setToken(data))
        }else{
          dispatch(setAuthenLoading(false))
        }
      })

    return () => {
      !process.env.REACT_APP_DEV && abortController.abort()
    }

  }, [])

  useEffect(() => {
    const abortController = new AbortController()

    if (token) {
      fetch(`https://www.googleapis.com/oauth2/v1/userinfo`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        },
        signal: abortController.signal
      })
        .then(res => res.json())
        .then(data => {
          dispatch(setName(data.name))
          dispatch(setEmail(data.email))
          dispatch(setPicture(data.picture))
          dispatch(setIsLogin(true))
          dispatch(setAuthenLoading(false))
        })
    }

    return () => {
      !process.env.REACT_APP_DEV && abortController.abort()
    }

  }, [token])

  return (
    <>
      <div className="relative h-full w-full bg-base-100" >
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
