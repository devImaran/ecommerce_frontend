import React from 'react'

const ProductDescription = ({ data }) => {
    return (
        <div className='flex flex-col justify-start items-start w-full gap-10 px-2 py-0 md:py-5'>
            <div className='flex flex-col justify-start items-start w-full md:w-[90%] gap-5'>
                <p className='text-[#344054] text-[24px] font-Inter font-bold'>Product Description</p>
                <span className='text-[#667085] text-[12px] md:text-[16px] leading-6 font-Inter'>{data?.description}</span>
            </div>
            <div className='flex flex-col justify-start items-start w-full md:w-[90%] gap-5'>
                <p className='text-[#344054] text-[24px] font-Inter font-bold'>Product Details</p>
                <ul className='list-none flex flex-col justify-start items-start w-full gap-5'>
                    {
                        data && data.details && data.details.length > 0 && data.details.map(item => (
                            <li className='flex justify-start items-center w-full text-[#667085] text-[12px] md:text-[16px] leading-6 font-Inter gap-3'>
                                <div className='w-[10px] h-[10px] bg-main-color rounded-full ring ring-offset-2 ring-main-color'></div>
                                <p>{item}</p>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default ProductDescription