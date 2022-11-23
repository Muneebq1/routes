import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom"


function Signup() 
{
const [name, setName] = useState();
const [email, setEmail] = useState();
const [password, setPassword  ] = useState();


    const signUpHandler= (e) =>{
        e.preventDefault();

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("user", user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("error", error)

    // ..
  });

// e.reset();
    }
    return(
           <div className='main'>
            <form className='form' onSubmit={signUpHandler}>
                <div className='left'></div>
                <div className='right'>
                    <h1> Signup to continue </h1>
                    <input type="email" name="email" placeholder="Email" id="input" onChange={(e) => { setEmail(e.target.value) }} />
                    <br /> <input type="password" name="current-password" placeholder="Password" id="input" onChange={(e) => { setPassword(e.target.value) }} />
                    <div className='rem'><input type="checkbox" /> Remember Me<span>Forgot Password?</span></div>
                    <br /> <button type="submit">Signup</button> <br /> <br />
                     <Link to={`.login/login`} className = "link">already have an account.!</Link> 
                  
                </div>
            </form>
        </div>
            
    )
}
export default Signup;