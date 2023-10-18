import React from 'react'
import Container from '../../../components/container/Container'
import './Browse.scss'
import casual from '../../../assets/images/casual.png'
import party from '../../../assets/images/party.png'
import formal from '../../../assets/images/formal.png'
import gym from '../../../assets/images/gym.png'
import { useNavigate } from 'react-router-dom'
const Browse = () => {
    const navigation = useNavigate()

    const redirectHandler = () =>{
        navigation('/shop/casual')
    }
  return (
    <Container>
        <div className='browse-area'>
            <div className='heading'>
                BROWSE BY dress STYLE
            </div>
            <div className='cards-area'>
                <div className='card' onClick={redirectHandler}>
                    <img src={casual}/>
                    <h1>casual</h1>
                </div>

                <div className='card'>
                    <img src={formal}/>
                    <h1>formal</h1>
                </div>

                <div className='card'>
                    <img src={party}/>
                    <h1>party</h1>
                </div>

                <div className='card'>
                    <img src={gym}/>
                    <h1>gym</h1>
                </div>
            </div>
        </div>
    </Container>
  )
}

export default Browse