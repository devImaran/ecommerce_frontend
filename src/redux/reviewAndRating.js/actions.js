import { api } from "../../api/axios"
import { ADD_REVIEW_AND_RATING_FAILURE, ADD_REVIEW_AND_RATING_REQUEST, ADD_REVIEW_AND_RATING_SUCCESS } from "./actionTypes"

export const addReviewAndRating = (payload)=>{
    // console.log(category, size, stock, maxPrice, minPrice)
    return async(dispatch)=>{
        dispatch({type:ADD_REVIEW_AND_RATING_REQUEST})
        try{
            const res = await api.post(`/review-and-rating/add-review-and-rating/`, payload)
            if (res.data && res.data.success) dispatch({type:ADD_REVIEW_AND_RATING_SUCCESS, payload:res.data.data.product})
        }catch(err){
            console.log(err)
            err && err.response && err.response.data 
            ? dispatch({ type: ADD_REVIEW_AND_RATING_FAILURE, payload: err.response.data.message })
            : dispatch({ type: ADD_REVIEW_AND_RATING_FAILURE, payload: err.message })
        }
    }
}