import React,{useState} from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import product from '../../assets/fake-data/products'
import { AiOutlineCloseCircle } from "react-icons/ai";
import './cart.scss'
import { Link } from "react-router-dom";
const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  });

const CartItem=()=>{
    const [quantity, setQuantity] = useState(1);
    const Increase=()=>{
        setQuantity(quantity+1)
    }
    const Decrease=()=>{
        quantity > 1 ? setQuantity(quantity-1) : setQuantity(1)
    }
    return(
        <tr>
            <td style={{
                cursor:'pointer'
            }}>
                <AiOutlineCloseCircle className="cancel--icon"/>
            </td>
            <td>
                <div className="product-image">
                    <img src={product[0].image01} alt="product image" height={70} width={70}/>
                </div>
            </td>
            <td>
                <span className="product-name">Pizza</span>
            </td>
            <td>
                XL
            </td>
            <td>
                <div className="product-price">
                    {formatter.format(product[0].price)}
                </div>
            </td>
            <td>
                <div className="product-quantity-added">
                    <button className="quantity--minus" onClick={Decrease}>-</button>
                    <div className="quantity--number">{quantity}</div>
                    <button className="quantity--plus" onClick={Increase}>+</button>
                </div>
            </td>
            <td>
                {formatter.format(product[0].price)}
            </td>
        </tr>
    )
}
const CartTotals = ()=>{
    return(
        <div className="cart-totals">
            <h2>CART TOTALS</h2>
            <div>
                <div className="subtotal">
                    <h5>Subtotal</h5>
                    <span> {formatter.format(product[0].price)} </span>
                </div>
                <div className="delivery-fees">
                    <h5>Delivery fees</h5>
                    <span> {formatter.format(product[0].price)}</span>
                </div>
                <div className="total-price">
                    <h5>Total</h5>
                    <span> {formatter.format(product[0].price)} </span>
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
const Cart = ()=>{
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
                                    <CartItem/>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <Col sm={12} md={12} lg={4}>
                        <CartTotals/>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Cart