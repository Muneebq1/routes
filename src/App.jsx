import './App.css';
import { Routes, Route, Link, Navigate } from "react-router-dom"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from 'react';

import Home from "./components/home";
import About from "./components/about";
import Gallery from "./components/gallery";
import Login from "./components/login/login";
import Signup from "./components/signup.jsx";



function App() {

  const [isLogin, setIsLogin] = useState(true);



  useEffect(() => {

    const auth = getAuth();
   const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {

        console.log("auth change login", user)
        const uid = user.uid;
        setIsLogin(true)


      } else {

        setIsLogin(false)
        console.log("auth change logout", user)
        // User is signed out
        // ...
      }
    });

return () => {
  console.log("cleanup called")
  unSubscribe();
}

  }, [])


  const logoutHandler = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("Sign-out successful.")
    }).catch((error) => {
      // An error happened.
      console.log("Sign-out failed.")

    });
  }


  return (

    <div className='App'>
 
      {
        (isLogin) ?
          <ul>
            <li> <Link to={`/`}>Home</Link> </li>
            <li> <Link to={`/gallery`}>Gallery</Link> </li>
            <li> <Link to={`/about`}>About</Link> </li>
            <li> <Link to={`/profile`}>Profile</Link> </li>
            <li><button onClick={logoutHandler}>logout</button></li>
          </ul>
          : <ul></ul >
          // <ul>
          //   <li> <Link to={`/`}>Login</Link> </li>
          //   <li> <Link to={`/signup`}>Signup</Link> </li>
          // </ul>
      }

      {(isLogin) ?

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        :
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      }

    </div>
  );
}

export default App;
