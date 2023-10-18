import { Container } from '@mui/material'
import React from 'react'
import { footerData } from './data'
import { Link } from 'react-router-dom'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
    return (
        <footer className='bg-[#3C4242] sm:px-0 md:px-5 py-10'>
            <Container>
                <div className='flex flex-col justify-center items-center w-full lg:py-5 md:py-5 sm:p-0 gap-5'>
                    <div className='flex flex-col justify-start items-start w-full md:p-5 sm:px-0 gap-5 border-b border-border-color '>
                        <div className='flex flex-row justify-between sm:gap-2 md:gap-5 lg:gap-5 items-start flex-wrap w-full md:p-5 sm:p-0'>
                            {
                                footerData.map(item => (
                                    <div className='flex flex-col justify-start items-start'>
                                        <p className='text-[#F6F6F6] text-[1.2rem] font-semibold capitalize font-Inter'>{item.header}</p>
                                        {
                                            item.data.map(data => (
                                                <div className='flex flex-col justify-start items-start w-full py-1 opacity-[50%]'>
                                                    <Link to={data.path} className='text-[#F6F6F6] text-[16px] font-normal capitalize font-Inter'>
                                                        {data.name}
                                                    </Link>
                                                </div>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <div className='flex justify-center md:justify-start items-start w-full px-5'>
                            <div className='w-[38px] h-[38px] overflow-hidden rounded-lg'>
                                <FacebookIcon className="text-white w-full h-full bg-cover"/>
                            </div>
                            <div className='w-[38px] h-[38px] overflow-hidden rounded-lg'>
                                <InstagramIcon className="text-white w-full h-full bg-cover"/>
                            </div>
                            <div className='w-[38px] h-[38px] overflow-hidden rounded-lg'>
                                <TwitterIcon className="text-white w-full h-full bg-cover"/>
                            </div>
                            <div className='w-[38px] h-[38px] overflow-hidden rounded-lg'>
                                <LinkedInIcon className="text-white w-full h-full bg-cover"/>
                            </div>
                        </div>
                    </div>
                    <p className='text-[15px] text-white font-Inter font-semibold'>{`Copyright © ${new Date().getFullYear()} dev-emm. All rights reserved.`}</p>
                </div>
            </Container>
        </footer>
    )
}

export default Footer