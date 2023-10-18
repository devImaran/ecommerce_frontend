import React from 'react'
import BannerImage from '../../assets/banner.png'
// import BannerImage2 from '../../assets/'

const Banner = () => {
  return (
    <div className='flex justify-center items-center w-full relative h-[634px] p-5'>
        <div className='flex justify-center items-center basis-1/2 relative overflow-hidden w-full h-full'>
            <div className="absolute top-1/2 left-1/2">
                <h4 className='font-bold text-[34px] leading-10 letter tracking-wide font-Inter'>WE MADE YOUR EVERYDAY FASHION BETTER!</h4>
                <p className='text-[20px] text-white font-Inter'>In our journey to improve everyday fashion, euphoria presents EVERYDAY wear range - Comfortable & Affordable fashion 24/7</p>
            </div>
            <img src={BannerImage} alt="banner" className='relative w-full h-full'/>
        </div>
        <div className="flex justify-center items-center basis-1/2 overflow-hidden  w-full h-full">
            <img src={BannerImage} alt="banner"  className=' w-full h-full'/>
        </div>
    </div>
  )
}

export default Banner