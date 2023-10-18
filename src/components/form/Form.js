import React from 'react'
import './Form.scss'
import backgroundImage from '../../assets/images/prod_image.png'
import { Link } from 'react-router-dom'
import { FiAlertCircle } from 'react-icons/fi';

const Form = () => {
    return (
        <div className='form-background'>
            <div className='form'>
                <div className='image'>
                    <img src={backgroundImage} alt="image" />
                </div>
                <div className='form-area'>
                    <div className='form-content'>
                        <div className='header'>

                            <div className='heading'>welcome to <span>shop.co</span>, <br /> signin to continue</div>

                            <div className='sub-heading'>Don't have an account? Create a account <br /> it takes less than a minute.</div>
                        </div>

                        <div className='inputs'>
                            <div className='input-box'>
                                <div className='label-error'>
                                    <label for="email">email</label>
                                    <div className='error'>
                                        <FiAlertCircle color="white" />
                                        <span>email already in use!</span>
                                    </div>
                                </div>
                                <input type="text" placeholder='Enter email' />
                            </div>

                             <div className='input-box'>
                                <div className='label-error'>
                                    <label for="email">email</label>
                                    <div className='error'>
                                        <FiAlertCircle color="white" />
                                        <span>email already in use!</span>
                                    </div>
                                </div>
                                <input type="text" placeholder='Enter email' />
                            </div>
                            


                            {/* <div className='input-box'>
                                <div className='label-error'>
                                    <label for="email">email</label>
                                    <div className='error'>
                                        <FiAlertCircle color="white" />
                                        <span>email already in use!</span>
                                    </div>
                                </div>
                                <input type="text" placeholder='Enter email' />
                            </div>

                            <div className='input-box'>
                                <div className='label-error'>
                                    <label for="email">email</label>
                                    <div className='error'>
                                        <FiAlertCircle color="white" />
                                        <span>email already in use!</span>
                                    </div>
                                </div>
                                <input type="text" placeholder='Enter email' />
                            </div>

                            <div className='input-box'>
                                <div className='label-error'>
                                    <label for="email">email</label>
                                    <div className='error'>
                                        <FiAlertCircle color="white" />
                                        <span>email already in use!</span>
                                    </div>
                                </div>
                                <input type="text" placeholder='Enter email' />
                            </div>

                            <div className='input-box'>
                                <div className='label-error'>
                                    <label for="email">email</label>
                                    <div className='error'>
                                        <FiAlertCircle color="white" />
                                        <span>email already in use!</span>
                                    </div>
                                </div>
                                <input type="text" placeholder='Enter email' />
                            </div>

                            <div className='input-box'>
                                <div className='label-error'>
                                    <label for="email">email</label>
                                    <div className='error'>
                                        <FiAlertCircle color="white" />
                                        <span>email already in use!</span>
                                    </div>
                                </div>
                                <input type="text" placeholder='Enter email' />
                            </div> */}

                        </div>
                        <div className='buttons'>
                            <button>sign in</button>
                            <button className='google'>sign in with google</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Form