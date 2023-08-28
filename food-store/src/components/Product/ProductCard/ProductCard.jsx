import React from "react";
import { Link } from "react-router-dom";
import './productCard.scss'
import StarRatings from 'react-star-ratings';
import { RiShoppingBasket2Line, RiHeart3Fill } from "react-icons/ri";
import { endpoint } from "../../../utils/data";
import Cookies from "js-cookie";
const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  });

function Rating(props) {
    return (
        <StarRatings
            rating={props.point}
            starRatedColor="#f7c942"
            numberOfStars={5}
            starDimension="20px"
            starSpacing="2px"
        />
    );
}
function addToCart(productID){
    fetch(`${endpoint}/cart`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': Cookies.get('authToken'),
        },
        body: JSON.stringify({
            productID: productID,
            quantity: 1
        }),
    })
    .then((response) => {
        if(response.status===200){
            return response.json()
        }
    })
    .then((data) => {
        alert(data.message)
    })
    .catch((error) => console.error(error));
}
const ProductCard = (props) =>{
    const { id, product_name, price, starRating } = props.item;
    let image;
    if(!props.item.image){ image = '' }
    else image = props.item.image[0]
    return(
        <div className="product__card">
            <div className="product__content">
                <Link to={`/addToWishlist/${id}`}>
                    <RiHeart3Fill className="product__heart-icon"/>
                </Link>
                <Link to={`/product/${id}`}>
                    <div className="product__img" style={{backgroundImage: `url("${image}")`}}></div>
                    <Rating point={starRating}/>
                    <h5 className="product__title">{product_name}</h5>
                </Link>
            </div>
            <div style={{
                display:'flex',
                justifyContent:'space-between',
                alignItems:'center'
            }}>
                <div className="product__price">{formatter.format(price)}</div>
                <Link onClick={()=>{addToCart(id)}}>
                    <RiShoppingBasket2Line className="cart-icon--button"/>
                </Link>
            </div>
        </div>
    )
}
export default ProductCard