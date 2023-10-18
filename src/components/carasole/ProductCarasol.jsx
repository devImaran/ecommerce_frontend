import React, { useState } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Card from '../card/Card';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const ProductCarasol = ({ sectionName, data }) => {
    const [activeIndex, setActiveIndex] = useState(0)

    const items = data.map(({ title, image, desc }) => <Card title={title} desc={desc} image={image} />)
    const responsive = {
        0: {
            items: 1.1,
        },
        720: {
            items: 2.3,
        },
        1024: {
            items: 3.7,
        }
    };

    const slidePrev = ()=>setActiveIndex(activeIndex-1)
    const slideNext = ()=>setActiveIndex(activeIndex+1)

    const syncActiveIndex = ({item})=>setActiveIndex(item)

    return (
        <div className='relative flex flex-col justify-start items-start px-8 lg:px-10 py-10'>
            <h3 className='font-bold uppercase text-3xl font-Inter text-text-main px-6 mb-8 border-l-[10px] border-main-color'>{sectionName}</h3>
            <div className='relative w-full flex'>
                <AliceCarousel
                    items={items}
                    responsive={responsive}
                    mouseTracking
                    disableDotsControls
                    disableButtonsControls
                    activeIndex={activeIndex}
                    onSlideChanged={syncActiveIndex}
                />
                { activeIndex > 0 && <ArrowCircleLeftIcon onClick={slidePrev} fontSize='large' className="absolute top-1/2 -left-4 cursor-pointer hover:text-blue-300" />}
                { activeIndex <(items.length-5) && <ArrowCircleRightIcon onClick={slideNext} fontSize='large' className="absolute top-1/2  -right-4 cursor-pointer  hover:text-blue-300" />}
            </div>
        </div>
    )
}

export default ProductCarasol