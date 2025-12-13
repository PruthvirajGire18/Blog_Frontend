import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const SingleBlog = () => {
    const {id}=useParams();
    const [blog,setBlog]=useState(null);
    const fetchSingleBlog=async()=>{
        try {
            const token=localStorage.getItem("token");
            const res=await axios.get(`http://localhost:5000/api/blogs/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            setBlog(res.data.blog);
        } catch (error) {
            console.error("Error fetching blog:", error);
        }
    }
    useEffect(()=>{
        fetchSingleBlog();
    },[])
  return (
   <>
    <div className="min-h-screen bg-slate-950 text-white pt-24 px-4">
        <div className="max-w-7xl mx-auto space-y-8">
            {blog && (
                <div className="bg-slate-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-3xl font-bold mb-4">{blog.title}</h2>
                    <p className="text-lg mb-4">{blog.content}</p>
                    <img src={blog.image} alt={blog.title} className="w-full h-auto rounded" />
                </div>
            )}
        </div>
    </div>
   </>
  )
}

export default SingleBlog