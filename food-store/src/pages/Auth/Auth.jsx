import React, {useState, useEffect} from "react";   
import './auth.scss'
import { Link  } from "react-router-dom";
import { endpoint } from "../../utils/data";
import Cookies from "js-cookie";


export default function Auth(){
    

    let [isLogin, setIsLogin] = useState(true);
    let [errorMessage, setErrorMessage] = useState("");
    const handleLogin = (event)=>{
        event.preventDefault();
        let email = event.target.email.value
        let password = event.target.password.value
        if (email.trim() === "") setErrorMessage("Vui lòng nhập email");
        else if (password.trim() === "") setErrorMessage("Vui lòng nhập mật khẩu");
        else{
            fetch(`${endpoint}/auth/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
                .then(response => response.json())
                .then((data) => {
                    const expires = 1
                    Cookies.set('authToken', data.authToken, { expires })
                    window.location = "/"
                })
                .catch(error => console.error(error));

        }
    }
    const LoginForm = ()=>{
        return (
            <form onSubmit={handleLogin} id='login-form'>
                <input type="email" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Mật khẩu"/>
                <span className="message">{errorMessage}</span>
                <button className="login--button" type="submit">Đăng nhập</button>
                <a href="/changePassword">Quên mật khẩu ?</a>
                <button className="signup--button" onClick={()=>{setIsLogin(false)}}>Tạo tài khoản mới</button>
            </form>
        )
    }
    const SignupForm = ()=>{
        const day = []
        const month = []
        const year = []
        for(let d=1; d<=31; d++){
            day.push(d)
            if(d<=12)
                month.push(d)
        }
        const currentYear = new Date().getFullYear();
        for(let y=currentYear; y>=currentYear-100; y--)
            year.push(y)
        return (
            <div id="signup-form">
                <input type="text" placeholder="Họ và tên"/>
                <input type="email" placeholder="Email"/>
                <input type="password" placeholder="Mật khẩu"/>
                <label >Giới tính</label>
                <div id="gender">
                    <label htmlFor="gender-option-male" id="gender-option">Nữ
                        <input type="radio" name='gender' id="gender-option-male" defaultChecked/>
                    </label>
                        
                    <label htmlFor="gender-option-female" id="gender-option">Nam
                        <input type="radio" name='gender' id="gender-option-female"/>
                    </label>
                </div>
                <label>Ngày sinh</label>
                <div name="dateOfBirth" id="dateOfBirth">
                    <div>
                        <select name="day" id="dateOfBirth-day">
                        {
                            day.map((d)=>(
                                <option value={d}>{d}</option>
                            ))
                        }
                        </select>
                    </div>
                    <div>
                        <select name="month" id="dateOfBirth-month">
                        {
                            month.map((m)=>(
                                <option value={m}>{m}</option>
                            ))
                        }
                        </select>
                    </div>
                    <div>
                        <select name="year" id="dateOfBirth-year">
                        {
                            year.map((y)=>(
                                <option value={y}>{y}</option>
                            ))
                        }
                        </select> 
                    </div>
                </div>
                <button className="signup--button">Đăng ký</button>
                <button className="login--button" onClick={()=>{setIsLogin(true)}}>Đăng nhập</button>
            </div>
        )
    }
    if(!Cookies.get('authToken'))
    {
        return(
            <div id='auth'>
                <div id="auth-form">
                    <div className="title" style={{
                        marginRight: '40px',
                        maxWidth:'350px'
                    }}>
                        <Link to={"/"}>
                            <h1>UTE FOOD</h1>
                        </Link>
                        <p>UTE FOOD không ngon thì cook</p>
                    </div>
                    {
                        isLogin ? <LoginForm/> : <SignupForm/>
                    }
                </div>
            </div>
        )
    }
    else
        window.location = "/"; 

}