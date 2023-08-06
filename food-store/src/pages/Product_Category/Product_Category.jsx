import React , {useState} from "react";
import './product_category.scss'
import ProductList from "../../components/Product/ProductList/ProductList";
import products from "../../assets/fake-data/products.js";
import categories from "../../assets/categories/categories_data.js";
import { Link, useParams } from "react-router-dom";
import formatter from "../../utils/FormatCurrency";


const RangeSlider = (props) => {
    let [isThumbLeft, setThumbLeft]=useState({
                left: '0%',
                value: 0
            })
    let [isThumbRight, setThumbRight]=useState({
                right: '0%',
                value: props.price_max
            })
    return (
        <div
        style={{
            padding: '0 15px'
        }}>
            <div className="price-label">
                Giá {formatter.format(isThumbLeft.value)} - {formatter.format(isThumbRight.value)}
            </div>
            <input type="range" className="slide-handle-input left" min={0} max={props.price_max} step={10} value={isThumbLeft.value} onChange={
                (event)=>{
                    let min = parseInt(event.target.min), max = parseInt(event.target.max);
                    let percent = ((isThumbLeft.value-min)/(max-min))*100
                    setThumbLeft({
                        left: percent + "%",
                        value: Math.min(parseInt(event.target.value), parseInt(document.querySelector(".slide-handle-input.right").value) - 5)
                    })
                }
            }/>
            <input type="range" className="slide-handle-input right" min={0} max={props.price_max} step={1} value={isThumbRight.value} onChange={
                (event)=>{
                    let min = parseInt(event.target.min), max = parseInt(event.target.max);
                    let percent = ((isThumbRight.value-min)/(max-min))*100
                    setThumbRight({
                        right: (100-percent) + "%",
                        value: Math.max(parseInt(event.target.value), parseInt(document.querySelector(".slide-handle-input.left").value) + 5)
                    })
                }
            }/>
            <div className="horizontal-slider">
                <div className="slide-handle left" style={{...isThumbLeft}}></div>
                <div className="range" style={
                    {left: isThumbLeft.left, right: isThumbRight.right}
                }></div>
                <div className="slide-handle right" style={{...isThumbRight}}></div>
            </div>
        </div>
    )
}
export default function Product_Category(){
    window.scrollTo(0,0)
    const product_grid = {
        xs:'6',
        md:'4',
        sm:'6',
        lg:'3'
    }
    const cate_id = useParams();
    return(
        <div id='product-category'>
            <ProductList products={products} product_grid={product_grid} />
            <div className="filter">
                <div className="categories">
                    <h4>Danh mục</h4>
                    <div className="category_wrap">
                    {
                        categories.map((item)=>(
                            <Link to={`/category/${item.id}`}>
                                <div className={item.id == cate_id.id ? 'category-item active' : 'category-item'}>
                                    <div className='category'>
                                        {
                                            <>
                                                <span className="cate_name">{item.category_name}</span>
                                                <span className="cate_prod-quantity">({item.product_quantity})</span>
                                            </>
                                        }
                                    </div>
                                </div>
                            </Link>
                        
                        ))
                    }
                    </div>
                </div>
                <div className="filter-by-price">
                    <h5>Bộ lọc</h5>
                    <RangeSlider price_max={200000}/>
                </div>
            </div>
        </div>
    )
}