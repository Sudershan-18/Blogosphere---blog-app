import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";

export default function Header() {
  const {setUserInfo, userInfo} = useContext(UserContext);

  useEffect(() => {
    fetch('http://localhost:4000/profile', {  //use await before fetch or we may use .then()
      credentials:'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  const logout = () => {
    fetch('http://localhost:4000/logout', {
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