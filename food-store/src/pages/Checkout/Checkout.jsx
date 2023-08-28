import React, {useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from "react-bootstrap";
import './checkout.scss'
import formatter from '../../utils/FormatCurrency'
import { fetchCartItems } from "../../redux-store/cart/cart.thunks";
import { create_order } from "../../redux-store/order/order.thunks";
import { useEffect } from "react";
const Checkout = ()=>{
    const cartItems = useSelector((state) => state.cart.products);
    const totalPrice = useSelector((state) => state.cart.totalPrice);
    const loading = useSelector((state) => state.cart.loading);
    const [subtotal, setSubtotal] = useState(totalPrice);
    const [orderData, setOrderData] = useState({});
    const dispatch = useDispatch();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOrderData({
            ...orderData,
            [name]: value,
        });
    };
    const hanldeSubmit = (e) => {
        e.preventDefault()
        if(orderData.full_name.trim()!='' && orderData.address.trim()!='' && orderData.phone_number.trim()!=''){
            dispatch(create_order(orderData))
        }
        else{
            alert('Vui lòng cung cấp đầy đủ thông tin giao hàng')
        }
    }
    useEffect(() => {
        dispatch(fetchCartItems())
        if (totalPrice !== subtotal) {
            setSubtotal(totalPrice);
        }
    }, [dispatch, totalPrice]);

    if(loading){
        return(
            <div>
                loading
            </div>
        )
    }
    return(
        <form id='checkout'>
            <Container>
                <Row>
                    <Col lg={6}>
                        <div id="billingDetails">
                            <h3>Billing details</h3>
                            <div className="form-gr fullname">
                                <label htmlFor="fullname--input">Họ và tên</label>
                                <input 
                                    value={orderData.full_name} 
                                    onChange={handleInputChange}
                                    type="text" 
                                    id='fullname--input'
                                    placeholder="Tên" 
                                    name="full_name" 
                                />
                            </div>
                            <div className="form-gr address">
                                <label htmlFor="address--input">Địa chỉ</label>
                                <input 
                                    value={orderData.address}
                                    onChange={handleInputChange}
                                    type="text"
                                    id='address--input'
                                    placeholder="Địa chỉ"
                                    name="address"
                                />
                            </div>
                            <div className="form-gr phonenumber">
                                <label htmlFor="phonenumber--input">Số điện thoại</label>
                                <input 
                                    value={orderData.phone_number}
                                    onChange={handleInputChange}
                                    type="text" id='phonenumber--input'
                                    placeholder="Số điện thoại"
                                    name="phone_number"
                                />
                            </div>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div id="order-review">
                            <h3>Your order</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cartItems.map((product)=>(
                                            <tr>
                                                <td className="product-name">
                                                    {product.product_name} 
                                                    <span className="product-quantity">
                                                        &nbsp; × {product.quantity}
                                                    </span>
                                                </td>
                                                <td className="product-price">{formatter.format(product.price*product.quantity)}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td className="subtotal">{formatter.format(subtotal)}</td>
                                    </tr>
                                    <tr>
                                        <th>Delivery fees</th>
                                        <td>{formatter.format(0)}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>{formatter.format(subtotal)}</td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className="payment">
                                <ul>
                                    <li>
                                        <input type="radio" id='payment_method_cod' name="payment_method" defaultChecked/>
                                        <label htmlFor="payment_method_cod">
                                            Cash on delivery
                                        </label>
                                    </li>
                                    <li>
                                        <input type="radio" id='payment_method_bacs' name="payment_method" />
                                        <label htmlFor="payment_method_bacs">
                                            Direct bank transfer
                                        </label>
                                    </li>
                                    <li>
                                        <input type="radio" id='payment_method_paypal' name="payment_method"/>
                                        <label htmlFor="payment_method_paypal">
                                            PayPal
                                        </label>
                                    </li>
                                </ul>
                            </div>
                            <button className="placeOrder--button" onClick={hanldeSubmit}>
                                Đặt hàng
                            </button>  
                        </div> 
                    </Col>
                </Row>
            </Container>
        </form>
    )
}
export default Checkout