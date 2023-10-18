import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { red, blue } from '@mui/material/colors';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeItemFromCart } from '../../redux/cart/actions';

const CartCard = ({product}) => {
    const dispatch = useDispatch()
    const {productId, price, quantity} = product
    return (
        <li key={product.id} className="flex py-6">
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                <img
                    src={productId?.images[0]}
                    alt={productId?.images[0]}
                    className="h-full w-full object-cover object-center"
                />      
            </div>

            <div className="ml-4 flex flex-1 flex-col"> 
                <div>
                    <div className="flex justify-between text-base font-medium text-text-primary font-Inter">
                        <h3 className='basis-8/12'>
                            <Link to="">{productId?.name}</Link>
                        </h3>
                        <p className="ml-4">Rs {price}</p>
                    </div>

                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <div className='flex justify-start items-center w-full'>
                        <button className='w-[20px] h-[20px] outline-none'>
                            <RemoveCircleOutlineIcon sx={{ color: blue[900] }} fontSize="medium" />
                        </button>
                        <p className='px-3 font-semibold'>{quantity}</p>
                        <button className='w-[20px] h-[20px] outline-none'>
                            <AddCircleOutlineIcon sx={{ color: blue[900] }} fontSize="medium" />
                        </button>
                    </div>

                    <div className="flex">
                        <DeleteIcon className="cursor-pointer" sx={{ color: red[500] }} onClick={()=>dispatch(removeItemFromCart(productId._id))}/>
                    </div>
                </div>
            </div>
        </li>
    )
}

export default CartCard