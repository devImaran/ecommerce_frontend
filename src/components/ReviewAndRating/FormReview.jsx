import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addReviewAndRating } from '../../redux/reviewAndRating.js/actions';
import Rating from '@mui/material/Rating';
import { formValidation } from '../../utils/formValidation';

const FormReview = ({ singleProduct }) => {
    const value = 3.5;
    const dispatch = useDispatch()
    const [ratingValue, setRatingValue] = useState(0)
    const [inputField, setInputField] = useState({
        title: '',
        content: ''
    })
    const [error, setError] = useState({
        title: '',
        content: ''
    })

    const inputHandler = (e)=>{
        setInputField((prev)=>{
         return {
            ...prev,
            [e.target.name]: e.target.value
         }
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const {isValid, error} = formValidation(inputField)
        setError(error)
        if (isValid){
            dispatch(addReviewAndRating({ productId: singleProduct._id, rating: ratingValue, review: inputField.content }))
        }
    }


    return (
        <div className='flex flex-col justify-start items-start w-full'>
            <p className='text-[#1D2939] text-[24px] font-bold font-Inter leading-10 pb-5 px-3 md:px-0'>write a review</p>
            <form className='flex flex-col justify-start items-start w-full md:w-1/2 gap-5 p-5 md:p-0' onSubmit={submitHandler}>
                <div className='flex flex-col justify-start items-start w-full gap-2'>
                    <label className='text-[#1D2939] text-[16px] font-Inter'>What is it like to Product?</label>
                    <Rating
                        name="half-rating"
                        defaultValue={5}
                        onChange={(event, newValue) => { setRatingValue(newValue) }}
                        precision={0.5}
                    />
                </div>
                <div className='flex flex-col justify-start items-start w-full gap-3'>
                    <label className='text-[#1D2939] text-[16px] font-Inter'>Review Title</label>
                    <div className='flex flex-col justify-start items-start w-full'>
                        <input name="title" type='text' placeholder='Great Product' onChange={inputHandler} className='border border-border-color w-full p-5 rounded-lg' />
                        {error.title && <span className='text-[#D94A27] text-[16px] font-Inter capitalize'>this filed is required! </span>}
                    </div>
                </div>
                <div className='flex flex-col justify-start items-start w-full gap-3'>
                    <label className='text-[#1D2939] text-[16px] font-Inter'>Review Content</label>
                    <div className='flex flex-col justify-start items-start w-full'>
                        <textarea name="content" className='w-full p-5 min-h-[200px] border border-border-color rounded-lg' onChange={inputHandler} placeholder='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam ullam fugiat ad asperiores ipsa reprehenderit inventore exercitationem dolorem repellat necessitatibus'></textarea>
                        {error.content && <span className='text-[#D94A27] text-[16px] font-Inter capitalize'>this filed is required! </span>}
                    </div>
                </div>
                <button type="submit" className='border-none outline-none bg-main-color w-full p-3 rounded-lg text-white capitalize leading-6 font-bold text-[18px] hover:bg-second-color'>submit</button>
            </form>
        </div>
    )
}

export default FormReview