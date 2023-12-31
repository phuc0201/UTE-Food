import React from "react";
import { Routes, Route} from "react-router-dom";
import Home from "../../pages/Home/Home.jsx";
import Cart from "../../pages/Cart/Cart.jsx";
import ProductDetail from "../../pages/ProductDetail/ProductDetail.jsx";
import Wishlist from "../../pages/Wishlist/Wishlist.jsx";
import Checkout from "../../pages/Checkout/Checkout.jsx";
import PrivateRoutes from "./PrivateRoutes.js";
import Auth from "../../pages/Auth/Auth.jsx";
import Product_Category from "../../pages/Product_Category/Product_Category.jsx";
import UserAccount from '../../pages/UserAccount/UserAccount.jsx'
import AdminPage from '../../pages/Admin/Admin.jsx'
const Routers = () => {
    return(
        <Routes>
            <Route path="/auth" element={<Auth/>}/>
            <Route element={<PrivateRoutes/>}>
                <Route path='/' element={<Home/>}/>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/wishlist' element={<Wishlist/>}/>
                <Route path='/checkout' element={<Checkout/>}/>
                <Route path="/product/:id" element={<ProductDetail/>}/>
                <Route path="/category/:id" element={<Product_Category/>}/>
                <Route path="/my-account/:option" element={<UserAccount/>}/>
                <Route path='/admin/:option' element={<AdminPage/>}/>
            </Route>
        </Routes>
    )
}
export default Routers