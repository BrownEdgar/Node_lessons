import React, { useState, useEffect } from 'react';
import axios from '../axios';
import Card from "../components/Card"
import { Link } from 'react-router-dom';


const Home = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    axios(`/posts`)
      .then(res => {
        console.log(res.data);
        let binary = Buffer.from(res.data[3].img.data);
        console.log(binary);
        setPosts(res.data)
      })
      .catch(err => console.log(err.response?.data?.message))
  }, [])
  return (
    <div className="home">
      <div className='home__header'>
        <Link to={'/addpost'}>add post</Link>
      </div>
      {posts.map(post => (
        <Card key={post._id} post={post} />
      ))}
    </div>
  )
}

export default Home
