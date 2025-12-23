import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs
  const fetchUserBlogs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://blog-backend-topaz-seven.vercel.app/api/blogs/blogs/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserBlogs(res.data.blogs || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://blog-backend-topaz-seven.vercel.app/api/blogs/delete-blog/${blogId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchUserBlogs(); // Refresh the list after deletion
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete blog");
    }
  };

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 px-4">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Welcome back,{" "}
              <span className="text-blue-400">
                {user?.name?.split(" ")[0]}
              </span>{" "}
              👋
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Manage your blogs and track your writing activity.
            </p>
          </div>

          <button
            onClick={() => navigate("/create-blog")}
            className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-sm font-semibold shadow-lg transition"
          >
            + Create New Blog
          </button>
        </div>

        {/* Blogs Section */}
        <div className="bg-slate-900/70 rounded-2xl border border-slate-800 p-6">
          <h2 className="text-lg font-semibold mb-6">Your Blogs</h2>

          {/* States */}
          {loading && (
            <p className="text-slate-400">Loading blogs...</p>
          )}

          {error && (
            <p className="text-red-400">{error}</p>
          )}

          {!loading && !error && userBlogs.length === 0 && (
            <p className="text-slate-400">
              You haven’t written any blogs yet.
            </p>
          )}

          {/* Blog Cards */}
          {!loading && !error && userBlogs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden shadow-md hover:shadow-xl transition"
                >
                  {/* Image */}
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />

                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-lg font-semibold line-clamp-1">
                      {blog.title}
                    </h3>

                    <p className="text-sm text-slate-400 line-clamp-2">
                      {blog.content}
                    </p>

                    <p className="text-xs text-slate-500">
                      📅 {new Date(blog.createdAt).toLocaleDateString()}
                    </p>

                    {/* Actions */}
                    <div className="flex justify-between items-center pt-3">
                      <button
                        onClick={() => navigate(`/blogs/${blog._id}`)}
                        className="text-sm px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 transition"
                      >
                        👁 View
                      </button>

                      <button
                        onClick={() => navigate(`/blogs/edit-blog/${blog._id}`)}
                        className="text-sm px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
                      >
                        ✏ Edit
                      </button>

                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="text-sm px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 transition"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
