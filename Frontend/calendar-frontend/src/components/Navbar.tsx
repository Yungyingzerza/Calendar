import { useEffect,useState } from "react";
import { themeChange } from 'theme-change'
import { useDispatch, useSelector } from "react-redux";
import { IThemeSlice } from "interfaces/IThemeSlice";
import { IUserSlice } from "interfaces/IUserSlice";
import { setTheme } from "store/themeSlice";
import { setCurrentDisplayMonth, setCurrentDisplayYear } from "store/calendarSlice";
import { setEmail, setName, setPicture, setToken, setIsLogin } from "store/userSlice";

import { useGoogleLogin, googleLogout } from "@react-oauth/google";

export default function Navbar() {

    const theme = useSelector((state : IThemeSlice) => state.theme.value);
    const { token, name, picture, isLogin } = useSelector((state : IUserSlice) => state.user);
    const dispatch = useDispatch();

    const startTheme = useState(localStorage.getItem('theme') || 'dark')[0]

    const handleTodayClick = () => {
        const today = new Date()
        dispatch(setCurrentDisplayMonth(today.getMonth()))
        dispatch(setCurrentDisplayYear(today.getFullYear()))
    }

    useEffect(() => {
        themeChange(false)
    }, [])

    const toggleTheme = () => {
        
        if (theme === 'light') {
            localStorage.setItem('theme', 'dark')
            dispatch(setTheme('dark'))
        } else {
            localStorage.setItem('theme', 'light')
            dispatch(setTheme('light'))
        }
    }

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            dispatch(setToken(codeResponse))
            dispatch(setIsLogin(true))
        },
        onError: (error) => console.log('Login Failed:', error)
    });

    const logout = () => {
        googleLogout()
        dispatch(setToken(null))
        dispatch(setEmail(null))
        dispatch(setName(null))
        dispatch(setPicture(null))
        dispatch(setIsLogin(false))
    }

    useEffect(() => {
        if (isLogin && token) {
            fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token.access_token}`,{
                headers:{
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token.access_token}`
                }
            })
            .then(res => res.json())
            .then(data => {
                dispatch(setEmail(data.email))
                dispatch(setName(data.name))
                dispatch(setPicture(data.picture))
                dispatch(setIsLogin(true))
            })
        }

        return () => {
            dispatch(setToken(null))
            dispatch(setEmail(null))
            dispatch(setName(null))
            dispatch(setPicture(null))
            dispatch(setIsLogin(false))
        }

    // eslint-disable-next-line
    }, [token])


    return (
        <>
            <div className="w-full h-16 bg-base-200 bg-opacity-10 backdrop-blur-2xl flex flex-row-reverse items-center gap-4 shadow-lg ">
                
                {isLogin && picture ? 
                <div className="avatar mr-5 cursor-pointer">
                    <div className="mask mask-hexagon w-10" onClick={() => logout()}>
                        <img src={picture} alt={`${name} Profile`}  />
                    </div>
                </div> 
                :
                <div className="mr-5 cursor-pointer">
                    <button onClick={() => login()} className="btn btn-ghost">Sign in with Google</button>
                </div>
                }

                


                {isLogin && <div>Hi {name}</div>}

                <label className="swap swap-rotate">
                    {/* this hidden checkbox controls the state */}
                    <input type="checkbox" onClick={() => toggleTheme()} data-set-theme={theme === 'light' ? 'dark' : 'light'} data-act-class="ACTIVECLASS"/>

                    {/* sun icon */}
                    <svg
                        className={`${startTheme === 'light' ? 'swap-off' : 'swap-on' } h-8 w-8 fill-current`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path
                            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>

                    {/* moon icon */}
                    <svg
                        className={`${startTheme === 'light' ? 'swap-on' : 'swap-off' } h-8 w-8 fill-current`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path
                            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                </label>

                {/* left zone */}
                <div className="flex-1 ml-5">
                    <button onClick={() => handleTodayClick()} className="btn btn-ghost border border-gray-600">Today</button>
                </div>
            </div>
        </>
    )
}