import  firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from'./firebase.config';

export const initializeFireBaseFrameWork = ()=>{
    if(firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig)
    }
}


export const handleGoogleSignIn = ()=>{
    const GoogleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(GoogleProvider)
    .then(res => {
      const {displayName, photoURL, email} = res.user;
      const signedInUser= {
        isSignedIn: true,
        name:displayName,
        email: email,
        photo: photoURL
      }
      return signedInUser;
      console.log(displayName, photoURL, email);
    })
    .catch(err => {
      console.log(err);
      console.log(err.massage);
    })
  }
  

  
 export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider)
  .then( res => {
    
    var credential = res.credential;
    var user = res.user;
    return user ;
    var accessToken = credential.accessToken;
    console.log('fb user after sign in', user)
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(errorMessage, errorCode)
  });
  }

  
 export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then(res => {
     const SignOutUser= {
       isSignedIn: false ,
       name: '',
       email: '',
       photo: '',
       error: '',
       success: false

  }
  return SignOutUser;
  console.log(res)
    })
    .catch( err => {

    })
  }


  export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword( email, password)
    .then(res => {
      const newUserInfo =  res.user;
      newUserInfo.error= '';
      newUserInfo.success=true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch(error => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
     return newUserInfo;
    
    });
  }

  export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then( res => {
      const newUserInfo =  res.user;
      newUserInfo.error= '';
      newUserInfo.success=true;
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
  }


  
  const updateUserName = name => {
    const user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: name
      }).then(function() {
        console.log('user name update successfully')
      }).catch(function(error) {
        console.log(error)
      });
  }





























//   export const createUserWithEmailAndPassword = () => {
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//     .then(res => {
//       const newUserInfo = {...user};
//       newUserInfo.error= '';
//       newUserInfo.success=true;
//       setUser(newUserInfo);
//       updateUserName(user.name);
//     })
//     .catch(error => {
//       const newUserInfo = {...user};
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo);
    
//     });
//   }

//   export const signInWithEmailAndPassword = () => {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//     .then( res => {
//       const newUserInfo = {...user};
//       newUserInfo.error= '';
//       newUserInfo.success=true;
//       setUser(newUserInfo);
//       setLoggedInUser(newUserInfo);
//       history.replace(from);
//       console.log('sign in user info', res.user)
//     })
//     .catch((error) => {
//       const newUserInfo = {...user};
//       newUserInfo.error = error.message;
//       newUserInfo.success = false;
//       setUser(newUserInfo);
//     });
//   }


  
//   const updateUserName = name => {
//     const user = firebase.auth().currentUser;

//       user.updateProfile({
//         displayName: name
//       }).then(function() {
//         console.log('user name update successfully')
//       }).catch(function(error) {
//         console.log(error)
//       });
//   }