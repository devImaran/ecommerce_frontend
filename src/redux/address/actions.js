import { api } from "../../api/axios"
import { userDetails } from "../Auth/Actions"
import { ADD_ADDRESS_FAILURE, ADD_ADDRESS_REQUEST, ADD_ADDRESS_SUCCESS, DELETE_ADDRESS_FAILURE, DELETE_ADDRESS_REQUEST, EDIT_ADDRESS_FAILURE, USER_ADDRESS_FAILURE, USER_ADDRESS_REQUEST, USER_ADDRESS_SUCCESS } from "./actionTypes"

export const fetchUserAddresses = () =>{
    return async (dispatch)=>{

        dispatch({type: USER_ADDRESS_REQUEST})
        try{
            const res = await api.get(`/address/fetch`)
            if (res.data.data.success) dispatch({type: USER_ADDRESS_SUCCESS, payload: res.data.data.addresses})
        }catch(err){
            console.log(err)
            return err && err.response && err.response.data 
            ? dispatch({ type: USER_ADDRESS_FAILURE, payload: err.response.data.message })
            : dispatch({ type: USER_ADDRESS_FAILURE, payload: err.message })
        }
    }
}

export const addUserAddress = (payload) =>{
    return async (dispatch)=>{
        dispatch({type: ADD_ADDRESS_REQUEST})
        try{
            const res = await api.post('/address/add', payload)
            if (res.data.success) {
                dispatch({type:ADD_ADDRESS_SUCCESS})
                dispatch(userDetails())
                return 
            }
        }catch(err){
            console.log(err)
            err && err.response && err.response.data 
            ? dispatch({ type: ADD_ADDRESS_FAILURE, payload: err.response.data.message })
            : dispatch({ type: ADD_ADDRESS_FAILURE, payload: err.message })
        }
    }
}

export const editAddress = (addressId) =>{
    return async (dispatch)=>{
        dispatch({type: ADD_ADDRESS_REQUEST})
        try{
            const res = await api.put(`/address/add/${addressId}`)
            console.log("res",res)
        }catch(err){
            console.log(err)
            err && err.response && err.response.data 
            ? dispatch({ type: EDIT_ADDRESS_FAILURE, payload: err.response.data.message })
            : dispatch({ type: EDIT_ADDRESS_FAILURE, payload: err.message })
        }
    }
}

export const deleteAddress = (addressId) =>{
    return async (dispatch)=>{
        dispatch({type: DELETE_ADDRESS_REQUEST})
        try{
            const res = await api.delete(`/address/delete/${addressId}`)
            console.log("res",res)
        }catch(err){
            console.log(err)
            err && err.response && err.response.data 
            ? dispatch({ type: DELETE_ADDRESS_FAILURE, payload: err.response.data.message })
            : dispatch({ type: DELETE_ADDRESS_FAILURE, payload: err.message })
        }
    }
}