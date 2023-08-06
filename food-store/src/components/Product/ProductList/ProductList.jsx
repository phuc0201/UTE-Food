import React, { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import {Container, Row, Col} from 'react-bootstrap';
import ReactPaginate from "react-paginate";
import './productList.scss'
const ProductList = (props) =>{
    const [pageNumber, setPageNumber] = useState(0);

    const productPerPage = 10;
    const visitedPage = pageNumber * productPerPage;
    const displayPage = props.products.slice(
        visitedPage,
        visitedPage + productPerPage
    );

    const pageCount = Math.ceil(props.products.length / productPerPage);
        
    const changePage = ({ selected }) => {
        setPageNumber(selected);
        const element = document.querySelector('.productList');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }

    }
    return(
        <Container className="productList">
            <Row>
            {displayPage.map((item) => (
                <Col
                    md={props.product_grid.md}
                    sm={props.product_grid.sm}
                    xs={props.product_grid.xs}
                    lg={props.product_grid.lg}
                    className={props.product_grid.lg==='5' ? 'col-lg-2-4' : ''}
                    key={item.id}
                    style={{
                        margin:'12px 0'
                    }}>
                    <ProductCard item={item} />
                </Col>
            ))}
            <div className="d-flex justify-content-center mt-4 mb-4">
                <ReactPaginate
                    pageCount={pageCount}
                    onPageChange={changePage}
                    previousLabel={"<"}
                    nextLabel={">"}
                    containerClassName="pagination--button"
                />
            </div>
            </Row>
        </Container>
    )
}
export default ProductList