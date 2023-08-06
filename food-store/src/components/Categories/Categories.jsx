import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import CategoryCard from "./CategoryCard/CategoryCard";
import categories from "../../assets/categories/categories_data.js";
import './categories.scss'

export default function Categories(){
    var settings = {
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 6,
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
    };
    return(
        <div>
            <Slider {...settings} className="categories">
                {
                  categories.map((item)=>(
                    <CategoryCard category={item}/>
                  ))
                }
            </Slider>
        </div>
    )
}