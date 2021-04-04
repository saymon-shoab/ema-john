import { getAllByPlaceholderText } from '@testing-library/dom';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const onSubmit = data => {
        console.log(data)
        const savedCart = getDatabaseCart();
        const orderDetails = {...loggedInUser, products: savedCart, shipment: data, orderTime: new Date}
        fetch('https://protected-taiga-66995.herokuapp.com/addOrder',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(orderDetails)
        })
        .then(res=> res.json())
        .then(data=> {
          if(data){
            processOrder();
             alert('your order pleased successfully')
          }
        })
    };
  
    console.log(watch("example"));
  
    return (
    
      <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        <input name="neme" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="your name" />
        {errors.name && <span className="error">Name is required</span>}

        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })}  placeholder="your email" />
        {errors.email && <span className="error">Email is required</span>}

        <input name="address" ref={register({ required: true })}  placeholder="your address" />
        {errors.address && <span className="error">Address is required</span>}
        
        <input name="phone" ref={register({ required: true })}  placeholder="your phone" />
        {errors.phone && <span className="error">phone is required</span>}
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;