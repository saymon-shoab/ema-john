import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeFireBaseFrameWork, signInWithEmailAndPassword } from './loginManager';



function LogIn() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn:false,
    newUser: false, 
    name: '',
    email: '',
    password: '',
    Photo: ''
  });
  initializeFireBaseFrameWork();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res=> {
        handleResponse(res, true); 
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(res => {
       handleResponse(res, false);
    })
  }

  const fbSignIn =() => {
      handleFbSignIn()
      .then(res=> {
        handleResponse(res, true);

       })
  }

    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if(redirect){
            history.replace(from);
        }
    }



  const handleBlur = (event) => {
    const isFieldValid = true;
    // console.log(event.target.name , event.target.value)
    if(event.target.name === 'email'){
       const isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
      
    }
    if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value) ;
      const isFieldValid = isPasswordValid && passwordHasNumber  ;
    }
    if(isFieldValid){
      const newUserInfo = {...user};
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
   //  console.log(user.email, user.password)
     if(newUser && user.email && user.password){
        createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res=> {
            handleResponse(res, true);

           })
     }

     if(!newUser && user.email && user.password){
        signInWithEmailAndPassword(user.email, user.password)
        .then(res=> {
            handleResponse(res, true);

           })
     }

     e.preventDefault();
  }




  return (
    <div style={{textAlign:'center'}}> 
        {
          user.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
         <button onClick={googleSignIn}>Sign In</button>
        }
        <br/>
        <button onClick={fbSignIn}>Sign in using Facebook</button>
         {
           user.isSignedIn && 
           <div> <h1> Welcome : {user.name} </h1>
           <h3>Your email: {user.email}</h3>
           <img src={user.photo} alt=""/>
           </div>
         }

         <h1>our own Authantication </h1>
         <input type="checkBox" name="newUser" onChange={ () => setNewUser(!newUser) } id=""/>
         <label htmlFor="newUser"> New User Sign Up </label>
         <form onSubmit={handleSubmit}>
           { newUser && <input type="text" name="name" onBlur={handleBlur}  placeholder="enter your name" required/> } 
           <br/>    
           <input type="text" name="email" onBlur={handleBlur} placeholder="enter your email" required/>
           <br/>
           <input type="password" name="password" onBlur={handleBlur} placeholder="enter your password" required/>
           <br/>
           <input type="submit" value={newUser ? "Sign Up" : "Log In"}/>
         </form>
         <p style={{color:'red'}}>{user.error}</p>
        {
          user.success &&
         <p style={{color:'green'}}> User {newUser?  'Created': 'Logged In'} Successfully</p>
          
        }

    </div>
  );
}

export default LogIn;
