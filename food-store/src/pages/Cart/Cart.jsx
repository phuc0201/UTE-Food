import React,{useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { AiOutlineCloseCircle } from "react-icons/ai";
import './cart.scss'
import { Link } from "react-router-dom";
import { endpoint } from "../../utils/data";
import Cookies from "js-cookie";
import {fetchCartItems} from '../../redux-store/cart/cart.thunks'
import { setCartItems } from "../../redux-store/cart/cart.slice";
const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  });

const CartItem=(props)=>{
    const [quantity, setQuantity] = useState(props.product.quantity);
    const handleQuantityChange = (price, newQuantity) => {
        setQuantity(newQuantity);
        props.onQuantityChange(price);
    };
    const handleIncrease = ()=>{
        handleQuantityChange(props.product.price, quantity + 1)
        const fetchData = async () => {
            fetch(`${endpoint}/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Cookies.get('authToken'),
                },
                body: JSON.stringify({
                    productID: props.product.productID,
                    quantity: 1
                }),
            })
            .then((response) => {
                if(response.status===200){
                    return response.json()
                }
            })
            .then((data) => {})
            .catch((error) => console.error(error));
        };
        fetchData();   
    }
    const handleDecrease=()=>{
        if(quantity > 1)
            handleQuantityChange(-props.product.price, quantity - 1)
        if(quantity === 1){
            let element = document.getElementById(`${props.product.id}`)
            element.parentNode.removeChild(element);
            handleQuantityChange(-props.product.price, 0)
        }
        fetch(`${endpoint}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('authToken'),
            },
            body: JSON.stringify({
                productID: props.product.productID,
                quantity: -1
            }),
        })
        .then((response) => {
            if(response.status===200){
                return response.json()
            }
        })
        .then((data) => {})
        .catch((error) => console.error(error));
    }
    const RemoveProduct =()=>{
        fetch(`${endpoint}/cart`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('authToken'),
            },
            body: JSON.stringify({
                cartItemID: props.product.id
            }),
        })
        .then((response) => {
            if(response.status===200){
                return response.json()
            }
        })
        .then((data) => {
            let element = document.getElementById(`${props.product.id}`)
            element.parentNode.removeChild(element);
        })
        .catch((error) => console.error(error));
    }
    return(
        <tr id={props.product.id}>
            <td style={{
                cursor:'pointer'
            }}>
                <AiOutlineCloseCircle className="cancel--icon" onClick={RemoveProduct}/>
            </td>
            <td>
                <Link to={`/product/${props.product.productID}`}>
                    <div className="product-image" style={{
                        width:70,
                        height: 70
                    }}>
                        <img src={props.product.image} alt="product image" height={70} width={70}/>
                    </div>
                </Link>
            </td>
            <td>
                <span className="product-name">{props.product.product_name}</span>
            </td>
            <td>
                XL
            </td>
            <td>
                <div className="product-price">
                    {formatter.format(props.product.price)}
                </div>
            </td>
            <td>
                <div className="product-quantity-added">
                    <button className="quantity--minus" onClick={handleDecrease}>-</button>
                    <div className="quantity--number">{quantity}</div>
                    <button className="quantity--plus" onClick={handleIncrease}>+</button>
                </div>
            </td>
            <td className="total-price">
                {formatter.format(props.product.price * quantity)}
            </td>
        </tr>
    )
}

const Cart = ()=>{
    const cartItems = useSelector((state) => state.cart.products);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const loading = useSelector((state) => state.cart.loading);
    const dispatch = useDispatch();

    const [subtotal, setSubtotal] = useState(totalPrice);
    const updateSubtotal = (productPrice) => {
        const updatedSubtotal = subtotal + productPrice;
        setSubtotal(updatedSubtotal);
    };

    useEffect(() => {
        dispatch(fetchCartItems())
        if (totalPrice !== subtotal) {
            setSubtotal(totalPrice);
        }
    }, [dispatch, totalPrice]);

    const CartTotals = ()=>{
        return(
            <div className="cart-totals">
                <h2>CART TOTALS</h2>
                <div>
                    <div className="subtotal">
                        <h5>Subtotal</h5>
                        <span> {formatter.format(subtotal)} </span>
                    </div>
                    <div className="delivery-fees">
                        <h5>Delivery fees</h5>
                        <span> {formatter.format(0)}</span>
                    </div>
                    <div className="total-price">
                        <h5>Total</h5>
                        <span> {formatter.format(subtotal)} </span>
                    </div>
                    <Link to={`/checkout`}>
                        <button className="checkout--button">
                            Đặt hàng
                        </button>
                    </Link>
                </div>
            </div>
        );
    }
    if(loading){
        return(
            <div>
                loading
            </div>
        )
    }

    return(
        <div className="cart">
            <Container>
                <Row>
                    <Col sm={12} md={12} lg={8}>
                        <div className="cart-details">
                            <Table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th>Product</th>
                                        <th>Size</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>SUBTOTAL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    cartItems.map((product)=>(
                                        <CartItem 
                                            product={product}
                                            onQuantityChange={updateSubtotal}
                                        />
                                    ))
                                }
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <Col sm={12} md={12} lg={4}>
                        <CartTotals subtotal = {subtotal}/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Cart