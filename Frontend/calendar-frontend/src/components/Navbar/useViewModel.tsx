import { useEffect, useState, useCallback } from "react";
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

import { useLocation, useNavigate } from "react-router-dom";

export default function useViewModel() {
    const theme = useSelector((state : IThemeSlice) => state.theme.value);
    const {  name, picture, isLogin } = useSelector((state : IUserSlice) => state.user);
    const { authenLoading } = useSelector((state : ILoadingSlice) => state.loading);
    const dispatch = useDispatch();
    const location = useLocation()
    const navigate = useNavigate()

    const [page, setPage] = useState(location.pathname)

    const startTheme = useState(localStorage.getItem('theme') || 'dark')[0]

    const handleTodayClick = useCallback(() => {
        const today = new Date()
        dispatch(setCurrentDisplayMonth(today.getMonth()))
        dispatch(setCurrentDisplayYear(today.getFullYear()))
    }, [dispatch])

    useEffect(() => {
        themeChange(false)

        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        setPage(location.pathname)
    }, [location])

    const toggleTheme = useCallback(() => {
        
        if (theme === 'light') {
            localStorage.setItem('theme', 'dark')
            dispatch(setTheme('dark'))
        } else {
            localStorage.setItem('theme', 'light')
            dispatch(setTheme('light'))
        }
    }, [dispatch, theme])

    const logout = useCallback(() => {

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
    }, [dispatch])

    const handleAuth = useCallback(async (codeRes : CodeResponse) => {
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
        .then(() => {
            getRefreshToken(new AbortController()).then(token => {
                if (token) {
                    dispatch(setToken(token))
                }
            })
        })
    }, [dispatch])

    const googleLogin = useGoogleLogin({
        onSuccess: async codeResponse => {
            handleAuth(codeResponse)
        },
        flow: 'auth-code',
      });

    const handleOptionChange = useCallback((e : React.ChangeEvent<HTMLSelectElement>) => {
        navigate((e.target.value).toLowerCase())
    }, [navigate])

    return { toggleTheme, logout, googleLogin, handleTodayClick, theme, startTheme, authenLoading, isLogin, name, picture, page, handleOptionChange }
}