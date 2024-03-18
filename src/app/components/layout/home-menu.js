"use client"
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addProduct, deleteProduct } from '../../../redux/slice/counterSlice'

import SectionHeaders from './sectionheader';
import {Items} from './productItem'



export default function HomeMenu() {
    const [products, setProducts] = useState([
        { id: 1, img_url: '/img/pizza.png', title: 'Pizza with Pepperoni', price: 12, des: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
        { id: 2, img_url: '/img/pizza.png', title: 'Pizza Margherita', price: 10, des: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
        { id: 3, img_url: '/img/pizza.png', title: 'Veggie Pizza', price: 11, des: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
        { id: 4, img_url: '/img/pizza.png', title: 'Normal Pizza', price: 8, des: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
        { id: 5, img_url: '/img/pizza.png', title: 'Normal Pizza', price: 8, des: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
        { id: 6, img_url: '/img/pizza.png', title: 'Normal Pizza', price: 89, des: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
        { id: 7, img_url: '/img/pizza.png', title: 'Normal Pizza', price: 810, des: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s" },
    ])
    const [cart, setCart] = useState([])

    const dispatch = useDispatch()

    const CartProducts = useSelector(state => state.cart.CartArr)

    useEffect(() => {
        localStorage.setItem('cartItem', JSON.stringify(CartProducts));
      }, [CartProducts]);


    useEffect(() => {
        localStorage.setItem('cartCount', cart.length)
    }, [cart])

    return (
        <>
        <SectionHeaders mainHeader= "Menu" subHeader="Fast"/>
        <div className='grid-product mb-4'>
            {products?.length > 0 && products.map((product, key) => (
                <Items product={product} key={key} dispatch={dispatch}/>
            ))}
        </div>
        </>
    )
}
