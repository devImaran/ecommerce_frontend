import React, { useState } from 'react'

import { Divider, TextField } from '@mui/material'
import { formValidation } from '../../utils/formValidation'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { login } from '../../redux/Auth/Actions'

const Login = ({handleClose}) => {
  const dispatch =  useDispatch()
  const authState =  useSelector(state=> state.auth)

  const [inputValue, setinputValue] = useState({
    email: 'demo@gmail.com',
    password: '1234'
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
      dispatch(login(inputValue))
      handleClose()
    }
  }

  useEffect(()=>{
    setError(authState.fieldError)
  },[authState.fieldError])

  return (
    <form className='p-10' onSubmit={handleSubmit}>
      <div className='flex flex-col justify-start items-start w-full gap-5'>
        <TextField
          type='text'
          fullWidth
          error={error?.email}
          id="outlined-error-helper-text"
          label=" Email Address"
          name="email"
          value={inputValue.email}
          helperText={error?.email}
          onChange={(e) => inputHandler(e)}
        />
        <TextField
          fullWidth
          type='text'
          error={error?.password}
          id="outlined-error-helper-text"
          label="password"
          name="password"
          value={inputValue.password}
          helperText={error?.password}
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

export default Login
