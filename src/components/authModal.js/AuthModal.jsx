import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Login from '../../pages/login/Login';
import Register from '../../pages/register/Register';
import { useState } from 'react';
import { Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { closeAuthModal } from '../../redux/Auth/Actions';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'white',
    border: 'none',
    outline: 'none',
    borderRadius: '10px',
    overflow: 'hidden',
};

const AuthModal = () => {
    const authState = useSelector(state=>state.auth)
    const dispatch = useDispatch()
    const [page, setPage] = useState("login")

    const pageHandler = () => {
        let nextPage = page
        if (nextPage == "login"){
            nextPage = "register"
        }else{
            if (nextPage == "register"){
                nextPage = "login"
            } 
        }

        setPage(nextPage)
    }

    const handleClose = () =>{
        dispatch(closeAuthModal())
    }
    return (
        <Modal
            open={authState.authModalState}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Grid container lg={12} md={12} sm={12}>
                    <Grid item lg={6} md={6} sm={12} >
                        {
                            page == "login" ? <Login handleClose={handleClose}/> : page == "register" ? <Register /> : null
                        }
                    </Grid>
                    <Grid item lg={6} md={6} sm={0} className='relative flex justify-center items-center w-full'>
                        <img className="relative w-full h-full object-cover object-center " src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="pic" />
                        <div className='absolute top-50 left-50 flex justify-center items-center w-full p-5'>
                            <h3 className='font-bold text-indigo-600 text-[25px]'>{page == "login" ? "Don't have an account ?" : "Already have an account ?"} <br /><span className='text-[18px] underline font-normal cursor-pointer' onClick={pageHandler}>{page == "login" ? "create an account now." : "sign in to your account now."}</span></h3>
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}

export default AuthModal