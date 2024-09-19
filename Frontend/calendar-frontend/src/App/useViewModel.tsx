import { useEffect, useRef } from "react";
import { setEmail, setName, setPicture, setToken, setIsLogin } from "store/userSlice";
import { setAuthenLoading } from "store/loadingSlice";
import { useSelector, useDispatch } from "react-redux";
import { IThemeSlice } from "interfaces/IThemeSlice";
import { getRefreshToken } from "utils/getRefreshToken";
import { IUserSlice } from "interfaces/IUserSlice";
import { IScrollSlice } from "interfaces/IScrollSlice";
import { setScrollY } from "store/scrollSlice";

export default function useViewModel() {
    const theme = useSelector((state: IThemeSlice) => state.theme.value);
    const token = useSelector((state: IUserSlice) => state.user.token);
    const scroll =useSelector((state: IScrollSlice) => state.scroll);

    const dispatch = useDispatch();

    const appRef = useRef<HTMLDivElement>(null)
  
    useEffect(() => {
      if(scroll.scrollY !== -1 && appRef.current){
        appRef.current.scrollTo(0,scroll.scrollY)

        dispatch(setScrollY(-1))
      }


    }, [scroll, appRef])
  
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

    return {theme, appRef}
}