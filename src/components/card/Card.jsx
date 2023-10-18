import React from 'react'
import { useNavigate } from 'react-router-dom'
import { stringTruncate } from '../../utils/truncate'

const Card = ({ title, image, desc }) => {
    const navigate = useNavigate()
    return (
        <div className='cursor-pointer flex flex-col justify-start items-start' onClick={()=>navigate('/shop/product-detail/1')}>
            <div className='w-[271px] h-[394px] overflow-hidden rounded-lg'>
                <img className='w-full h-full object-cover object-top' src={image} />
            </div>
            <h3 className='px-1 py-2 text-[17px] font-semibold text-text font-Inter text-text-primary'>{stringTruncate(title,25)}</h3>
        </div>
    )
}

export default Card