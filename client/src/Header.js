import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";

export default function Header() {
  const {setUserInfo, userInfo} = useContext(UserContext);

  useEffect(() => {
<<<<<<< HEAD
    fetch('https://blogosphere-blog-app-omb2.vercel.app/profile', {  //use await before fetch or we may use .then()
=======
    fetch('https://blogosphere-blog-app.onrender.com/profile', {  //use await before fetch or we may use .then()
>>>>>>> 85136fdfcd3dc52559381e7a13bb598a7f79d78d
      credentials:'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () => {
<<<<<<< HEAD
    fetch('https://blogosphere-blog-app-omb2.vercel.app/logout', {
=======
    fetch('https://blogosphere-blog-app.onrender.com/logout', {
>>>>>>> 85136fdfcd3dc52559381e7a13bb598a7f79d78d
      method: 'POST',
      credentials: "include",
    });
    setUserInfo(null);
  };

  const username = userInfo?.username;

  return(
      <header>
      <Link to="/" className="logo">Blogosphere</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}

        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            {/* <Navigate to = {'/'} /> */}
          </>
        )}
      </nav>
    </header>
  )
}
