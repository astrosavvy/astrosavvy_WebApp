import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";

function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/api/shop/blogs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      setBlogs(data.blogs || []);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?"))
      return;

    try {
      await api.delete(`/api/shop/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });

      fetchBlogs();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const calculateContentStats = (htmlContent = "") => {
    const plainText = htmlContent.replace(/<[^>]+>/g, " ").trim();
    const words = plainText ? plainText.split(/\s+/).length : 0;
    const readingTime = Math.max(1, Math.ceil(words / 200));
    return { words, readingTime };
  };

  const filteredBlogs = blogs.filter((b) =>
    (b.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* White Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">📝</span>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-purple-950">
                Editorial Blog Suite
              </h1>
            </div>
            <p className="text-xs md:text-sm text-gray-500 mt-1">
              Create &amp; edit articles with Tiptap editor, drag &amp; drop images &amp; content analytics ({blogs.length} published articles)
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/admin")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2.5 rounded-xl transition text-xs border border-gray-300"
            >
              ← Portal
            </button>
            <button
              onClick={() => navigate("/admin/create-blog")}
              className="bg-purple-700 hover:bg-purple-800 text-white font-semibold px-5 py-2.5 rounded-xl transition text-xs shadow-sm flex items-center gap-2"
            >
              <span>✨</span> Create New Blog
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
          <input
            type="text"
            placeholder="🔍 Search blogs by title or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Blog Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-purple-50 text-purple-900 font-bold uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Blog Title &amp; Slug</th>
                  <th className="px-6 py-4">Content Metrics</th>
                  <th className="px-6 py-4">SEO Health</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-gray-400">
                      Loading articles...
                    </td>
                  </tr>
                ) : filteredBlogs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-gray-400">
                      No blog posts found. Click &ldquo;Create New Blog&rdquo; to draft one!
                    </td>
                  </tr>
                ) : (
                  filteredBlogs.map((blog) => {
                    const blogId = blog.id || blog._id;
                    const isPub = blog.is_published ?? blog.isPublished ?? true;
                    const { words, readingTime } = calculateContentStats(blog.content);
                    const hasCover = Boolean(blog.cover_image || blog.coverImage);
                    const hasExcerpt = Boolean(blog.excerpt);

                    return (
                      <tr key={blogId} className="hover:bg-purple-50/60 transition">
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900 text-sm leading-snug">
                            {blog.title}
                          </div>
                          <div className="text-[11px] font-mono text-purple-700 mt-0.5">
                            /{blog.slug || "slug"}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-[11px]">
                          <div className="text-gray-800 font-semibold">{words} words</div>
                          <div className="text-gray-500">⏱️ ~{readingTime} min read</div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                hasCover ? "bg-emerald-100 text-emerald-800 border border-emerald-200" : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {hasCover ? "Cover 📷" : "No Cover"}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                hasExcerpt ? "bg-purple-100 text-purple-800 border border-purple-200" : "bg-gray-100 text-gray-400"
                              }`}
                            >
                              {hasExcerpt ? "Summary 📝" : "No Excerpt"}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              isPub
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : "bg-amber-100 text-amber-800 border border-amber-300"
                            }`}
                          >
                            {isPub ? "Published" : "Draft"}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => navigate(`/admin/edit-blog/${blogId}`)}
                              className="bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-200 text-[11px] px-3 py-1.5 rounded-lg transition font-semibold"
                            >
                              ✏️ Edit
                            </button>

                            <button
                              onClick={() => handleDelete(blogId)}
                              className="bg-red-100 hover:bg-red-200 text-red-800 border border-red-200 text-[11px] px-3 py-1.5 rounded-lg transition font-semibold"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminBlogs;