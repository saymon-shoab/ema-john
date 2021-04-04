import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import happyImage from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart , setCart] = useState([]);
    const [orderPlaced, setOrderPlaced]= useState(false);
    const history = useHistory()

    const handleProceedCheckout = () => {
        history.push('./shipment')
    }
    
    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
     
    useEffect(()=>{
      const savedCart = getDatabaseCart();
      const productKeys = Object.keys(savedCart);

      fetch('https://protected-taiga-66995.herokuapp.com/productsByKeys', {
          method:'POST',
          headers:{ 
              'Content-Type':'application/json'
          },
           body: JSON.stringify(productKeys)
      })
      .then(res=> res.json())
      .then(data =>setCart(data))

    //   const cartProducts = productKey.map( key => {
    //   const product = fakeData.find(pd=> pd.key === key);
    //   product.quantity = savedCart[key];
    //   return product;
    //   },[]);
    //   setCart(cartProducts);
    },[]);

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt=""/>
    } 



    return (
        <div className="twin-container">
           <div className="product-container">
              {
                cart.map(pd=> <ReviewItems
                    key={pd.key}
                    removeProduct = {removeProduct}
                    product={pd}></ReviewItems>)
              }
              { thankYou }
           </div>
           <div className="cart-container">
              <Cart cart={cart}>
                  <button onClick={handleProceedCheckout} className="main-button">Proceed Checkout</button>
              </Cart>
           </div>
        </div>
    );
};

export default Review;