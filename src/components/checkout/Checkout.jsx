import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Address from './Address';
import OrderSummary from './OrderSummary';
import Payment from './Payment';
import { teal } from '@mui/material/colors'

const steps = ['Delivery Address', 'Order summary', 'Payment'];

export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [addressId, setAddressId] = useState(null);
    const [selectedAddress, setSelectedAddress]=useState(null)

    const addressHandler = (addressData, id) =>{
        setSelectedAddress(addressData)
        setAddressId(id)
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    return (
        <Container className='py-5'>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps} >
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Box sx={{ flex: '1 1 auto' }} />
                        </Box>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {
                            activeStep == 0 ? <Address addressId={addressId} addressHandler={addressHandler}/> : activeStep == 1 ? <OrderSummary selectedAddress={selectedAddress} handleNext={handleNext}/> : activeStep == 2 ? <Payment addressId={addressId}/>: null
                        }
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                variant="outlined" 
                                size="large"
                                sx={{
                                    mr: 1,
                                    background: '#2dd4bf', 
                                    color: 'white', 
                                    padding:'5px 20px',
                                    ":hover": {
                                        background: 'white',
                                        border: "1px solid #2dd4bf",
                                        color: '#2dd4bf'
                                    }
                                }}>
                                Back
                            </Button>
                            {activeStep == 0 && (<><Box sx={{ flex: '1 1 auto' }} />
                            <Button onClick={handleNext} size="large" disabled={!selectedAddress} 
                            sx={{
                                background: '#2dd4bf', 
                                color: 'white', 
                                padding:'5px 20px',
                                ":hover": {
                                    background: 'white',
                                    border: "1px solid #2dd4bf",
                                    color: '#2dd4bf'
                                }
                            }}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button></>)}
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </Container>
    );
}