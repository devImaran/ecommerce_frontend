import { CATEGORIES_TREE_FAILURE, CATEGORIES_TREE_REQUEST, CATEGORIES_TREE_SUCCESS } from "./actionTypes"

const initialState = {
    categoriesList: null,
    loading: false,
    error: null
}

export const categoryWiseProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORIES_TREE_REQUEST:
            return { ...state, loading: true }

        case CATEGORIES_TREE_FAILURE:
            return { ...state, loading: false, categoriesList: null, error: action.payload }

        case CATEGORIES_TREE_SUCCESS:
            return { ...state, loading: false,  categoriesList: action.payload , error: null }

        default:
            return { ...state }
    }
}