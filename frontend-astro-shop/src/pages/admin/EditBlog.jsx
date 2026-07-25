import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TiptapEditor from "../../components/TiptapEditor";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [uploadingCover, setUploadingCover] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setFetching(true);
      const API_URL = import.meta.env.VITE_API_URL || "https://api.astrosavvysingh.com";
      const { data } = await axios.get(`${API_URL}/api/shop/blogs/${id}`);

      const blog = data.blog;
      if (blog) {
        setTitle(blog.title || "");
        setSlug(blog.slug || "");
        setExcerpt(blog.excerpt || "");
        setContent(blog.content || "");
        setCoverImage(blog.cover_image || blog.coverImage || "");
        setIsPublished(blog.is_published ?? blog.isPublished ?? true);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to fetch blog details");
    } finally {
      setFetching(false);
    }
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingCover(true);
      const formData = new FormData();
      formData.append("file", file);

      const API_URL = import.meta.env.VITE_API_URL || "https://api.astrosavvysingh.com";
      const token = localStorage.getItem("adminToken");

      const res = await axios.post(`${API_URL}/api/admin/blogs/upload-image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.url) {
        setCoverImage(res.data.url);
      }
    } catch (err) {
      console.error("Cover upload failed:", err);
      alert("Cover image upload failed.");
    } finally {
      setUploadingCover(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      const API_URL = import.meta.env.VITE_API_URL || "https://api.astrosavvysingh.com";
      const token = localStorage.getItem("adminToken");

      await axios.put(
        `${API_URL}/api/shop/blogs/${id}`,
        {
          title,
          slug,
          excerpt,
          content,
          coverImage,
          isPublished,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Blog updated successfully!");
      navigate("/admin/blogs");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || error.response?.data?.message || "Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center text-gray-500">
        Loading blog details...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Edit Blog Post</h2>
        <button
          onClick={() => navigate("/admin/blogs")}
          className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition"
        >
          ← Back to Blogs
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow border border-gray-200">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Blog Title</label>
          <input
            type="text"
            placeholder="Blog Title"
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">URL Slug</label>
          <input
            type="text"
            placeholder="url-slug"
            className="w-full border border-gray-300 p-3 rounded-lg text-sm font-mono text-gray-600 bg-gray-50 focus:outline-none"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Cover Image Banner</label>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Cover Image URL or upload file →"
              className="flex-1 border border-gray-300 p-3 rounded-lg text-sm"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
            />
            <label className="cursor-pointer bg-purple-100 hover:bg-purple-200 text-purple-800 font-semibold px-4 py-3 rounded-lg text-sm transition">
              {uploadingCover ? "Uploading..." : "Upload Banner"}
              <input type="file" accept="image/*" className="hidden" onChange={handleCoverUpload} />
            </label>
          </div>
          {coverImage && (
            <div className="mt-3 bg-gray-50 p-2 border border-gray-200 rounded-xl">
              <img src={coverImage} alt="Cover preview" className="max-h-80 w-full object-contain rounded-lg shadow-sm" />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Brief Excerpt / Summary</label>
          <textarea
            placeholder="Excerpt summary..."
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            rows="2"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Blog Content (Tiptap Rich-Text Editor)</label>
          <TiptapEditor content={content} onChange={setContent} placeholder="Edit blog content..." />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="publish"
            checked={isPublished}
            onChange={() => setIsPublished(!isPublished)}
            className="w-4 h-4 text-purple-600 rounded"
          />
          <label htmlFor="publish" className="text-sm font-medium text-gray-700">Published on website</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-800 shadow-md"
          }`}
        >
          {loading ? "Updating Blog..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

export default EditBlog;