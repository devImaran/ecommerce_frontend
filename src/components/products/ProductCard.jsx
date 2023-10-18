import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { stringTruncate } from '../../utils/truncate';
import { Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cart/actions';

const ProductCard = ({ product }) => {
    const { _id, name, description, images, price } = product
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const navigateHandler = (productId) =>{
        return navigate(`/shop/product-detail/${productId}`)
    }

    const addtoCartHandler = () =>{
        dispatch(addToCart(product))
    }

    return (
        <div className='h-[441px] w-[282px] flex flex-col justify-start items-center cursor-pointer' onClick={() => navigateHandler(_id)}>
            <div className='h-[370px] w-[282px]'>
                <img className='w-full h-full object-cover object-left-top rounded-[12px]' src={images[0]} />
            </div>
            <div className='flex justify-between items-center w-full py-3'>
                <h4 className='text-[16px] font-Inter text-text-primary font-semibold'>{stringTruncate(name, 20)}</h4>
                <div className='text-[14px] font-bold text-main-color font-Inter bg-[#F6F6F6] px-4 py-2 rounded-md'>Rs {price}</div>
            </div>
        </div>
    )
}

export default ProductCard