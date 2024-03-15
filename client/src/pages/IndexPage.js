import Post from "../Post";
import {useEffect, useState} from "react";

export default function IndexPage() {
  const [posts,setPosts] = useState([]);
  useEffect(() => {
<<<<<<< HEAD
    fetch('https://blogosphere-blog-app-omb2.vercel.app/post').then(response => {
=======
    fetch('https://blogosphere-blog-app.onrender.com/post').then(response => {
>>>>>>> 85136fdfcd3dc52559381e7a13bb598a7f79d78d
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, []);
  return (
    <>
      {posts.length > 0 && posts.map(post => (
        <Post {...post} />
      ))}
    </>
  );
}
