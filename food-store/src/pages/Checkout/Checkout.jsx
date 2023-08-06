import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import './checkout.scss'
const Checkout = ()=>{
    return(
        <form id='checkout'>
            <Container>
                <Row>
                    <Col lg={6}>
                        <div id="billingDetails">
                            <h3>Billing details</h3>
                            <div className="form-gr fullname">
                                <label htmlFor="fullname--input">Họ và tên</label>
                                <input type="text" id='fullname--input' placeholder="Tên" />
                            </div>
                            <div className="form-gr address">
                                <label htmlFor="address--input">Địa chỉ</label>
                                <input type="text" id='address--input' placeholder="Địa chỉ" />
                            </div>
                            <div className="form-gr phonenumber">
                                <label htmlFor="phonenumber--input">Số điện thoại</label>
                                <input type="text" id='phonenumber--input' placeholder="Số điện thoại" />
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
                                    <tr>
                                        <td className="product-name">
                                            Pizza 
                                            <span className="product-quantity">
                                                &nbsp; × 1
                                            </span>
                                        </td>
                                        <td className="product-price">20000</td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Subtotal</th>
                                        <td className="subtotal">234566</td>
                                    </tr>
                                    <tr>
                                        <th>Delivery fees</th>
                                        <td>34543</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>834734</td>
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
                            <button className="placeOrder--button" onClick={(e)=>{
                                alert("Place order sucessfully")
                                e.preventDefault()
                            }}>
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