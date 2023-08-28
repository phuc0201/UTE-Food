import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../redux-store/userAccount/userAccount.thunks";
import './userManagement.scss'
const UserManagement = ()=>{
    const users = useSelector(state => state.userAccount.data)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchUsers())
    }, [dispatch])
    console.log(users)
    const table_head = ["ID","Ảnh đại diện", "Tên","Số điện thoại","Địa chỉ","Ngày sinh", "Email", "Role"]
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
                {users.map((user) => (
                <tr key={user.id}>
                    <td>
                        <input type="checkbox" />
                    </td>
                    <td>{user.id}</td>
                    <td className="user-avatar image">
                        <div>
                            <img src={user.avatar} alt="img" width={70} height={70}/>
                        </div>
                    </td>
                    <td>{user.full_name}</td>
                    <td>
                        {user.phone_number}
                    </td>
                    <td>
                        {user.address}
                    </td>
                    <td>
                        {user.date_of_birth}
                    </td>
                    <td>
                        {user.email}
                    </td>
                    <td>
                        {user.user_role}
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
                ))}
            </tbody>
        </table>
    </div>
    );
}
export default UserManagement