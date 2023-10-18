import { api } from "../../api/axios"
import { CATEGORIES_TREE_FAILURE, CATEGORIES_TREE_REQUEST, CATEGORIES_TREE_SUCCESS } from "./actionTypes"

export const categoriesWiseProducts = () =>{
    return async(dispatch)=>{
        dispatch({type:CATEGORIES_TREE_REQUEST})
        try{
            const res = await api.get('/categories/categories-wise-product')
            if(res.data.success && res.data.data.result) return dispatch({type:CATEGORIES_TREE_SUCCESS, payload: res.data.data.result})
        }catch(err){
            console.log(err)
            dispatch({type:CATEGORIES_TREE_FAILURE, payload: err.message})
        }
    }
}