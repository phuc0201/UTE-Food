import React from "react";

import ProductList from "../../components/Product/ProductList/ProductList";
import Banner from "../../components/Banner/Banner";
import Categories from "../../components/Categories/Categories";
import products from "../../assets/fake-data/products.js";
function Home() {
  const product_grid = {
    xs:'6',
    md:'3',
    sm:'6',
    lg:'5'
  }
  return (
    <div>
        <Banner/>
        <Categories/>
        <ProductList products={products} product_grid={product_grid}/>
    </div>
  );
}

export default Home;