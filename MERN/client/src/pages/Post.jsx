
import React, { useState, useEffect } from 'react';
import axios from '../axios'
import { useParams } from "react-router-dom";


const Post = () => {
  const [post, setPost] = useState({})
  const { id } = useParams();
  useEffect(() => {
    axios(`/posts/${id}`,)
      .then(res => {
        console.log('res.data:', res.data);
        setPost(res.data.data)
      })
      .catch(err => console.log(err.response?.data?.message))
  }, [id])

  return (
    <div className="post">
      <img src={post.img} alt="" className="postImg" />
      <h1 className="postTitle">{post.title}</h1>
      <p className="postDesc">{post.desc}</p>
      <p className="postLongDesc">{post.longDesc}</p>
    </div>
  );
};

export default Post;
