import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import CartCard from '../cartCard/CartCard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userCartItems } from '../../redux/cart/actions';
import {useNavigate} from 'react-router-dom'

export default function Cart({ open, setOpen }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)

    const checkoutHandler = () =>{
        setOpen(false)
        navigate('/orders/checkout')
    }

    // useEffect(() => {
    //     dispatch(userCartItems())
    // }, [])

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-text-primary font-Inter">Shopping Cart</Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">Close panel</span>
                                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-border-color">
                                                        {cartItems.userCartItems.length > 0 ? cartItems.userCartItems.map((product) => (
                                                            <CartCard product={product} />
                                                        )) :
                                                            <h3>No item in bag</h3>
                                                        }
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-border-color px-4 py-6 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-text-primary font-Inter">
                                                <p>Subtotal</p>
                                                <p>Rs {cartItems.totalPrice}</p>
                                            </div>
                                            <p className="mt-0.5 text-sm text-text-primary font-Inter">Shipping and taxes calculated at checkout.</p>
                                            <div className="mt-6">
                                                <button
                                                    onClick={checkoutHandler}
                                                    className="flex items-center justify-center w-full rounded-md border border-transparent bg-main-color px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-second-color cursor-pointer disabled:bg-border-color disabled:cursor-not-allowed"
                                                    disabled={cartItems.userCartItems.length ===0 }
                                                >
                                                    Checkout
                                                </button>
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                <p>
                                                    or 
                                                    <button
                                                        type="button"
                                                        className="font-medium text-main-color hover:text-second-color"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        Continue Shopping
                                                        <span aria-hidden="true"> &rarr;</span>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
