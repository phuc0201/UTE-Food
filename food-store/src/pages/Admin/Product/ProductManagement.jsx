import React, { useEffect } from "react";
import './productManagement.scss'
import formatter from "../../../utils/FormatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux-store/product/product.thunks";
const ProductManagement =()=>{
    let products = useSelector(state => state.product.products);
    let dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchProducts())
    },[dispatch])
    const table_head = ["ID","Ảnh","Tên sản phẩm","Mô tả","Giá","Số lượng", "Ngày công bố", "Điểm đánh giá", "Đã xóa"]
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
                {products.map((product) => (
                <tr key={product.id}>
                    <td>
                        <input type="checkbox" />
                    </td>
                    <td>{product.id}</td>
                    <td className="image">
                        <div>
                            <img src={product.image.length > 0 ? product.image[0] : ''} alt="img" width={70} height={70}/>
                        </div>
                    </td>
                    <td>{product.product_name}</td>
                    <td className="description">{product.description}</td>
                    <td>{formatter.format(product.price)}</td>
                    <td>{product.quantity}</td>
                    <td>{product.publication_date}</td>
                    <td width={100}>{product.starRating}</td>
                    <td>{product.isDelete ? 'YES' : 'NO'}</td>
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
export default ProductManagement