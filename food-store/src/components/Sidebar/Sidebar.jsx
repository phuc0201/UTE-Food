import React, { useState } from 'react';
import './sidebar.scss'; 
import { Link, useParams } from 'react-router-dom';

const Sidebar = () => {
  let {option} = useParams();
  return (
    <div className={`sidebar`}>
      {/* <button onClick={toggleSidebar}>Toggle Sidebar</button> */}
      <ul>
        <Link to={'/admin/dashboard'}>
          <li className={option === 'dashboard' ? 'active' : '' }>
            <img src="https://cdn-icons-png.flaticon.com/512/8323/8323997.png" alt="icon" width={35} height={35} style={{marginRight: 10}}/>
            Dashboard
          </li>
        </Link>
        <Link to={'/admin/user'}>
          <li className={option === 'user' ? 'active' : '' }>
          <img src="https://cdn-icons-png.flaticon.com/512/1165/1165674.png" alt="icon" width={35} height={35} style={{marginRight: 10}}/>
            User
          </li>
        </Link>
        <Link to={'/admin/product'}>
          <li className={option === 'product' ? 'active' : '' }>
            <img src="https://cdn-icons-png.flaticon.com/512/7566/7566122.png" alt="icon" width={35} height={35} style={{marginRight: 10}}/>
            Product
          </li>
        </Link>
        <Link to={'/admin/category'}>
          <li className={option === 'category' ? 'active' : '' }>
            <img src="https://cdn-icons-png.flaticon.com/512/3843/3843517.png" alt="icon" width={35} height={35} style={{marginRight: 10}}/>
            Category
          </li>
        </Link>
        <Link to={'/admin/order'}>
          <li className={option === 'order' ? 'active' : '' }>
            <img src="https://cdn-icons-png.flaticon.com/512/3045/3045670.png" alt="icon" width={35} height={35} style={{marginRight: 10}}/>
            Order
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
