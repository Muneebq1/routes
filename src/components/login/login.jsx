import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { Link } from "react-router-dom"

import './index.css'

function Login() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();


    const loginHandler = (e) => {
        e.preventDefault();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("user", user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("error", errorCode, errorMessage)
            });

    }
    return (
        <div className='main'>
            <form className='form' onSubmit={loginHandler}>
                <div className='left'></div>
                <div className='right'>
                    <h1> Login to continue </h1>
                    <input type="email" name="email" placeholder="Email" id="input" onChange={(e) => { setEmail(e.target.value) }} />
                    <br /> <input type="password" name="current-password" placeholder="Password" id="input" onChange={(e) => { setPassword(e.target.value) }} />
                    <div className='rem'><input type="checkbox" /> Remember Me<span>Forgot Password?</span></div>
                    <br /> <button type="submit">login</button> <br /> <br />
                     <Link to={`/signup`} className = "link">Dont have an account?</Link> 
                    <p>or sign up using</p>
                    <div className='i'>
                            < FaFacebookF className='icons' />
                            < FaTwitter className='icons' />
                        </div>
                </div>
            </form>
        </div>

    )
}
export default Login;