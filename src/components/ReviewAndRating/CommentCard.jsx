import { Rating } from '@mui/material'
import React from 'react'
import StarIcon from '@mui/icons-material/Star';

const CommentCard = (props) => {
    const { id, userId, review, rating } = props.comment
    return (
        <div className='flex justify-start items-start w-full md:w-1/2 gap-5 border-b border-border-color py-5' key={id}>
            <div className="flex basis-1/2 justify-start items-start">
                <div className='w-[52px] h-[52px] overflow-hidden rounded-full'>
                    <img src={userId[0]?.profilePic} alt="user profile pic" className='w-full h-full bg-cover bg-left-top' />
                </div>
            </div>
            <div className='flex  flex-col justify-start items-start gap-5'>
                <div className='flex justify-start items-start w-full gap-3'>
                    <p className='text-[#1D2939] font-semibold capitalize'>{userId[0]?.name}</p>
                    <Rating
                        name="text-feedback"
                        value={rating.$numberDecimal}
                        readOnly
                        precision={0.5}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                </div>
                <p className='text-[#1D2939] text-[15px] font-Inter'>Greate Product</p>
                <p className='text-[#667085] text-[15px] font-Inter'>{review} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, vel voluptate ex quasi dicta voluptates quisquam incidunt consequuntur voluptatum. Dolores at minima sunt natus asperiores omnis beatae dolorum doloremque! Quaerat repudiandae vitae debitis est soluta fugit nam nobis deleniti tempore nemo, unde cum tempora quisquam possimus officiis, blanditiis itaque? Ex!</p>
            </div>
        </div>
    )
}
export default CommentCard