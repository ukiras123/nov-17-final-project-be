import React from 'react'
import DefaultLayout from '../../components/Layout/defaultLayout/DefaultLayout'
import CartTable from './CartTable'

const Cart = () => {
  return (
   <DefaultLayout pageTitle={"Cart"}>

<CartTable/>

   </DefaultLayout>
  )
}

export default Cart