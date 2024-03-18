import { configureStore } from '@reduxjs/toolkit'
import productReducer from './slice/counterSlice';
export default configureStore({
  reducer: {
    cart: productReducer
  }
})