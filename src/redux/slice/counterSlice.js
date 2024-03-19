"use client"
import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'products',
  initialState: {
    CartArr: JSON.parse(localStorage.getItem('cartItem')) || []
    
  },
  reducers: {
    addProduct: (state, action) => {
        const productIndex = state.CartArr.findIndex((p) => p.id === action.payload.id)
        console.log(action.payload)
        if(productIndex === -1){
            state.CartArr.push({...action.payload, quantity: 1})
        }else{
            state.CartArr[productIndex].quantity += 1
        }
        console.log("đã add")
    },
    deleteProduct: (state, action) => {
        const productIndexRemove = action.payload

        const newCart = state.CartArr.filter((item) => {
            return item.id !== productIndexRemove
        })
        state.CartArr = newCart
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    increaseQuantity: (state, action) => {
      const productIndex = state.CartArr.findIndex((p) => p.id === action.payload);
      if (productIndex !== -1) {
        state.CartArr[productIndex].quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const productIndex = state.CartArr.findIndex((p) => p.id === action.payload);
      if (productIndex !== -1 && state.CartArr[productIndex].quantity > 1) {
        state.CartArr[productIndex].quantity -= 1;
      } else {
        state.CartArr = state.CartArr.filter((item, index) => index !== productIndex);
      }
    },
  }
})

// Action creators are generated for each case reducer function
export const { addProduct, deleteProduct, increaseQuantity, decreaseQuantity } = counterSlice.actions

export default counterSlice.reducer