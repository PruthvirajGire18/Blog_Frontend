import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [approvedBlogs, setApprovedBlogs] = useState([]);

  const token = localStorage.getItem("token");

  // =============================
  // Fetch approved blogs
  // =============================
  const fetchApprovedBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://blog-backend-topaz-seven.vercel.app/api/admin/admin/blogs",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setApprovedBlogs(res.data.blogs || []);
    } catch (error) {
      console.error("Error fetching approved blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // Fetch pending blogs
  // =============================
  const fetchPendingBlogs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://blog-backend-topaz-seven.vercel.app/api/admin/admin/blogs/pending",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setPendingBlogs(res.data.blogs || []);
    } catch (error) {
      console.error("Error fetching pending blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // Approve / Reject (Optimistic UI)
  // =============================
  const updateBlogStatus = async (blogId, status) => {
    try {
      await axios.put(
        `https://blog-backend-topaz-seven.vercel.app/api/admin/admin/blog/${blogId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // 🔥 Optimistic UI update
      const blogToUpdate = pendingBlogs.find(
        (blog) => blog._id === blogId
      );

      // Remove from pending
      setPendingBlogs((prev) =>
        prev.filter((blog) => blog._id !== blogId)
      );

      // Add to approved if approved
      if (status === "approved" && blogToUpdate) {
        setApprovedBlogs((prev) => [
          { ...blogToUpdate, status: "approved" },
          ...prev,
        ]);
      }
    } catch (error) {
      console.error("Error updating blog status:", error);
    }
  };

  // =============================
  // Initial load
  // =============================
  useEffect(() => {
    if (user?.role === "admin") {
      fetchApprovedBlogs();
      fetchPendingBlogs();
    }
  }, [user]);

  // =============================
  // Role protection
  // =============================
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <h1 className="text-4xl font-bold text-red-500">
          🚫 Access Denied
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-extrabold">Admin Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Manage blog approvals
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Logged in as{" "}
          <span className="text-blue-400">{user?.name}</span>
        </p>
      </div>

      {loading && (
        <p className="text-center text-gray-400">
          Loading blogs...
        </p>
      )}

      {/* ================= PENDING BLOGS ================= */}
      <Section
        title="⏳ Pending Blogs"
        color="yellow"
        blogs={pendingBlogs}
        showActions={true}
        onApprove={updateBlogStatus}
        onReject={updateBlogStatus}
      />

      {/* ================= APPROVED BLOGS ================= */}
      <Section
        title="✅ Approved Blogs"
        color="green"
        blogs={approvedBlogs}
        showActions={false}
      />
    </div>
  );
};

export default AdminDashboard;

// ===================================================
// Section Component
// ===================================================
const Section = ({
  title,
  color,
  blogs,
  showActions,
  onApprove,
  onReject,
}) => {
  return (
    <div className="max-w-7xl mx-auto mb-16">
      <h2
        className={`text-2xl font-bold mb-6 text-${color}-400`}
      >
        {title} ({blogs.length})
      </h2>

      {blogs.length === 0 ? (
        <p className="text-gray-400">No blogs found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              showActions={showActions}
              onApprove={onApprove}
              onReject={onReject}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// ===================================================
// Blog Card Component
// ===================================================
const BlogCard = ({
  blog,
  showActions,
  onApprove,
  onReject,
}) => {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg">
      {/* IMAGE */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-3">
        <h3 className="text-xl font-semibold line-clamp-2">
          {blog.title}
        </h3>

        <p className="text-gray-300 text-sm line-clamp-3">
          {blog.content}
        </p>

        <div className="flex justify-between items-center text-sm text-gray-400">
          <span>
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
          <span
            className={`px-2 py-1 rounded ${
              blog.status === "pending"
                ? "bg-yellow-600/20 text-yellow-400"
                : "bg-green-600/20 text-green-400"
            }`}
          >
            {blog.status}
          </span>
        </div>

        {/* ACTION BUTTONS */}
        {showActions && (
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => onApprove(blog._id, "approved")}
              className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
            >
              Approve
            </button>

            <button
              onClick={() => onReject(blog._id, "rejected")}
              className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
