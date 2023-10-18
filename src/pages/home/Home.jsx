import React from 'react'
import HomeCarasole from '../../components/carasole/HomeCarasole'
import ProductCarasol from '../../components/carasole/ProductCarasol'
import { kurta } from '../../components/carasole/data'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { categoriesWiseProducts } from '../../redux/categories/actions'
import Brands from '../../components/homeAds/Brands'
import Banner from '../../components/homeAds/Banner'

const Home = () => {


  return (

    <>
      <HomeCarasole />
      <ProductCarasol sectionName={`new arrivals`} data={kurta} />
      <Brands/>
      <Banner/>
    </>
  )
}

export default Home