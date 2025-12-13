import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const token=localStorage.getItem("token");
        if(!token){
            alert("You must be logged in to edit a blog");
        }
        const formData=new FormData();
        formData.append("title",title);
        formData.append("content",content);
        formData.append("image",image);
        const res=await axios.put(`http://localhost:5000/api/blogs/edit-blog/${id}`,formData,{
            headers:{
                "Content-Type":"multipart/form-data",
                Authorization:`Bearer ${token}`
            }
        })
        console.log("Blog updated:", res.data);
        toast.success("Blog updated successfully!");
        navigate("/dashboard");
        setTitle("");
        setContent("");
        setImage(null);
        setImagePreview(null);
    } catch (error) {
        console.error("Error updating blog:", error);
        toast.error("Error updating blog");
    }
    // update blog API call yahan aayega
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold mb-4">Edit Blog</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block mb-2 text-sm font-medium">Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Image */}
          <div>
            <label className="block mb-2 text-sm font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700"
            />

            {imagePreview && (
              <div className="mt-4">
                <p className="text-sm text-slate-400 mb-2">Image Preview:</p>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-64 h-64 object-cover rounded-lg border border-slate-700 shadow-lg"
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block mb-2 text-sm font-medium">Content</label>
            <textarea
              rows="10"
              className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 font-semibold"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBlog;
