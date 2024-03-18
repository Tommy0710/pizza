import Link from 'next/link';
import React, { useState } from 'react';
import { FaCartShopping } from "react-icons/fa6";
import { useSelector} from 'react-redux'

export default function CartIcon() {

  const CartProducts = useSelector(state => state.cart.CartArr);
  
  const cartLength = CartProducts.reduce((sum, item) => sum + item.quantity, 0);

  console.log(cartLength)
  return (
    <div className='relative w-8 h-8'>
      <Link href={'/cart'} className='absolute bottom-0'><FaCartShopping className='text-2xl text-primary' /></Link>
      {cartLength > 0 && ( // Only show the cart length if it is greater than 0
        <span className='absolute bottom-4 right-[-4px] px-1 bg-white shadow-md rounded-sm'>{cartLength}</span>
      )}
    </div>
  );
}

