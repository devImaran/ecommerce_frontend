import { Divider, Grid } from '@mui/material'
import React from 'react'
import CartCard from '../cartCard/CartCard'
import { useSelector } from 'react-redux'


const OrderSummary = ({ selectedAddress, handleNext }) => {
    const { cartItems } = useSelector(state => state.cart)

    return (
        <div className='flex flex-col justify-start items-start gap-5 w-full p-5'>
            <Grid container sm={12} lg={12}>
                <div className=' flex flex-col justify-start items-start w-full px-5 py-10 border border-main-color rounded-lg'>
                    <h3 className='font-bold uppercase text-[30px] py-2 text-main-color font-Inter'>md ali imaran</h3>
                    <div className='flex flex-col justify-start items-start w-full gap-3'>
                        <Grid container sm={12} md={12} lg={12}>
                            <Grid container sm={12} md={2} lg={2}>
                                <div className='flex justify-between items-start w-full'>
                                    <p className='capitalize w-full text-text-primary font-Inter'>email address</p>
                                    <p >:</p>
                                </div>
                            </Grid>
                            <Grid container sm={12} md={8} lg={8}>
                                <p className='w-full px-5 font-Inter text-text-secondary font-semibold'>{selectedAddress.email}</p>
                            </Grid>
                        </Grid>

                        <Grid container sm={12} md={12} lg={12}>
                            <Grid container sm={12} md={2} lg={2}>
                                <div className='flex justify-between items-start w-full'>
                                    <p className='capitalize w-full text-text-primary font-Inter'>Delivery address</p>
                                    <p >:</p>
                                </div>
                            </Grid>
                            <Grid container sm={12} md={8} lg={8}>
                                <p className='uppercase w-full font-Inter text-text-secondary font-semibold px-5'>{selectedAddress?.address}</p>
                            </Grid>
                        </Grid>

                        <Grid container sm={12} md={12} lg={12}>
                            <Grid container sm={12} md={2} lg={2}>
                                <div className='flex justify-between items-start w-full'>
                                    <p className='capitalize w-full text-text-primary font-Inter'>contact Number</p>
                                    <p >:</p>
                                </div>
                            </Grid>
                            <Grid container sm={12} md={8} lg={8}>
                                <p className='uppercase w-full font-Inter text-text-secondary font-semibold px-5'>{selectedAddress?.phoneNumber}</p>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Grid>

            <Grid container sm={12} lg={12} md={12} >
                <div className='flex justify-start items-start w-full gap-5'>
                    <Grid item sm={12} lg={6} md={6} className='border border-main-color rounded-lg'>
                        <div className='w-full p-5'>
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {cartItems.userCartItems.length > 0 ? cartItems.userCartItems.map((product) => (
                                        <CartCard product={product} />
                                    )) :
                                        <h3>No item in bag</h3>
                                    }
                                </ul>
                            </div>
                        </div>
                    </Grid>
                    <Grid item sm={12} lg={6} md={6} className='border border-main-color rounded-lg'>
                        <div className='w-full p-5'>
                            <h4 className='mb-2 text-[24px] capitalize font-semibold text-main-color font-Inter'>price details</h4>
                            <Divider className='w-full py-1' />
                            <div className='flex justify-between items-center w-full px-5 py-2'>
                                <h4 className='text-[18px] capitalize font-semibold text-text-primary font-Inter'>price (<span className='text-[#807D7E]'>{cartItems.userCartItems.length} items</span>)</h4>
                                <p className='text-[18px] capitalize font-semibold text-text-primary font-Inter'>Rs {cartItems.totalPrice}</p>
                            </div>
        
                            <div className='flex justify-between items-center w-full px-5 py-2'>
                                <h4 className='text-[18px] capitalize font-semibold text-text-primary font-Inter'>delivery charge</h4>
                                <p className='text-[18px] capitalize font-semibold text-text-primary font-Inter'>Rs 40</p>
                            </div>
                            <Divider className='w-full py-1' />
                            <div className='flex justify-between items-center w-full px-5 py-3'>
                                <h4 className='text-[18px] capitalize font-semibold text-text-primary font-Inter'>Total Amount</h4>
                                <p className='text-[18px] capitalize font-semibold text-text-primary font-Inter'>Rs {cartItems.totalPrice + 40}</p>
                            </div>
                            <button disabled={cartItems.userCartItems.length <=0} className='w-full bg-main-color outline-none rounded-lg p-3 my-5 uppercase text-[white] font-semibold hover:bg-second-color disabled:opacity-5 disabled:cursor-not-allowed' type='button' onClick={handleNext}>
                                payment
                            </button>
                        </div>
                    </Grid>
                </div>
            </Grid>
        </div>
    )
}

export default OrderSummary