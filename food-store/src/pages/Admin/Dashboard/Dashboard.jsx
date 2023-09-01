import React from "react";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { FaUserTie } from "react-icons/fa";
import { FiBox } from "react-icons/fi";
import OrderChart from "../../../components/Chart/OrderChart";
import './dashboard.scss'
import formatter from "../../../utils/FormatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchDashboard } from "../../../redux-store/dashboard/dashboard.thunks";
import { Link } from "react-router-dom";

const Dashboard =()=>{
    const dispatch = useDispatch();
    let products = [1,2,4,5]
    let data = useSelector(state => state.dashboard.data)
    useEffect(()=>{
        dispatch(fetchDashboard())
    }, [dispatch])
    return (
        <div id="dashboard">
            <div className="total-data">
                <div className="total-data-item" style={{backgroundColor:'#7dc754'}}>
                    <AiOutlineDollarCircle style={{fontSize:'80px', marginRight: 10}}/>
                    <div>
                        <h5>Tổng lợi nhuận</h5>
                        <span>{formatter.format(data.total_price_orders)}</span>
                    </div>
                </div>
                <div className="total-data-item" style={{backgroundColor:'#368ed8'}}>
                    <FiBox style={{fontSize:'80px', marginRight: 10}}/>
                    <div>
                        <h5>Tổng số sản phẩm</h5>
                        <span>{data.total_product}</span>
                    </div>
                </div>
                <div className="total-data-item" style={{backgroundColor:'#838cc7'}}>
                    <FaUserTie style={{fontSize:'80px', marginRight: 10}}/>
                    <div>
                        <h5>Tổng số người dùng</h5>
                        <span>{data.total_user}</span>
                    </div>
                </div>
            </div>
            <div className="data-analysis">
                <div style={{
                    width:'70%'
                }}>
                    <OrderChart dailyOrderCount={data.dailyOrderCount}/>
                </div>  
                <div style={{
                    width:'30%'
                }}>
                    <div id="top-selling">
                        <div style={{display:'flex', marginBottom:10}}>
                            <h5 style={{margin: "auto"}}>Top 5 sản phẩm bán chạy nhất</h5>
                        </div>
                        {
                            data.topSellingProduct && data.topSellingProduct.length > 0 ? (
                                data.topSellingProduct.map(product => (
                                    <Link to={`/product/${product.id}`}>
                                        <div className="product-card">
                                            <div className="image">
                                                <img src={product.product_images && product.product_images.length > 0 ? product.product_images[0].image : ''} alt="" width={70} height={70}/>
                                            </div>
                                            <div className="content">
                                                <div className="product-name">{product.product_name}</div>
                                                <div className="product-price">{formatter.format(product.price)}</div>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p>Không có sản phẩm bán chạy nào.</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard