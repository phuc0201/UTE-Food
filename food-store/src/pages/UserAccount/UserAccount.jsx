import React, { useState } from 'react';
import './userAccount.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { changePasswordAction, setProfile, update } from '../../redux-store/userAccount/userAccount.thunks';
import Cookies from 'js-cookie';
import { Link, useParams } from 'react-router-dom';
import formatter from '../../utils/FormatCurrency';
import { getUserOrder } from '../../redux-store/order/order.thunks';
const UserInfo = ()=>{
    const user = useSelector((state) => state.userAccount.data);
    const loading = useSelector((state) => state.userAccount.loading);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState(user);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleUpdateProfile = () => {
        if(formData.full_name.trim()!=""){
            dispatch(update(formData))
        }
    };
    useEffect(()=>{
        dispatch(setProfile())   
    }, [dispatch])

    useEffect(() => {
        if (!loading) {
            setFormData(user);
        }
    }, [loading]);

    if(loading || !user.full_name)
        return <div>loading....</div>

    return (
        <>
            <div className={`info-card`}>
                <div className="info-group">
                    <img src="https://cdn-icons-png.flaticon.com/512/1998/1998342.png " width="50" height="50" className='edit-avatar'/>
                    <img src="https://www.pngarts.com/files/6/User-Avatar-in-Suit-PNG.png" alt="avatar" width={100} height={100} className='user-avatar'/>
                </div>
                <div className="info-group">
                    <div>
                        <span className="info-value full_name">{user.full_name}</span>
                    </div>
                    <div>
                        <span className="info-value">{user.email}</span>
                    </div>
                </div>
            </div>
            <div className="edit-form">
                <div className="form-group">
                    <label htmlFor="full_name">Full Name:</label>
                    <input
                        value={formData.full_name}
                        onChange={handleInputChange}
                        type="text"
                        name="full_name"
                        placeholder="Full Name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone_number">Phone Number:</label>
                    <input
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleInputChange}
                        placeholder="Phone Number"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date_of_birth">Date of Birth:</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleInputChange}
                        placeholder="Date of Birth"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                    />
                </div>
                <button className="save-button" onClick={handleUpdateProfile}>
                    Cập nhật
                </button>       
            </div>
        </>
    )
}
    
const ChangePassword = ()=>{
    const [password, setPassword] = useState({})
    const dispatch = useDispatch();
    const handleChangePassword = ()=>{
        dispatch(changePasswordAction(password))
    }
    const handleInputChange = (e)=>{
        const {name, value} = e.target;
        setPassword({
            ...password,
            [name]: value
        })
    }
    return(
        <div className='edit-form change-password'>
            <div className='form-group'>
                <label htmlFor="address">Mật khẩu cũ</label>
                <input
                    type="password"
                    name="oldPassword"
                    id="oldPassword"
                    placeholder="Mật khẩu cũ"
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="address">Mật khẩu mới</label>
                <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder="Mật khẩu mới"
                    onChange={handleInputChange}
                />
            </div>
            <button className="save-button" onClick={handleChangePassword}>
                Cập nhật
            </button>  
        </div>
    )
}

const UserOrder = ()=>{
    const orders = useSelector((state) => state.order.orders)
    const loading = useSelector(state => state.order.loading)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getUserOrder())
    }, [dispatch])

    if(loading)
        return <div>Loading</div>
    return (
        <div id='user-order'>
            {
                orders.map((order)=>(
                    <div className='old-order'>
                        <span className='create-order-at'>Ngày mua: {order.createdAt}</span>
                        <table>
                            <tbody>
                                {
                                    order.order_details.map((item)=>(
                                        <tr>
                                            <td className='product-image'>
                                                <div>
                                                    <img src={`${item.product.product_images.length > 0 ? item.product.product_images[0].image : ''}`}
                                                        alt="ảnh sản phẩm" 
                                                        width={80}
                                                        height={80}
                                                    />
                                                </div>
                                            </td>
                                            <td className="product-name">
                                                {item.product.product_name}
                                                <span className="product-quantity">
                                                    &nbsp; × {item.quantity}
                                                </span>
                                            </td>
                                            <td className="product-price">{formatter.format(item.quantity * item.product.price)}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <span>Tổng tiền: </span> 
                                        {formatter.format(order.totalOrderPrice)}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                ))
            }
        </div>
    )
}   
const UserAccount = () => {
    const { option } = useParams();
    const handleLogout = ()=>{
        Cookies.remove('authToken');
        window.location = '/auth'
    }
    return (
        <div className="user-account">
            <div className='option'>
                <Link to={'/my-account/info'}>
                    <div className={option == "info" ? 'active' : ''}>
                        Thông tin cá nhân
                    </div>
                </Link>
                <Link to={'/my-account/my-order'}>
                    <div className={option == "my-order" ? 'active' : ''}>
                        Đơn hàng của tôi
                    </div>
                </Link>
                <Link to={'/my-account/change-password'}>
                    <div className={option == "change-password" ? 'active' : ''}>
                        Đổi mật khẩu
                    </div>
                </Link>
                <div onClick={handleLogout}>
                    Đăng xuất
                </div>
            </div>
            <div style={{
                flex:1
            }}>
                {
                    option === 'info' ? <UserInfo/>
                    : option === 'change-password' ? <ChangePassword/>
                    : <UserOrder/>
                }
            </div>
        </div>
    );
};

export default UserAccount;
