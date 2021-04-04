import React from 'react';

const ReviewItems = (props) => {
    //console.log(props)
    const {name, quantity, key, price} = props.product
    return (
        <div style={{
            borderBottom:'1px solid lightGray',
            margin:'50px'
            }}>
          <p>{name}</p> 
          <h5>quantity: {quantity}</h5> 
          <p>price:$  {price}</p>
          <button className="main-button"
           onClick={()=>props.removeProduct(key)}
          >Remove</button>
        </div>
    );
};

export default ReviewItems;