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

  // Helper calculations for extra metadata without DB changes
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
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-slate-800 shadow-xl">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">📝</span>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                Editorial Blog Suite
              </h1>
            </div>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Create &amp; edit articles with Tiptap editor, drag &amp; drop images &amp; content analytics ({blogs.length} published articles)
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/admin")}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-4 py-2.5 rounded-xl transition text-xs border border-slate-700"
            >
              ← Portal
            </button>
            <button
              onClick={() => navigate("/admin/create-blog")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2.5 rounded-xl transition text-xs shadow-lg flex items-center gap-2"
            >
              <span>✨</span> Create New Blog
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800 shadow-md">
          <input
            type="text"
            placeholder="🔍 Search blogs by title or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Blog Table */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Blog Title &amp; Slug</th>
                  <th className="px-6 py-4">Content Metrics</th>
                  <th className="px-6 py-4">SEO Health</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-slate-500">
                      Loading articles...
                    </td>
                  </tr>
                ) : filteredBlogs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-12 text-slate-500">
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
                      <tr key={blogId} className="hover:bg-indigo-950/20 transition">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-100 text-sm leading-snug">
                            {blog.title}
                          </div>
                          <div className="text-[11px] font-mono text-indigo-400 mt-0.5">
                            /{blog.slug || "slug"}
                          </div>
                        </td>

                        <td className="px-6 py-4 text-[11px]">
                          <div className="text-slate-300 font-semibold">{words} words</div>
                          <div className="text-slate-400">⏱️ ~{readingTime} min read</div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                hasCover ? "bg-emerald-950 text-emerald-300 border border-emerald-800" : "bg-slate-800 text-slate-500"
                              }`}
                            >
                              {hasCover ? "Cover 📷" : "No Cover"}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                hasExcerpt ? "bg-purple-950 text-purple-300 border border-purple-800" : "bg-slate-800 text-slate-500"
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
                              className="bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-800 text-[11px] px-3 py-1.5 rounded-lg transition font-semibold"
                            >
                              ✏️ Edit
                            </button>

                            <button
                              onClick={() => handleDelete(blogId)}
                              className="bg-red-950 hover:bg-red-900 text-red-300 border border-red-800 text-[11px] px-3 py-1.5 rounded-lg transition font-semibold"
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