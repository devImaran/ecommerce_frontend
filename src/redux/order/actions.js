import { useNavigate } from "react-router-dom"
import { api } from "../../api/axios"
import { FETCH_MY_ORDER_FAILURE, FETCH_MY_ORDER_REQUEST, FETCH_MY_ORDER_SUCCESS, PLACE_ORDER_FAILURE, PLACE_ORDER_REQUEST, PLACE_ORDER_SUCCESS } from "./actionTypes"

export const placeOrder = (paymentMethod, addressId)=>{
    return async (dispatch)=>{
        dispatch({type:PLACE_ORDER_REQUEST})
        try{
            // const navigate = useNavigate()
            const res = await api.post(`/order/place-order`,{ paymentMethod, addressId} )
            if (res.data.success){
                dispatch({type:PLACE_ORDER_SUCCESS})
                // navigate('/shop/orders/my-orders')
            }
        }catch(err){
            console.log(err)
            err && err.response && err.response.data 
            ? dispatch({ type: PLACE_ORDER_FAILURE, payload: err.response.data.message })
            : dispatch({ type: PLACE_ORDER_FAILURE, payload: err.message })
        }
    }
}


export const fetchOrders = ()=>{
    return async (dispatch)=>{
        dispatch({type:FETCH_MY_ORDER_REQUEST})
        try{
            const res = await api.post(`/order/my-orders`)
            console.log(res)
            if (res.data.success){
                dispatch({type:FETCH_MY_ORDER_SUCCESS, payload: res.data.data.userOrders})
            }
        }catch(err){
            console.log(err)
            err && err.response && err.response.data 
            ? dispatch({ type: FETCH_MY_ORDER_FAILURE, payload: err.response.data.message })
            : dispatch({ type: FETCH_MY_ORDER_FAILURE, payload: err.message })
        }
    }
}