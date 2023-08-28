import React, {useState, useEffect} from "react";
import { endpoint } from "../../utils/data";
import ProductList from "../../components/Product/ProductList/ProductList";
import Banner from "../../components/Banner/Banner";
import Categories from "../../components/Categories/Categories"
// import products from "../../assets/fake-data/products.js";
function Home() {
  const [products, setProducts] = useState([]);
  const product_grid = {
    xs:'6',
    md:'3',
    sm:'6',
    lg:'5'
  }
  useEffect(()=>{
    const fetchData = async () => {
      fetch(`${endpoint}/product`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
      })
      .then(response => response.json())
      .then((data) => {
        setProducts(data)
      })
      .catch(error => console.error(error));
    };
    fetchData();
  }, [])
  
  return (
    <div>
        <Banner/>
        <Categories />
        <ProductList products={products} product_grid={product_grid}/>
    </div>
  );
}

export default Home;