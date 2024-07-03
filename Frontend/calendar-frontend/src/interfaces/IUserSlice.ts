import { TokenResponse } from "@react-oauth/google"

export interface IUserSlice {
    user:{
        token : TokenResponse | null
        email: string | null
        name: string | null
        picture: string | null
        isLogin: boolean
    }
    
}