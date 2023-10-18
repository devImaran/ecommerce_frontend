import React, { useState } from 'react'

import { Divider, Grid, TextField } from '@mui/material'
import { Link } from 'react-router-dom'

const AuthLayout = ({ children, buttonName, pageText, pageDesc, pageLink , pageHandler}) => {
  // const [page, setPage] = useState("login")
  return (

    <Grid container lg={12} md={12} sm={12}>
      <Grid item lg={6} md={6} sm={12} >
        {children}
      </Grid>
      <Grid item lg={6} md={6} sm={0} className='relative flex justify-center items-center w-full'>
        <img className="relative w-full h-full object-cover object-center " src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="pic" />
        <div className='absolute top-50 left-50 flex justify-center items-center w-full p-5'>
          <h3 className='font-bold text-indigo-600 text-[25px]'>{pageText} <br /><span className='text-[18px] underline font-normal'><button className='border-none outlin-none' onClick={()=>pageHandler(pageLink)}>{pageDesc}</button></span></h3>
        </div>
      </Grid>
    </Grid>

  )
}

export default AuthLayout