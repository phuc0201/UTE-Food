import React from "react";
import './categoryCard.scss'
import { Link } from "react-router-dom";
export default function CategoryCard(props){
    return(
        <div style={{
            padding:'0 12px'
        }}>
            <Link to={`/category/${props.category.id}`}>
                <div className="categoryCard">
                        <div className="category-content">
                            <div className="category-image" style={{
                                backgroundImage: `url(${props.category.image})`
                            }}></div>
                            <span className="category-name">{props.category.category_name}</span>
                            <span className="category-quantityProduct">{props.category.product_quantity} sản phẩm</span>
                        </div>
                    </div>
            </Link>
        </div>
    )
}