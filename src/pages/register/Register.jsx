import React, { useState } from 'react'

import { Divider, TextField } from '@mui/material'
import { formValidation } from '../../utils/formValidation'

const Register = () => {
  const [inputValue, setinputValue] = useState({
    email: 'demo@gmail.com',
    password: '1234  '
  })

  const [error, setError] = useState({
    email: '',
    password: ''
  })

  const inputHandler = (e) => {
    setinputValue({
      ...inputValue,
      [e.target.name]: e.target.value
    })
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    const { isValid, fieldErrors } = formValidation(inputValue)
    setError(fieldErrors)
    if (isValid) {

    }

  }
  return (

    <form className='p-10' onSubmit={handleSubmit}>
      <div className='flex flex-col justify-start items-start w-full gap-5'>
        <TextField
          type='text'
          fullWidth
          error={error.email}
          id="outlined-error-helper-text"
          label="Name"
          name="name"
          value={inputValue.name}
          helperText={error.name}
          onChange={(e) => inputHandler(e)}
        />
        <TextField
          type='text'
          fullWidth
          error={error.email}
          id="outlined-error-helper-text"
          label=" Email Address"
          name="email"
          value={inputValue.email}
          helperText={error.email}
          onChange={(e) => inputHandler(e)}
        />
        <TextField
          fullWidth
          type='password'
          error={error.password}
          id="outlined-error-helper-text"
          label="password"
          name="password"
          value={inputValue.password}
          helperText={error.password}
          onChange={(e) => inputHandler(e)}
        />
        <TextField
          fullWidth
          type='number'
          error={error.phoneNumber}
          id="outlined-error-helper-text"
          label="phone Number"
          name="phoneNumber"
          value={inputValue.phoneNumber}
          helperText={error.phoneNumber}
          onChange={(e) => inputHandler(e)}
        />
      </div>
      <div className='flex flex-col justify-end items-end w-full gap-5 mt-5'>
        <button type='submit' className='w-full text-white bg-indigo-600 p-2 rounded-lg capitalize font-semibold hover:bg-indigo-800'>sign up</button>
        <Divider className='w-full'>or</Divider>
        <div className='flex justify-between items-end w-full gap-3'>
          <button type='submit' className='w-full text-black border bored-grey-800 p-2 rounded-lg capitalize font-semibold hover:opacity-50'>google</button>
          <button type='submit' className='w-full text-white bg-black p-2 rounded-lg capitalize font-semibold hover:opacity-50'>github</button>
        </div>
      </div>
    </form>
  )
}

export default Register