import { FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'
import React, { useState } from 'react'
import { placeOrder } from '../../redux/order/actions'
import { useDispatch } from 'react-redux'

const Payment = ({ addressId }) => {
  const dispatch = useDispatch()
  const [paymentValue, setPaymentValue] = useState('COD')

  const radioHandler = (e) => {
    setPaymentValue(e.target.value)
  }

  const placeOrderHandler = (e) => {
    e.preventDefault()
    if (paymentValue === "COD") {

      // place order
      // redirect to orders page with success message 
      dispatch(placeOrder(paymentValue, addressId))


    } else {
      if (paymentValue === "ONLINE") {

      }
    }
  }


  return (
    <div className='flex flex-col justify-start items-start gap-5 w-full p-5'>
      <Grid container sm={12} lg={12}>
        <div className=' flex flex-col justify-start items-start w-full px-5 py-10 border border-main-color rounded-lg'>
          <h3 className='font-semibold capitalize text-[30px] text-text-primary font-Inter border-l-8 border-main-color px-3'>Payment Method</h3>
          <div className='flex justify-end items-end w-full flex-col'>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-g roup"
              name="controlled-radio-buttons-group"
              value={paymentValue}
              onChange={radioHandler}
              className="flex flex-col justify-start items-start w-full wrap my-5 gap-3"
            >
              <div className="flex justify-start items-center w-full border border-main-color rounded-lg p-3">
                <FormControlLabel value="COD" control={<Radio />} />
                <div className="capitalize text-[15px]">
                  <h4 className='text-[20px] font-Inter text-text-primary '>COD</h4>
                </div>
              </div>

              <div className="flex justify-start items-center w-full border border-main-color rounded-lg p-3">
                <FormControlLabel value="ONLINE" control={<Radio />} />
                <div className="capitalize text-[15px]">
                  <h4 className='text-[20px] font-Inter text-text-primary '>Online payment</h4>
                </div>
              </div>
            </RadioGroup>

            <div className="flex justify-start items-center rounded-lg p-3 bg-main-color text-white text-[20px] hover:bg-second-color">
              <button type="button" className='px-5' onClick={placeOrderHandler} disabled={!paymentValue}>Place order</button>
            </div>
          </div>
        </div>
      </Grid>
    </div>
  )
}

export default Payment