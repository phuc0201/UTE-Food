import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import ProductManagement from "./Product/ProductManagement";
import CategoryManagement from "./Categories/CategoryManagement";
import UserManagement from "./UserAccount/UserManagement";
import OrderManagement from "../Admin/Order/OrderManagement"
import Dashboard from './Dashboard/Dashboard'
import './admin.scss'
const AdminPage =()=>{
    let {option} = useParams();
    return(
        <div style={{
                display:'flex',
            }}>
            <Sidebar/>
            <div style={{
                padding:'0 20px',
                marginTop: 20,
                width: '100%'
            }}>
            {
                option === 'dashboard' ? <Dashboard/> : 
                option === 'product' ? <ProductManagement/> :
                option === 'user' ? <UserManagement/> :
                option === 'category' ? <CategoryManagement/> :
                option === 'order' ? <OrderManagement/> : ''
            }
            </div>
        </div>
    )
}
export default AdminPage