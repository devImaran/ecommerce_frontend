import { Divider, Grid } from '@mui/material'
import React, {useEffect, useState} from 'react'
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import AddressCard from './AddressCard'
import { addUserAddress, fetchUserAddresses } from '../../redux/address/actions';
import { useSelector, useDispatch } from 'react-redux';
import { formValidation } from '../../utils/formValidation';


const Address = ({addressHandler, addressId}) => {
    const dispatch = useDispatch()
    const [inputHandler, setInputHandler] =useState({
        email:null,
        firstName:null,
        lastName:null,
        address:null,
        postalCode: null,
        phoneNumber: null
    })

    const [error, setError] =useState({
        email:'',
        firstName:'',
        lastName:'',
        address:'',
        postalCode: '',
        phoneNumber: ''
    })


    const { userDetails, loading } = useSelector( state => state.auth)

    const radioHandler = (event) => {
        const address = userDetails?.address.filter(item=> item._id === event.target.value)
        addressHandler(address[0],event.target.value)
    };

    const submitHandler = (e)=>{
        e.preventDefault()
        const { isValid, fieldErrors } = formValidation(inputHandler)
        setError(fieldErrors)
        if (isValid){
            console.log(inputHandler)
            dispatch(addUserAddress(inputHandler))
        }
        setInputHandler({
            email:null,
            firstName:null,
            lastName:null,
            address:null,
            postalCode: null,
            phoneNumber: null
        })
    }

    const onChangeHandler = (e) =>{
        setInputHandler((prev)=>{
            return {
                ...prev,
                [e.target.name]:e.target.value
            }
        })
    }

    // useEffect(()=>{
    //     dispatch(fetchUserAddresses())
    // },[loading, userDetails])

    return (
        <div className='flex justify-start items-start w-full gap-2 p-5'>
                <div className="w-1/2 flex justify-start items-start">
                    <div className="flex flex-col justify-start items-start w-full px-5 py-10 border border-main-color rounded-lg">
                        <h4 className='capitalize font-bold text-[20px] text-text-primary font-Inter border-l-8 px-4 border-main-color'>Saved Addresses</h4>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={addressId}
                            onChange={radioHandler}
                            className="flex flex-col justify-start items-start w-full wrap my-5 gap-3"
                        >   
                            { (userDetails.address && userDetails.address.length > 0 )?  userDetails.address.map(address => <AddressCard address={address}/>) : <h3>No Saved address</h3>}
                        </RadioGroup>
                    </div>
                </div>
            <div className="w-1/2 flex justify-start items-start">
            <form onSubmit={submitHandler} className='flex flex-col justify-start items-start w-full px-5 py-10 border border-main-color rounded-lg'>
                <div className='flex flex-col justify-start items-start w-full'>
                    <h4 className='capitalize font-bold text-[20px] text-text-primary font-Inter border-l-8 px-4 border-main-color'>contact information</h4>
                    <div className='my-5 w-full'>
                        <TextField
                            fullWidth
                            error={error?.email}
                            id="outlined-error-helper-text"
                            label=" Email Address"
                            defaultValue=""
                            helperText={error?.email}
                            name = "email"
                            onChange={onChangeHandler}
                        />
                    </div>
                </div>
                <Divider className='w-full py-2' />
                <div className='mt-5 w-full'>
                    <h4 className='capitalize font-bold text-[20px]  text-text-primary font-Inter border-l-8 px-4 border-main-color'>shipping information</h4>
                    <div className='flex justify-start items-start w-full gap-5'>
                        <div className='mt-5 w-full'>
                            <TextField
                                fullWidth
                                error={error?.firstName}
                                id="outlined-error-helper-text"
                                label="First Name"
                                defaultValue=""
                                name="firstName"
                                helperText={error?.firstName}
                            onChange={onChangeHandler}

                            />
                        </div>
                        <div className='mt-5 w-full'>
                            <TextField
                                fullWidth
                                error={error?.lastName}
                                id="outlined-error-helper-text"
                                label="Last Name"
                                defaultValue=""
                                helperText={error?.lastName}
                                name="lastName"
                            onChange={onChangeHandler}

                            />
                        </div>
                    </div>
                    <div className='my-5 w-full'>
                        <TextField
                            fullWidth
                            error={error?.address}
                            id="outlined-error-helper-text"
                            label="Address with appartment/house number"
                            defaultValue=""
                            helperText={error?.address}
                            name="address"
                            onChange={onChangeHandler}

                        />
                    </div>
                    <div className='my-5 w-full'>
                        <TextField
                            fullWidth
                            error={error?.postalCode}
                            id="outlined-error-helper-text"
                            label="Postal code"
                            defaultValue=""
                            helperText={error?.postalCode}
                            name="postalCode"
                            onChange={onChangeHandler}

                        />
                    </div>
                    <div className='my-5 w-full'>
                        <TextField
                            fullWidth
                            error={error?.phoneNumber}
                            id="outlined-error-helper-text"
                            label="Phone"
                            defaultValue={error?.phoneNumber}
                            helperText=""
                            name="phoneNumber"
                            onChange={onChangeHandler}

                        />
                    </div>
                </div>
                <button type="submit" className="w-full outline-none border-none bg-main-color p-3 capitalize text-white text-[15px] font-semibold rounded-lg hover:bg-second-color">add</button>
            </form>
            </div>
        </div>
    )
}

export default Address