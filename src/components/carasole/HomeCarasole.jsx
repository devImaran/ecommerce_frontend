import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { homeCarasoleData } from './data'


const items = homeCarasoleData.map(item => <img width="100%" src={item.image} alt={item.image} role="presentation" />)

const HomeCarasole = () => {
    return (
        <AliceCarousel
            items={items}
            autoPlay
            autoPlayInterval={1000}
            disableButtonsControls
            infinite
            mouseTracking
        />
    )
}

export default HomeCarasole