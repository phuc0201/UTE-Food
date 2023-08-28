import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cart.slice';
import orderReducer from './order/order.slice';
import userAccountReducer from './userAccount/userAccount.slice';
import productReducer from './product/product.slice'
import thunk from 'redux-thunk'; 
import productSlice from './product/product.slice';
const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    userAccount: userAccountReducer,
    product: productSlice,
    middleware: [thunk]
  },
});

export default store;
