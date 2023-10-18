import React from 'react'
import './Auth.scss'
import backgroundImage from '../../assets/images/shopping.jpg'
import { Link } from 'react-router-dom'
import { FiAlertCircle } from 'react-icons/fi';

const AuthLayout = ({type, children, linKTo, isImageRequired, isGoogleRequire}) => {
    return (
        <div className='form-background'>
            <div className='form'>
               { isImageRequired && <div className='image-area'>
                    <img src={backgroundImage} alt="image" />
                </div>}
                <div className='form-area' style={!isImageRequired ? { width: "100%"}:{ width: "60%"}}>
                    <div className='form-content'>
                        <div className='header'>

                            <div className='heading'>welcome to <span>shop.co</span>, <br /> {type == "login" ? 'sign in' :'sign up'} to continue</div>

                            <div className='sub-heading'>{type == "login" ? `Don't have an account? Create a account` : `Already have an account? Login to your account`} <br /> it takes less than a minute.</div>
                        </div>

                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout