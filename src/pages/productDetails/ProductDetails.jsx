
import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ReviewAndRating from '../../components/ReviewAndRating/ReviewAndRating';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleProductDetails } from '../../redux/products/actions';
import { addToCart } from '../../redux/cart/actions';
import { Container, Grid, FormControlLabel, Radio, RadioGroup, Box, Tabs, Tab } from '@mui/material';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { blue } from '@mui/material/colors';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined';
import FormReview from '../../components/ReviewAndRating/FormReview';
import ProductDescription from '../../components/ReviewAndRating/ProductDescription';
import { openAuthModal } from '../../redux/Auth/Actions';


const product = {
    name: 'Basic Tee 6-Pack',
    price: '$192',
    href: '#',
    breadcrumbs: [
        { id: 1, name: 'Men', href: '#' },
        { id: 2, name: 'Clothing', href: '#' },
    ],
    images: [
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
            alt: 'Two each of gray, white, and black shirts laying flat.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
            alt: 'Model wearing plain black basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
            alt: 'Model wearing plain gray basic tee.',
        },
        {
            src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
            alt: 'Model wearing plain white basic tee.',
        },
    ],
    colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-400' },
    ],
    sizes: [
        { name: 'XXS', inStock: false },
        { name: 'XS', inStock: true },
        { name: 'S', inStock: true },
        { name: 'M', inStock: true },
        { name: 'L', inStock: true },
        { name: 'XL', inStock: true },
        { name: '2XL', inStock: true },
        { name: '3XL', inStock: true },
    ],
    description:
        'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
    highlights: [
        'Hand cut and sewn locally',
        'Dyed with our proprietary colors',
        'Pre-washed & pre-shrunk',
        'Ultra-soft 100% cotton',
    ],
    details:
        'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {
    const params = useParams()
    const dispatch = useDispatch()
    const authState = useSelector(state=>state.auth)

    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedQuantity, setSelectedQuantity] = useState(1)
    const [tabvalue, setTabValue] = useState(0);
    const [highlitedImage, setHighlightedImage] = useState(0)
    const [highlitedColorIndex, setHighlitedColorIndex] = useState(0)
    const { productId } = params
    const { loading, singleProduct } = useSelector(state => state.product)

    const radioHandler = (e)=>{
        setSelectedSize(e.target.value)
    }

    const colorHandler = (color, index) => {
        setSelectedColor(color)
        setHighlitedColorIndex(index)
    }

    const addToCartHandler = () => {
        if(authState.userDetails && authState.userDetails._id){
            dispatch(addToCart(singleProduct.productItems[0]._id, selectedSize, selectedColor, singleProduct.productItems[0].price, selectedQuantity))
        }else{
            dispatch(openAuthModal())
        }
    }


    useEffect(() => {
        dispatch(fetchSingleProductDetails(productId))
    }, [productId])

    useEffect(() => {
        if (singleProduct?.productItems[0]?.size.length >0 ){
            setSelectedSize(singleProduct?.productItems[0]?.size[0].name)
        }

        if (singleProduct?.productItems[0]?.color.length >0 ){
            setSelectedColor(singleProduct?.productItems[0]?.color[0].name)
        }
    }, [singleProduct])


    return (
        <Container style={{ padding: '50px 0 ' }}>
            <Grid container style={{ padding: 0 }}>
                <Grid item sm={12} md={6} lg={6} >
                    <div className='flex flex-col justify-start items-start gap-5 '>
                        <div className='md:w-[587px] md:h-[600px] w-full h-[400px] overflow-hidden px-3'>
                            <img src={singleProduct?.productItems[0]?.images[highlitedImage]} alt="product image" className='w-full h-full bg-cover bg-left-top rounded-[17px]' />
                        </div>
                        <div className='flex justify-center items-start gap-5 w-full px-2'>
                            {
                                singleProduct?.productItems[0]?.images.length > 0 && singleProduct?.productItems[0]?.images.map((image, index) => {
                                    return (
                                        <img src={image} alt="product image" className="md:w-[115px] w-[90px] h-[90px] md:h-[115px] rounded-md md:rounded-[14px] cursor-pointer bg-cover bg-left-top" key={index} onClick={() => setHighlightedImage(index)} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </Grid>
                <Grid item sm={12} md={6} lg={6} className='py-5'>
                    <div className='flex flex-col justify-start items-start w-full pl-5 pb-8 gap-2 border-b border-border-color'>
                        <div className='flex justify-between items-start w-full'>
                            <p className='text-[1.5rem] md:text-[1.75rem] font-semibold font-Inter w-[90%]'>{singleProduct?.productItems[0]?.name}</p>
                            <span className='bg-off-white py-1 px-2 rounded-lg'><ShareOutlinedIcon className='text-main-color' /></span>
                        </div>
                        <p className='font-Inter text-[16px] font-normal text-light-text'>{singleProduct?.productItems[0]?.brand}</p>
                    </div>
                    <div className='flex justify-start items-center w-full pl-5 p-8 border-b border-border-color gap-x-12'>
                        <p className='font-Inter text-main-color font-bold text-[1.5rem] md:text-[2rem]'>Rs {singleProduct?.productItems[0]?.price}</p>
                        <div className='flex justify-start items-start gap-4'>
                            <div className='flex justify-center items-center px-[10px] py-[7px] gap-3 bg-[#FBF3EA] font-Inter font-semibold rounded-xl'>
                                <StarBorderIcon className='text-[#D48D3B]' />
                                <span className='text-[#D48D3B] text-[7px]'>4.8</span>
                            </div>
                            <div className='flex justify-center items-center px-[10px] py-[7px] gap-3 bg-[#EDF0F8] font-Inter font-semibold rounded-xl'>
                                <StarBorderIcon className='text-[#3A4980]' />
                                <span className='text-[#3A4980] capitalize text-[7px] md:text-[14px] font-Inter font-semibold'>67 reviews</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col justify-start items-start w-full pl-5 px-8 pt-5 pb-8 border-b border-border-color gap-x-12 gap-y-5'>
                        <p className='font-Inter text-light-text text-[16px] font-medium'>Choose a Color</p>
                        <div className='flex justify-start items-start gap-4'>
                            {
                                singleProduct?.productItems[0]?.color.map((color, index) => {
                                    return (
                                        <div className={`w-[38px] h-[38px] rounded-full cursor-pointer ${highlitedColorIndex === index && `ring ring-offset-4 ring-main-color`}`} style={{ background: `${color.name}` }} key={index} onClick={() => colorHandler(color.name, index)}></div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className='flex flex-col justify-start items-start w-full px-8 pt-5 pb-8 gap-4 border-b border-border-color '>
                        <p className='font-Inter text-light-text text-[16px] font-medium'>Choose a size</p>
                        <div className='flex justify-start items-start flex-wrap'>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={selectedSize} 
                                onChange={radioHandler}
                            >
                                {
                                    singleProduct?.productItems[0]?.size.map((size, index) => {
                                        return (
                                            <div className='p-0 md:mr-5 mr-1 mt-1 px-[15px] rounded-lg cursor-pointer bg-[#F3F3F3] flex justify-start items-center gap-1' key={index} onChange={() => setSelectedSize(size.name)}>
                                                <FormControlLabel 
                                                    value={size.name} 
                                                    control={<Radio sx={{
                                                        color: blue[900],
                                                        '&.Mui-checked': {
                                                            color: blue[900],
                                                        },
                                                    }} 
                                                /> } />
                                                <span className="text-[#3A4980] font-semibold text-[14px] font-Inter">{size.name}</span>
                                            </div>
                                        )
                                    })
                                }
                            </RadioGroup>
                        </div>
                    </div>
                    <div className='flex md:flex-row flex-col justify-start items-start w-full px-8 py-10 gap-4'>
                        <div className='bg-[#F3F3F3] p-[15px] flex justify-center items-center gap-10 rounded-full w-full md:w-none'>
                            <button className='text-[#3A4980] font-Inter text-[12px] font-bold px-2 outline-none' onClick={() => setSelectedQuantity(selectedQuantity > 1 ? selectedQuantity - 1 : 1)}>-</button>
                            <span className='text-[#3A4980] font-Inter text-[12px] font-bold'>{selectedQuantity}</span>
                            <button className='text-[#3A4980] font-Inter text-[12px] font-bold px-2 outline-none' onClick={() => setSelectedQuantity(selectedQuantity >= 10 ? 10 : selectedQuantity + 1)}>+</button>
                        </div>
                        <button className='bg-main-color text-white p-[15px] flex justify-center items-center gap-2 capitalize rounded-full w-full '>
                            <LocalMallOutlinedIcon />
                            <span className='text-[16px] font-bold font-Inter' onClick={addToCartHandler}>add to bag</span>
                        </button>
                    </div>

                    <div className='flex flex-col justify-center items-center w-full p-3 gap-4 border border-border-color rounded-lg'>
                        <div className='flex justify-start items-start w-full border-b border-border-color gap-5 p-2'>
                            <AirportShuttleOutlinedIcon className='text-[#D75951]' />
                            <div className='flex flex-col justify-start items-start w-full'>
                                <p className='text-[#1D364D] font-Inter text-[17px] font-bold capitalize'>free delivery</p>
                                <p className='text-[#726C6C] font-Inter text-[14px] capitalize underline'>Enter your Postal code for Delivery Availability</p>
                            </div>
                        </div>
                        <div className='flex justify-start items-start w-full gap-5 p-2'>
                            <LocalMallOutlinedIcon className='text-[#D75951]' />
                            <div className='flex flex-col justify-start items-start w-full'>
                                <p className='text-[#1D364D] font-Inter text-[17px] font-bold capitalize'>Return Delivery</p>
                                <p className='text-[#726C6C] font-Inter text-[14px] capitalize underline'>Free 30 days Delivery Return. Details</p>
                            </div>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <Grid sm={12} lg={12} md={12}>

                <div className='flex flex-col justify-start items-start w-full h-auto gap-10 py-20'>
                    <nav className='flex justify-stretch items-baseline w-full border-b-2 border-border-color'>
                        <p className={`font-Inter text-[16px] capitalize cursor-pointer p-5  ${tabvalue == 0 ? 'font-bold text-main-color border-b-2 border-main-color': 'text-[#98A2B3]'}`} onClick={()=>setTabValue(0)}>details</p>
                        <p className={`font-Inter text-[16px] capitalize cursor-pointer p-5 ${tabvalue == 1 ? 'font-bold text-main-color border-b-2 border-main-color': 'text-[#98A2B3]'}`}  onClick={()=>setTabValue(1)}>reviews</p>
                        <p className={`font-Inter text-[16px] cursor-pointer p-5  ${tabvalue == 2 ? 'font-bold text-main-color border-b-2 border-main-color': 'text-[#98A2B3]'}`}  onClick={()=>setTabValue(2)}>Write a review</p>
                    </nav>
                    {
                        tabvalue == 0 ? <ProductDescription data={singleProduct?.productItems[0]}/> : 
                        tabvalue == 1 ? <ReviewAndRating singleProduct={singleProduct}/> : 
                        tabvalue == 2 ? <FormReview/> : null
                    }
                </div>
            </Grid>
        </Container >
    )
}
