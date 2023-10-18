import axios from "axios"
import { Types } from "../constants/login"

export const LoginAction = (payload) =>{
    return async (dispatch) =>{
        dispatch({type:Types.LOGIN_REQUEST})
        try{
            const res = await axios.post('http://localhost:5000/api/auth/login',payload)
            if (res?.data?.success){
                localStorage.setItem('authUser',JSON.stringify(res?.data?.data?.user))
                localStorage.setItem('authToken',JSON.stringify(res?.data?.data?.token))
                dispatch({type:Types.LOGIN_SUCCESS, payload:res.data.data})
            }
        }catch(err){
            if (err && err?.response?.data?.status == 400){
                const errMsg = {[err.response?.data?.errorOn] : err.response?.data?.message}
                dispatch({type:Types.LOGIN_FAILURE_400, payload:errMsg})
              }else{
                dispatch({type:Types.LOGIN_FAILURE_500, payload:err.message})
              }
        }
    }
}
