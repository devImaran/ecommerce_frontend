import { Container } from '@mui/material'
import React from 'react'
import './Display.scss'
import Card from '../../../components/card/Card'
import Button from '../../../components/button/Button'

const Display = ({heading, isButtonRequired}) => {
  return (
    <Container>
        <div className='display'>
            <div className='heading'>
                <p>{heading}</p>
                <div className='slide-button'>
                    <Button text="prev" b/>
                    <Button text="next"/>
                </div>
            </div>
            <div className='scroll-area'>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
    </Container>
  )
}

export default Display