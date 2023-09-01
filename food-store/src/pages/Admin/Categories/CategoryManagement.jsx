import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux-store/category/category.thunks";

const CategoryManagement = ()=>{
    let categories = useSelector(state => state.category.category)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchCategories())
    }, [dispatch])
    const table_head = ["ID","Ảnh","Danh mục","Số lượng sản phẩm","Đã xóa"];
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
                        categories.map((category)=>(
                            <tr>
                                <td>
                                    <input type="checkbox" />
                                </td>
                                <td>
                                    {category.id}
                                </td>
                                <td className="image">
                                    <div>
                                        <img src={category.image} alt="" width={70} height={70}/>
                                    </div>
                                </td>
                                <td>
                                    {category.category_name}
                                </td>
                                <td>
                                    {category.product_quantity}
                                </td>
                                <td>
                                    {category.isDelete ? 'YES' : 'NO'}
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
export default CategoryManagement