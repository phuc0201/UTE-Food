import React, { useState }  from "react";
import './productDetail.scss'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import products from '../../assets/fake-data/products.js'
import { Container, Row, Col } from "react-bootstrap";
import { Tabs, Tab } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import ProductCard from "../../components/Product/ProductCard/ProductCard";
import Review from "../../components/Review/Review";
import formatter from '../../utils/FormatCurrency.js'

const RelatedProducts = ()=>{
    // const productPerPage = 4;
    // const visitedPage = productPerPage;
    // const displayPage = products.slice(
    //     visitedPage,
    //     visitedPage + productPerPage
    // );
    var settings = {
        infinite: false,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
                },
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2
                }
              }
            ]
    }
    return(
        <div className="product-related">
            <Slider {...settings}>
                {
                    products.map((item)=>(
                        <div className="product-related-item">
                            <ProductCard item={item}/>
                        </div>
                    ))
                }
            </Slider>
        </div>
    )
}

export default function ProductDetail(){
    window.scrollTo(0, 0);
    const { id } = useParams();
    const product = products.find((product) => product.id === id);
    const [quantity, setQuantity] = useState(1);
    const Increase=()=>{
        setQuantity(quantity+1)
    }
    const Decrease=()=>{
        quantity > 1 ? setQuantity(quantity-1) : setQuantity(1)
    }
    return(
        <Container className="product-detail">
            <Row>
                <Col sm='12' md='6' lg='6'>
                    <div className="product-image" style={{
                        backgroundImage:`url(${product.image01})`
                    }}>
                    </div>
                </Col>
                <Col sm='12' md='6' lg='6'>
                    <div className="product-content">
                        <h1>{product.title}</h1>
                        <StarRatings
                            rating={3.5}
                            starRatedColor="#f7c942"
                            numberOfStars={5}
                            starDimension="20px"
                            starSpacing="2px"/>
                        <div className="product-price">
                            {formatter.format(product.price)}
                        </div>
                        <div className="product-added-to-cart">
                            <div className="product-quantity-added">
                                <button className="quantity--minus" onClick={Decrease}>-</button>
                                <div className="quantity--number">{quantity}</div>
                                <button className="quantity--plus" onClick={Increase}>+</button>
                            </div>
                            <button className="product-addToCart--button">ADD TO CART</button>
                        </div>
                        <div class="product-extra-info">
                            <div>
                                <ul>
                                    <li>Free global shipping on all orders</li>
                                    <li>30 days easy returns if you change your mind</li>
                                    <li>Order before noon for same day dispatch</li>
                                </ul>
                            </div>
                            <div class="brand-wrap">
                                <h5 class="title-brand">Guaranteed Safe Checkout</h5>
                                <img src="https://demo2.pavothemes.com/poco/wp-content/uploads/2020/08/trust-symbols.png"  class="image-responsive" alt="product-image"/>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <Tabs defaultActiveKey="description" className="tab-list">
                    <Tab eventKey="description" title="Description" className="tab-item">
                        <div>
                            {product.desc}
                        </div>
                    </Tab>
                    <Tab eventKey="review" title="Review" className="tab-item">
                        <Review/>
                    </Tab>
                </Tabs>
            </Row>
            <Row> 
                <RelatedProducts/>
            </Row>
        </Container>
    )
}