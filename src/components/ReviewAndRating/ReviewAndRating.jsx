import { Container, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import CommentCard from './CommentCard';
import { reviewData } from './reviewData';
import { formValidation } from '../../utils/formValidation';
import { useDispatch } from 'react-redux';
import { addReviewAndRating } from '../../redux/reviewAndRating.js/actions';


const ReviewAndRating = ({ singleProduct }) => {
    const value = 3.5;
    const dispatch = useDispatch()
    const [ratingValue, setRatingValue] = useState(0)
    const [comment, setComment] = useState(null)
    const [commentError, setCommentError] = useState(null)

    const submitHandler = (e) => {
        e.preventDefault()
        if (!comment) {
            return setCommentError('This filed is required')
        }
        setCommentError(null)
        dispatch(addReviewAndRating({ productId: singleProduct._id, rating: ratingValue, review: comment }))
    }

    const getTotalAvg = (data, length) => {

        let totalReviewCount = 0
        data?.map(item => {
            totalReviewCount += (item._id.$numberDecimal * item.totalCount)
        })

        return totalReviewCount / length
    }


    return (
        <Container style={{ padding: 0 }}>
            <Grid >
                <Grid item sm={12} lg={12} md={12}>
                    <div className='flex flex-col justify-start items-start w-full gap-5'>
                        <p className='capitalize text-[#344054] text-[24px] font-bold pl-3 md:p-0 font-Inter'>Customers Feedback</p>
                        {singleProduct && singleProduct.startRatings.length > 0 ? <div className='flex md:flex-row  flex-col justify-center items-center md:justify-start md:items-start w-full gap-5'>
                            <div className='flex flex-col justify-center items-center w-[90%] md:w-auto gap-2 px-20 py-10  bg-border-color rounded-lg'>
                                <p className='text-[#164C96] text-[60px] font-bold font-Inter'>{getTotalAvg(singleProduct?.startRatings, singleProduct?.productItems[0]?.reviewsAndRatings.length)}</p>
                                <Rating
                                    name="text-feedback"
                                    value={getTotalAvg(singleProduct?.startRatings, singleProduct?.productItems[0]?.reviewsAndRatings.length)}
                                    readOnly
                                    precision={0.5}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                <p className='capitalize text-[#4F547B] text-[16px] leading-6'>product rating</p>
                            </div>

                            <div className='flex flex-col justify-center items-center gap-2 px-5 py-10 bg-border-color rounded-lg w-[90%] md:w-full'>
                                {
                                    singleProduct && singleProduct.startRatings.length > 0 && singleProduct.startRatings.map(reviews => {
                                        const percentage = (reviews.totalCount * 100) / singleProduct.productItems[0].reviewsAndRatings.length;
                                        return (
                                            <div className='flex justify-center items-center w-full gap-3'>
                                                <StarIcon className='text-yellow' />
                                                <div className='flex justify-between items-start w-full gap-5 p-0'>
                                                    <div className="w-full bg-light-text rounded-full h-2 mt-[8px]">
                                                        <div className="bg-yellow h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                                                    </div>
                                                    <div >{percentage}%</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div> : <h4 className='font-Inter text-[20px] text-center w-full text-main-color'>No Reviews and ratings</h4>}
                    </div>
                </Grid>
                {singleProduct && singleProduct.startRatings.length > 0 ? <Grid item sm={12} lg={12} md={12}>
                    <div className='flex flex-col justify-start items-start w-full py-10  px-3 md:px-0'>
                      <p className='capitalize text-[#1D2939] text-[24px] font-bold font-Inter w-full'>reviews</p>
                      <div className='flex flex-col justify-start items-start w-full '>
                      {
                            singleProduct && singleProduct?.productItems[0]?.reviewsAndRatings.map(comment => (<CommentCard comment={comment} />))
                        }
                      </div>
                    </div>
                </Grid>:null}
            </Grid>
        </Container>
    )
}

export default ReviewAndRating


// <Container className=' border border-grey-500 rounded-xl'>
// <Grid container spacing={2} >
//     <Grid item xs={12} md={5}>
//         <div className='flex flex-col justify-start items-start gap-5'>
//             <div className='flex flex-col justify-start items-start w-full gap-3'>
//                 <h4 className='text-[28px] font-bold capitalize'>customer review</h4>
//                 <div className='flex justify-start items-start w-full gap-5'>
//                     <Rating
//                         name="text-feedback"
//                         value={getTotalAvg(singleProduct?.startRatings, singleProduct?.productItems[0]?.reviewsAndRatings.length)}
//                         readOnly
//                         precision={0.5}
//                         emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//                     />
//                     <p className='text-[16px]'>Based on {singleProduct?.productItems[0]?.reviewsAndRatings.length} reviews</p>
//                 </div>
//                 <div className='flex flex-col justify-start items-start w-full gap-2'>
//                     {
//                         singleProduct && singleProduct.startRatings.length > 0 && singleProduct.startRatings.map(reviews => {
//                             const percentage = (reviews.totalCount * 100) / singleProduct.productItems[0].reviewsAndRatings.length;
//                             return (
//                                 <div className='flex justify-start items-start w-full gap-3'>
//                                     <p>{reviews._id.$numberDecimal}</p>
//                                     <StarIcon style={{ opacity: 0.55 }} />

//                                     <div className='flex justify-between items-start w-full gap-5 p-0'>
//                                         <div className="w-full bg-gray-200 rounded-full h-2.5  dark:bg-gray-700">
//                                             <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${percentage}%`}}></div>
//                                         </div>
//                                         <div >{percentage}%</div>
//                                     </div>
//                                 </div>
//                             )
//                         })
//                     }

//                 </div>
//             </div>
//             <div>
//                 <h4 className='font-semibold text-[25px] py-2'>Share your thoughts</h4>
//                 <h4 className='text-[15px] opacity-60'>If you’ve used this product, share your thoughts with other customers</h4>
//             </div>
//             <button className='border border-grey-500 outline-none w-full text-[16px] px-10 py-2 rounded-md hover:bg-[#f9fafb]'>write a review</button>
//             <form onSubmit={submitHandler} className='w-full flex flex-col justify-center items-center gap-5 p-2 border border-[#e5e7eb] rounded-lg '>
//                 <div className='flex justify-between items-center w-full'>
//                     <p>start Rating :</p>
//                     <p>
                        // <Rating
                        //     name="half-rating"
                        //     defaultValue={5}
                        //     onChange={(event, newValue) => { setRatingValue(newValue) }}
                        //     precision={0.5}
                        // />
//                     </p>
//                 </div>

//                 <TextField
//                     type='text'
//                     fullWidth
//                     error={commentError}
//                     id="outlined-error-helper-text"
//                     label="Comment"
//                     name="comment"
//                     value={comment}
//                     helperText={commentError}
//                     onChange={(e) => setComment(e.target.value)}
//                 />
//                 <button type="submit" className='w-full bg-indigo-600 p-3 text-white rounded-lg uppercase hover:bg-indigo-800 disabled:bg-indigo-300 disabled:cursor-not-allowed'> submit</button>
//             </form>
//         </div>
//     </Grid>
//     <Grid item xs={12} md={7}>
// <div className='flex flex-col justify-start items-start w-full'>
//     {
//         singleProduct && singleProduct?.productItems[0]?.reviewsAndRatings.map(comment => (<CommentCard comment={comment} />))
//     }
// </div>
//     </Grid>
// </Grid>
// </Container>