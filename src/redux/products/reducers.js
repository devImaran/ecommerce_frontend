import { PRODUCT_FAILURE, PRODUCT_REQUEST, PRODUCT_SUCCESS, SINGLE_PRODUCT_FAILURE, SINGLE_PRODUCT_REQUEST, SINGLE_PRODUCT_SUCCESS } from "./actionTypes"

const initialState = {
    products: [],
    totalCount: 0,
    singleProduct: null, 
    loading: false,
    error: null
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_REQUEST:
        case SINGLE_PRODUCT_REQUEST:
            return { ...state, loading :true, error: null }

        case PRODUCT_SUCCESS:
            return { ...state, loading: false, products: action.payload.products, totalCount: action.payload.totalCount, error: null }

        case PRODUCT_FAILURE:
            return { ...state, loading: false, error:action.payload, products: [], totalCount:0 }

        case SINGLE_PRODUCT_SUCCESS:
            return { ...state, error: null, loading: false, singleProduct: action.payload }
        
        case SINGLE_PRODUCT_FAILURE:
            return { ...state, error: action.payload, loading: false, singleProduct: null, totalCount:0 }

        default:
            return state
    }
}