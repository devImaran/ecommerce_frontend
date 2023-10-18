import { Divider, Grid } from '@mui/material'
import React from 'react'
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const AddressCard = ({ address }) => {
    return (
        <div className="flex justify-start items-center w-full bg-[#F6F6F6] rounded-lg p-3" key={address?._id}>
            <FormControlLabel value={address?._id} control={<Radio />} />
            <div className="font-semibold capitalize text-[15px]">
                <h4 className='text-[20px] font-semibold font-Inter text-text-primary'>{address?.name}</h4>
                <p className='text-[16px] font-normal text-[#807D7E] font-Inter'>{address?.address}</p>
                <span className='text-[16px] font-normal text-[#807D7E] font-Inter'>Mob -{address?.phoneNumber}</span>
            </div>
        </div>
    )
}

export default AddressCard