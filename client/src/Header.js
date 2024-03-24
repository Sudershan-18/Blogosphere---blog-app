import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";

export default function Header() {
  const {setUserInfo, userInfo} = useContext(UserContext);

  // https://blogosphere-blog-app-nhs6.vercel.app    try-1
  // https://blogosphere-blog-app.onrender.com
  // https://blogosphere-blog-app-dnju.vercel.app    try-2
  useEffect(() => {
    fetch('https://blogosphere-blog-app.onrender.com/profile', {  //use await before fetch or we may use .then()
      credentials:'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () => {
    fetch('https://blogosphere-blog-app.onrender.com/logout', {
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
