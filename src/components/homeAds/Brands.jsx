import React from 'react'
import NikeLogo from '../../assets/nike.png'
import HnMLogo from '../../assets/hnm.png'
import LevisLogo from '../../assets/levis.png'
import PumaLogo from '../../assets/puma.png'
import UsLogo from '../../assets/us.png'

const brandData = [
    {
        name: 'nike',
        logo: NikeLogo
    },
    {
        name: 'H&M',
        logo: HnMLogo
    },
    {
        name: 'levis',
        logo: LevisLogo
    },
    {
        name: 'puma',
        logo: PumaLogo
    },
    {
        name: 'us-polo',
        logo: UsLogo
    }
]

const Brands = () => {
    return (
        <div className='flex flex-col justify-center items-center w-full p-5 md:p-10  my-5 bg-[#3C4242] gap-5'>
            <p className='text-[#fff] font-Inter font-bold text-[2rem] md:text-[3rem]  capitalize'>top brands deal</p>
            <span className='text-[#fff] font-Inter font-normal text-[1rem] md:text-[1.375rem]'>upto <span className='text-[#FBD103] font-semibold'>60%</span> off on brands</span>
            <div className='flex justify-center items-center w-full gap-5 flex-wrap'>
                {brandData.map(item => (<div className='w-[166px] md:w-[178px] h-[86px] overflow-hidden rounded-lg bg-white flex justify-center items-center'>
                    <img src={item.logo} alt={item.name} className='bg-cover w-[149px] h-[54px]' />
                </div>))}
            </div>
        </div>
    )
}

export default Brands