import { api } from "../../api/axios"
import { ADD_TO_CART_FAILURE, ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, USER_CART_ITEMS_FAILURE, USER_CART_ITEMS_REQUEST, USER_CART_ITEMS_SUCCESS } from "./actionTypes"

export const addToCart = (productId, size, color, price, quantity) => {
    return  async (dispatch) => {
        dispatch({ type: ADD_TO_CART_REQUEST })
        try {
            const res = await api.post('/cart/add-item-to-cart', { productId, size, color, price, quantity })
            if (res.data && res.data.success) dispatch({ type: ADD_TO_CART_SUCCESS })
        } catch (err) { 
            console.log(err)
            err && err.response && err.response.data 
            ? dispatch({ type: ADD_TO_CART_FAILURE, payload: err.response.data.message })
            : dispatch({ type: ADD_TO_CART_FAILURE, payload: err.message })
        }
    }
}

export const userCartItems = () => {
    return  async (dispatch) => {
        dispatch({ type: USER_CART_ITEMS_REQUEST })
        try {
            const res = await api.get('/cart/user-cart')
            if (res.data && res.data.success) dispatch({ type: USER_CART_ITEMS_SUCCESS, payload: res.data.data.cartItems })
        } catch (err) { 
            console.log(err)
            err && err.response && err.response.data 
            ? dispatch({ type: USER_CART_ITEMS_FAILURE, payload: err.response.data.message })
            : dispatch({ type: USER_CART_ITEMS_FAILURE, payload: err.message })
        }
    }
}

export const removeItemFromCart = (productId) => {
    return  async (dispatch) => {
        dispatch({ type: REMOVE_CART_ITEM_REQUEST })
        try {
            const res = await api.post('/cart/remove-item-from-cart', {productId})
            if (res.data && res.data.success) dispatch({ type: REMOVE_CART_ITEM_SUCCESS })
        } catch (err) { 
            console.log(err)
            err && err.response && err.response.data 
            ? dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: err.response.data.message })
            : dispatch({ type: REMOVE_CART_ITEM_FAILURE, payload: err.message })
        }
    }
}