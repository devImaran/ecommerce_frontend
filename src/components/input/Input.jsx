import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import './Input.scss'

const Input = ({type, name, placeholder, lableText, error, errorMsg, inputWidth, inputChangeHandler}) => {
    return (
        <div className='input-box' style={{width:`${inputWidth}px`}}>
            <div className='label-error'>
                <label for="email">{lableText}</label>
                {errorMsg && <div className='error'>
                    <FiAlertCircle color="white" />
                    <span>{errorMsg}</span>
                </div>}
            </div>
            <input type={type} name={name} placeholder={placeholder} onChange={(e)=>inputChangeHandler(e)}/>
        </div>
    )
}

export default Input