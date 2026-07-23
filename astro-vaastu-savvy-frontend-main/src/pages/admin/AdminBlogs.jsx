import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";

function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await api.get("/api/shop/blogs", {
        headers: {
          // ✅ Updated key to adminToken
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      setBlogs(data.blogs);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch blogs");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?"))
      return;

    try {
      await api.delete(`/api/shop/blogs/${id}`, {
        headers: {
          // ✅ Updated key to adminToken
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      fetchBlogs();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">All Blogs</h2>
        <button
          onClick={() => navigate("/admin/create-blog")}
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          + Create Blog
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Published</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-gray-50">
                <td className="p-3 border font-medium">{blog.title}</td>
                <td className="p-3 border text-center">
                  <span className={`px-2 py-1 rounded text-sm ${blog.isPublished ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {blog.isPublished ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="p-3 border">
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/admin/edit-blog/${blog._id}`)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {blogs.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center p-8 text-gray-500">
                  No blogs found. Start by creating one!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminBlogs;