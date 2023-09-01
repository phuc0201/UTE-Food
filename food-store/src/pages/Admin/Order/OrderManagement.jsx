import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {fetchOrders} from '../../../redux-store/order/order.thunks'
const OrderManagement = ()=>{
    let orders = useSelector(state => state.order.orders)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchOrders())
    }, [dispatch])
    const table_head = ["ID","UID","Tên","Địa chỉ","Số điện thoại","Ngày giao", "Ngày tạo", "Ngày cập nhật"]
    return (
        <div className="table-container">
            <table className="custom-table">
                <thead>
                    <tr>
                        <th></th>
                        {
                            table_head.map((item)=>(
                                <th>{item}</th>
                            ))
                        }
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((order)=>(
                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>
                                    {order.id}
                                </td>
                                <td>
                                    {order.userID}
                                </td>
                                <td>
                                    {order.full_name}
                                </td>
                                <td>
                                    {order.address}
                                </td>
                                <td>
                                    {order.phone_number}
                                </td>
                                <td>
                                    {order.delivery_date}
                                </td>
                                <td>
                                    {order.createdAt}
                                </td>
                                <td>
                                    {order.updatedAt}
                                </td>
                                <td>
                                    <div className="action-buttons-container">
                                        <button className="edit-button">
                                            <img src="https://cdn-icons-png.flaticon.com/512/1160/1160515.png" width="30" height="30" alt="" title="" class="img-small"/>
                                        </button>
                                
                                        <button className="delete-button">
                                            <img src="https://cdn-icons-png.flaticon.com/512/1587/1587516.png" width="30" height="30" alt="" title="" class="img-small"/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default OrderManagement