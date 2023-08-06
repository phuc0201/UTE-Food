import React from "react";
import { Link } from "react-router-dom";
import './productCard.scss'
import StarRatings from 'react-star-ratings';
import { RiShoppingBasket2Line, RiHeart3Fill } from "react-icons/ri";
const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  });

function Rating() {
    return (
        <StarRatings
            rating={3.5}
            starRatedColor="#f7c942"
            numberOfStars={5}
            starDimension="20px"
            starSpacing="2px"
        />
    );
}
const ProductCard = (props) =>{
    const { id, title, image01, price } = props.item;
    return(
        <div className="product__card">
            <div className="product__content">
                <Link to={`/addToWishlist/${id}`}>
                    <RiHeart3Fill className="product__heart-icon"/>
                </Link>
                <Link to={`/product/${id}`}>
                    <div className="product__img" style={{backgroundImage: `url("${image01}")`}}></div>
                    <Rating/>
                    <h5 className="product__title">{title}</h5>
                </Link>
            </div>
            <div style={{
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center'
            }}>
                <div className="product__price">{formatter.format(price)}</div>
                <Link to={`/addToCart/${id}`}>
                    <RiShoppingBasket2Line className="cart-icon--button"/>
                </Link>
            </div>
        </div>
    )
}
export default ProductCard