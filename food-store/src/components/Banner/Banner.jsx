import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import banner1 from '../../assets/banner/banner_1.png'
import banner2 from '../../assets/banner/banner_2.png'
import banner3 from '../../assets/banner/banner_3.png'
import './banner.scss'
const banner_image = [banner1, banner2, banner3]
function Banner() {
    const settings = {
      autoplay: true,
      autoplaySpeed: 5000,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      <Slider {...settings} className="banner">
        {
            banner_image.map((img)=>(
                <div>
                    <div className="banner-item" style={{backgroundImage: `url("${img}")`}}></div>
                </div>
            ))
        }
        {/* <div>
          <img src={banner1} alt="banner1" />
        </div>
        <div>
          <img src={banner2} alt="banner2" />
        </div>
        <div>
          <img src={banner3} alt="banner3" />
        </div>
         */}
      </Slider>
    );
}
export default Banner