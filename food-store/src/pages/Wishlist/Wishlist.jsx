import React, {useState} from "react";
import { RiShoppingBasket2Line } from "react-icons/ri";
import { AiOutlineCloseCircle } from "react-icons/ai";
import products from '../../assets/fake-data/products'
import './wishlist.scss'
import { Link } from "react-router-dom";
const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  });

const WishlistItem = () => {
    return(
        <div className="wishlist-item">
            <div className="product">
                <AiOutlineCloseCircle className="close-icon"/>
                <Link to={`/product/${products[0].id}`} style={{
                    display:'flex',
                    alignItems:'center'
                }}>
                    <img src={products[0].image01} className="product-image" alt="product image" width={100} height={100}/>
                    <div className="product-content">
                        <span className="product-name">{products[0].title}</span>
                        <span className="product-price">{formatter.format(products[0].price)}</span>
                    </div>
                </Link>
            </div>
            <button className="product-addToCart--button">
                <RiShoppingBasket2Line className="cart-icon--button"/>
            </button>
        </div>
    );
}
const Wishlist=()=>{

    return(
        <div id="wishlist">
            <WishlistItem/>
            <WishlistItem/>
            <WishlistItem/>
            <WishlistItem/>
            <WishlistItem/>
            <WishlistItem/>
            <WishlistItem/>
            <WishlistItem/>
            <WishlistItem/>
            <WishlistItem/>
            <WishlistItem/>
            <WishlistItem/>
        </div>
    )
}
export default Wishlist