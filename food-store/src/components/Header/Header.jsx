import React from "react";
import Cookies from 'js-cookie'
import { RiShoppingBasket2Line, RiHeart3Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import './header.scss'
import logo from './logo.png'

const Login = ()=>{
    if(!Cookies.get('authToken')){
        return(
            <Link to={"/auth"} className="nav__right-item">
                <button className="login--button active">
                    <span>Login</span>
                </button>
            </Link>
        )
    }
    return(
        <Link to={'/my-account/info'} className="nav__right-item">
            <div className="login-successful active">
                <img src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png" alt="avatar" width={40} height={40} className='user-avatar'/>
            </div>
        </Link>
    )
}
const Header = () => {
    return(
        <div className="header">    
            <div className="nav__wrapper">
                <div className="nav__left">
                    <Link to={'/'}>
                        <div className="logo">
                            <img src={logo} alt="logo" />
                            <h5>UTE Food</h5>
                        </div>
                    </Link>
                </div>
                <div className="nav__middle">
                    <input placeholder="search"/>
                    <SearchOutlinedIcon className="search-icon"/>
                </div>
                <div className="nav__right">
                    <Link className="cart--button nav__right-item" to={"/cart"}>
                        <RiShoppingBasket2Line className="cart-icon--button"/>
                    </Link>
                    <Link className="cart--button nav__right-item" to={"/wishlist"}>
                        <RiHeart3Fill className="heart-icon--button"/>
                    </Link>
                    <Login/>
                </div>
            </div>
        </div>
    )
}
export default Header