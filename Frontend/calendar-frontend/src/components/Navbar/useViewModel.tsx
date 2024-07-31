import { useEffect,useState } from "react";
import { themeChange } from 'theme-change'
import { useDispatch, useSelector } from "react-redux";
import { IThemeSlice } from "interfaces/IThemeSlice";
import { IUserSlice } from "interfaces/IUserSlice";
import { ILoadingSlice } from "interfaces/ILoadingSlice";
import { setTheme } from "store/themeSlice";
import { setCurrentDisplayMonth, setCurrentDisplayYear } from "store/calendarSlice";
import { setEmail, setName, setPicture, setToken, setIsLogin } from "store/userSlice";
import {  googleLogout, useGoogleLogin, CodeResponse } from "@react-oauth/google";

import { API } from "constants/API";

import { getRefreshToken } from "utils/getRefreshToken";

export default function useViewModel() {
    const theme = useSelector((state : IThemeSlice) => state.theme.value);
    const {  name, picture, isLogin } = useSelector((state : IUserSlice) => state.user);
    const { authenLoading } = useSelector((state : ILoadingSlice) => state.loading);
    const dispatch = useDispatch();

    const startTheme = useState(localStorage.getItem('theme') || 'dark')[0]

    const handleTodayClick = () => {
        const today = new Date()
        dispatch(setCurrentDisplayMonth(today.getMonth()))
        dispatch(setCurrentDisplayYear(today.getFullYear()))
    }

    useEffect(() => {
        themeChange(false)
        // eslint-disable-next-line
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

    const logout = () => {

        fetch(`${API.auth}/logout`, {
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            googleLogout()
            dispatch(setToken(null))
            dispatch(setEmail(null))
            dispatch(setName(null))
            dispatch(setPicture(null))
            dispatch(setIsLogin(false))
        })

        
    }

    const handleAuth = async (codeRes : CodeResponse) => {
        fetch(`${API.auth}/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: codeRes.code
            }),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            getRefreshToken(new AbortController()).then(token => {
                if (token) {
                    dispatch(setToken(token))
                }
            })
        })
    }

    const googleLogin = useGoogleLogin({
        onSuccess: async codeResponse => {
            handleAuth(codeResponse)
        },
        flow: 'auth-code',
      });

    return { toggleTheme, logout, googleLogin, handleTodayClick, theme, startTheme, authenLoading, isLogin, name, picture }
}