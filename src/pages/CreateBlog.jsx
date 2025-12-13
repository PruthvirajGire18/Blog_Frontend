import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
const CreateBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // PREVIEW STATE

    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setImagePreview(URL.createObjectURL(file)); // PREVIEW URL
        }
    };

    const handleSubmit = async (e) => {
  e.preventDefault();

  if (!image) {
    alert("Please select an image");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("image", image);

  try {
    const token = localStorage.getItem("token");
    if(!token){
        alert("You must be logged in to create a blog");
    }
    console.log("TOKEN FROM LS:", token);

    const res = await axios.post(
      "http://localhost:5000/api/blogs/create-blog",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Blog created:", res.data);
    toast.success("Blog created successfully!");

    // reset after success
    setTitle("");
    setContent("");
    setImage(null);
    setImagePreview(null);
  } catch (error) {
    console.error("Error creating blog:", error);
  }
};


    return (
        <>
            <div className="min-h-screen bg-slate-950 text-white pt-24 px-4">
                <div className="max-w-6xl mx-auto space-y-8">
                    
                    <h1 className="text-3xl font-bold">Create a New Blog</h1>

                    <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/70 rounded-xl border border-slate-800 p-6">
                        
                        {/* Title */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">Title</label>
                            <input 
                                type="text"
                                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:border-blue-400 focus:outline-none"
                                placeholder="Enter blog title"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block mb-2 text-sm font-medium">Image</label>
                            <input 
                                type="file"
                                accept="image/*"
                                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:border-blue-400 focus:outline-none"
                                required
                                onChange={handleImage}
                            />

                            {/* Image Preview */}
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
                                className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:border-blue-400 focus:outline-none"
                                rows="10"
                                placeholder="Write your blog content here..."
                                required
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            ></textarea>
                        </div>

                        {/* Submit */}
                        <div>
                            <button type="submit" className="w-full px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-sm font-semibold shadow-lg">
                                Publish Blog
                            </button>
                        </div>
                    </form>
                </div>

                {/* WRITING TIPS SECTION */}
                <div className="max-w-5xl mx-auto mt-12 p-8 
                    bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 
                    rounded-2xl border border-slate-700 shadow-xl">
                        
                    <h1 className="text-3xl font-semibold mb-6 text-indigo-400">
                        Writing Tips
                    </h1>

                    <ul className="space-y-4 text-lg">
                        <li className="text-slate-300 hover:text-white transition">
                            • Keep your paragraphs short and focused.
                        </li>
                        <li className="text-slate-300 hover:text-white transition">
                            • Use headings and subheadings to organize content.
                        </li>
                        <li className="text-slate-300 hover:text-white transition">
                            • Include images to enhance visual appeal.
                        </li>
                        <li className="text-slate-300 hover:text-white transition">
                            • Proofread for grammar and spelling errors.
                        </li>
                        <li className="text-slate-300 hover:text-white transition">
                            • Engage readers with a compelling introduction.
                        </li>
                    </ul>
                </div>

            </div>
        </>
    );
};

export default CreateBlog;
