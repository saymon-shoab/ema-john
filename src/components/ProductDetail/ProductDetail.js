import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey}= useParams();
    const [product, setProduct ] = useState({});
    useEffect(()=>{
      fetch('https://protected-taiga-66995.herokuapp.com/product/'+ productKey)
      .then(res=> res.json())
      .then(data => setProduct(data))
    },[productKey])
   // const product = fakeData.find(pd=> pd.key === productKey);
    console.log(product);
    return (
        <div>
            <h1> Your Product Details </h1>
            <Product showAddCard={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;