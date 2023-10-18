import { ADD_REVIEW_AND_RATING_FAILURE, ADD_REVIEW_AND_RATING_REQUEST, ADD_REVIEW_AND_RATING_SUCCESS } from "./actionTypes"

const initialState ={
    loading: false,
    error: null,
    reviewsAndRatings: []
}

export const reviewsAndRatingReducer = (state= initialState, action) =>{
    switch(action.type){
        case ADD_REVIEW_AND_RATING_REQUEST: 
            return { ...state, loading : true}

        case ADD_REVIEW_AND_RATING_SUCCESS:
            return { ...state, loading : false, reviewsAndRatings: action.payload, error:null}

        case ADD_REVIEW_AND_RATING_FAILURE:
            return { ...state, loading : false, error: action.payload, reviewsAndRatings: []} 

        default:
            return state
    }
}