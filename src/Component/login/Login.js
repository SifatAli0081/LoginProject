import React, { useState } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut  } from "firebase/auth";
import intalizeAuthentication from '../Firebase/firebace.initialize'
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'

const provider = new GoogleAuthProvider();
intalizeAuthentication();
const Login = () => {

  const [user, setUser] = useState({})
  const auth = getAuth();
  const handleGoogleSingIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const {displayName, email, photoUrl} = result.user;
        const loggedInUser = {
          name:displayName,
          email:email,
          photoUrl:photoUrl,
        }
        setUser(loggedInUser)

      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const emai = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
    }   
    const handleGoogleSingOut = () => {
      const auth = getAuth();
    signOut(auth).then(() => {
      setUser({})
     }).catch((error) => {
       console.log(error)
     });
    }
  return (
    <>
    <section className="From-container from " style={{hight:"1400px",width:"1000px", alignItem:"center", alignContent:"center"}}>
    <div className="container"> 
    <div className="row" style={{border:"1px solid black"}}>
     <div className="col-1">
       <img src="https://i.ibb.co/gWF4gbc/typewriter-498204-1920.jpg"  alt="typewriter" style={{hight:"500px",width:"500px"}}/>
     </div>
     <div className="col-2 d-flex flex-column align-items-center justify-content-center" style={{hight:"500px",width:"500px"}}>
     {
      user.email && <>
        <h6><b className="text-primary">{user.name}</b> is login</h6>
      </>
      }
     <h1>Express</h1>
     <h5>Login into your account.</h5>
     <from className="from-row" style={{alignContent:"center"}}>
      <div className="">
         <div className="col-log-7">
           <input type="email" placeholder="Email" className="form-control my-3 p-2"/>
         </div>
      </div>
      <div className="from-row">
      <div className="col-log-7">
        <input type="password" placeholder="Password" className="form-control my-3 p-2"/>
      </div>
      </div>
      <div className="from-row">
      <button className="header-btn">Login</button>
      <hr/>
         <div className="col-log-7">
         {
      user.email ? <button className="header-btn" onClick={handleGoogleSingOut}>Log Out From Google</button> :
      <button className="header-btn"  onClick={handleGoogleSingIn}>Login With Google</button>
     }
         </div>
      </div>
      <br/>
      <a href='#' style={{alignContent:"center"}}>Forget Password ?</a>
      <div className="social-media">
      </div>
     </from>
    </div>
    </div>
    </div>
    </section>
</>

  )
}

export default Login