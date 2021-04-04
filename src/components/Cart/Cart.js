import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart)
   // const total= cart.reduce((total, prd)=> total+prd.price , 0)
   let total =0;
   for(let i=0; i< cart.length; i++){
       const product = cart[i];
       total= total+product.price *product.quantity || 1;
   }

   let shipping = 0;
   if(total>35){
      shipping=0;
   }
   else if(total>15){
       shipping=4.99;
   }else if(total<0){
       shipping=12.99;
   }

  const tax =(total / 10).toFixed(2);
  const grandTotal =(total + shipping+ Number(tax)).toFixed(2);

    return (
        <div>
            <h4 className="text-primary">Order Summery</h4>
            <p>Items Ordered:{cart.length}</p>
            <p>product Price:{total}</p>
            <p><small>shipping cost:{shipping}</small></p>
            <p><small>tax + vat:{tax}</small></p>
            <p>Total Price:{grandTotal}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart ;