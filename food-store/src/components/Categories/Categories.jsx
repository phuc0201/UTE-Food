import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import CategoryCard from "./CategoryCard/CategoryCard";
import './categories.scss'
import { endpoint } from "../../utils/data";

export default function Categories(){
  const [categories, setCategories] = useState([])
  var settings = {
      infinite: false,
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

  useEffect(()=>{
    fetch(`${endpoint}/categories`)
    .then(response => response.json())
    .then((data) => {
      setCategories(data)
    })
    .catch(error => console.error(error));
  }, [])
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