import axios from "axios";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";


const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { navigate } = useAppContext();

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  const fetchAllBlogs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/blogs/blogs/all-users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBlogs(res.data.blogs || []);
      setLoading(false);
    } catch (err) {
      setError("Failed to load blogs");
      setLoading(false);
    }
  };

  // 🔥 auto load on page open
  useEffect(() => {
    fetchAllBlogs();
  }, []);

  // 🔍 search filter
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 📄 pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(
    indexOfFirstBlog,
    indexOfLastBlog
  );

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        All Blog Posts
      </h1>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-400"
        />
      </div>

      {/* States */}
      {loading && <p className="text-center text-slate-400">Loading blogs...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Blog Cards */}
      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">
                    {blog.title}
                  </h2>

                  <p className="text-slate-400 text-sm line-clamp-3 mb-3">
                    {blog.content}
                  </p>

                  <p className="text-xs text-slate-500">
                    By {blog.user.name} •{" "}
                    {new Date(blog.createdAt).toDateString()}
                  </p>
                  <p className="text-blue-400 hover:underline cursor-pointer" onClick={() => navigate(`/blogs/${blog._id}`)}>Read More</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 rounded bg-slate-800 disabled:opacity-40"
              >
                ◀
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-500"
                      : "bg-slate-800"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 rounded bg-slate-800 disabled:opacity-40"
              >
                ▶
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Blogs;
