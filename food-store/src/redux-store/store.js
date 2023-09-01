import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/cart.slice';
import orderReducer from './order/order.slice';
import userAccountReducer from './userAccount/userAccount.slice';
import productReducer from './product/product.slice'
import categoryReducer from './category/category.slice'
import dashboardReducer from './dashboard/dashboard.slice'
import thunk from 'redux-thunk'; 

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
    userAccount: userAccountReducer,
    product: productReducer,
    category: categoryReducer,
    dashboard: dashboardReducer,
    middleware: [thunk]
  },
});

export default store;
