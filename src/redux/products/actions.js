import { api } from "../../api/axios"
import { PRODUCT_FAILURE, PRODUCT_REQUEST, PRODUCT_SUCCESS, SINGLE_PRODUCT_FAILURE, SINGLE_PRODUCT_REQUEST, SINGLE_PRODUCT_SUCCESS } from "./actionTypes"

export const fetchAllProducts = (category, size, maxPrice, minPrice, currentPage, pageSize)=>{
    // console.log(category, size, stock, maxPrice, minPrice)
    return async(dispatch)=>{
        dispatch({type:PRODUCT_REQUEST})
        try{
            const res = await api.get(`/product/all-products?category=${category}&size=${size}&minPrice=${minPrice}&maxPrice=${maxPrice}&currentPage=${currentPage}&pageSize=${pageSize}`)
            if (res.data && res.data.success) dispatch({type:PRODUCT_SUCCESS, payload:{products : res.data.data[0].products, totalCount : res.data.data[0].totalCount[0].totalPages}})
        }catch(err){
            dispatch({type:PRODUCT_FAILURE, payload: err.message})
            console.log(err)
        }
    }
}   

export const fetchSingleProductDetails = (productId)=>{
    // console.log(category, size, stock, maxPrice, minPrice)
    return async(dispatch)=>{
        dispatch({type:SINGLE_PRODUCT_REQUEST})
        try{
            const res = await api.get(`/product/single-product-details/${productId}`)
            if (res.data && res.data.success) dispatch({type:SINGLE_PRODUCT_SUCCESS, payload:res.data.data.product})
        }catch(err){
            dispatch({type:SINGLE_PRODUCT_FAILURE, payload: err.message})
            console.log(err)
        }
    }
}

