import { api } from "../../api/axios"
import { CLOSE_AUTH_MODEL, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, OPEN_AUTH_MODEL, REGISTER_REQUEST } from "./ActionTypes"
import axios from "axios"

export const login = (userData) =>{
    return async (dispatch)=>{
        dispatch({type: LOGIN_REQUEST})
        try{
            const res = await axios.post('http://localhost:8080/api/auth/login', userData)
             if (res && res.data.success){
                localStorage.setItem("authToken", res.data.data.token)
                dispatch({type: LOGIN_SUCCESS, payload: { token :res.data.data.token }})
                return dispatch(userDetails())
             }
        }catch(err){
            if (err &&  err.response && !err.response?.data?.success){
                const { errorOn, message } = err.response.data
                return dispatch({type: LOGIN_FAILURE, payload: { errorOn, message }})
            }
            return dispatch({type: LOGIN_FAILURE, payload: {message: err.message}})
        }
    }
}

export const userDetails = () =>{
    return async (dispatch)=>{
        dispatch({type: GET_USER_REQUEST})
        try{
            const token = localStorage.getItem('authToken')
            if (token){
                const res = await api.get('/user/my-details')
             if (res && res.data.success){
                return dispatch({type: GET_USER_SUCCESS, payload: res.data.data })
             }
            }
        }catch(err){
            if (err &&  err.response && !err.response?.data?.success){
                return dispatch({type: GET_USER_FAILURE, payload: err.response.data.message})
            }
            return dispatch({type: GET_USER_FAILURE, payload: err.response.data.message})
        }
    }
}

export const openAuthModal = ()=>{
    return async (dispatch)=>{
        dispatch({type: OPEN_AUTH_MODEL})
    }
}

export const closeAuthModal = ()=>{
    return async (dispatch)=>{
        dispatch({type: CLOSE_AUTH_MODEL})
    }
}



export const logout = () =>{
   return (dispatch)=>{
    try{
        localStorage.removeItem("authToken")
        dispatch({type:LOGOUT_SUCCESS})
       }catch(err){
        console.log(err)
       }
   }
}