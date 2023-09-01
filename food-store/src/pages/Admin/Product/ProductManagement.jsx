import React, { useEffect, useState } from "react";
import './productManagement.scss'
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import formatter from "../../../utils/FormatCurrency";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../../redux-store/product/product.thunks";
import Review from "../../../components/Review/Review";
import StarRatings from "react-star-ratings";
const FormData = ({isEditForm, closeForm})=>{
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const filePath = URL.createObjectURL(file);
            setSelectedFile({ file, filePath });
        } else {
            setSelectedFile(null);
        }
    };
    return(
        <div className="form-overlay">
            <div className="form-container">
                <button className="close-form-button" onClick={()=>{closeForm()}}>
                    <img src="https://cdn-icons-png.flaticon.com/512/2734/2734822.png" alt="X" width={30} height={30}/>
                </button>
                <Container className="form-content">
                    <Row>
                        <Col sm='12' md='6' lg='6'>
                            <div className="product-image">
                                <label for="fileInput" class="custom-file-upload">
                                    <input type="file" id="fileInput" accept=".jpg, .jpeg, .png" 
                                        onChange={handleFileChange}
                                    />
                                </label>
                                <div style={{
                                    backgroundImage:`url("${selectedFile==null ? 'https://cdn-icons-png.flaticon.com/512/2659/2659360.png' : selectedFile.filePath }")`
                                }}>

                                </div>
                            </div>
                        </Col>
                        <Col sm='12' md='6' lg='6'>
                            <div className="product-content">
                                <input type="text" placeholder="Tên sản phẩm" className="product-name"/>
                                <input className="product-price" type="text" placeholder="Giá tiền" value='31232'/>
                                <input className="product-quantity" type="text" placeholder="Số lượng" value='10'/>
                                <select className="product-category">
                                    <option value="Pizza">Pizza</option>
                                </select>
                                <StarRatings
                                    rating={0}
                                    starRatedColor="#f7c942"
                                    numberOfStars={5}
                                    starDimension="40px"
                                    starSpacing="2px"/>
                                <button className="update-button">
                                    Cập nhật
                                </button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm='12' md='12' lg='12'>
                            <textarea name="" id="" cols="30" rows="10">
                                
                            </textarea>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    )
}
const ProductManagement =()=>{
    const [isFormVisible, setFormVisible] = useState(false);
    const [isEditForm, setEditForm] = useState(false);
    let products = useSelector(state => state.product.products);
    let dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchProducts())
    },[dispatch])
    const toggleForm = () => {
        setFormVisible(!isFormVisible);
    };
    const table_head = ["ID","Ảnh","Tên sản phẩm","Mô tả","Giá","Số lượng", "Ngày công bố", "Điểm đánh giá", "Đã xóa"]
    return (
        <>
        {
            isFormVisible ? <FormData isEditForm={isEditForm} closeForm={toggleForm}/> : ''
        }
        <div className="table-container">
            <button className="add-new-data" onClick={()=>{
                setEditForm(false);
                toggleForm();
            }}>Thêm sản phẩm mới +</button>
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
                                <button className="edit-button" onClick={()=>{
                                        setEditForm(true);
                                        toggleForm();
                                    }}>
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
        </>
    );
}
export default ProductManagement