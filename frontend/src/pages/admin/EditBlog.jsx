import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [loading, setLoading] = useState(false);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "list",
    "bullet",
    "link",
  ];

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const { data } = await api.get(`/api/shop/blogs/${id}`);

      const blog = data.blog;
      setTitle(blog.title);
      setExcerpt(blog.excerpt);
      setContent(blog.content);
      setIsPublished(blog.isPublished);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch blog");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("excerpt", excerpt);
      formData.append("content", content);
      formData.append("isPublished", isPublished);

      await api.put(`/api/shop/blogs/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Blog updated successfully!");
      navigate("/admin/blogs");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update blog");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Edit Blog</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block font-medium">Title</label>
        <input
          type="text"
          className="w-full border p-3 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label className="block font-medium">Excerpt</label>
        <textarea
          className="w-full border p-3 rounded"
          rows="2"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
        />

        <div>
          <label className="block mb-2 font-medium">Blog Content</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="bg-white mb-4"
            modules={modules}
            formats={formats}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="publish"
            checked={isPublished}
            onChange={() => setIsPublished(!isPublished)}
          />
          <label htmlFor="publish">Publish Blog</label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-3 rounded w-full md:w-auto hover:bg-gray-800 transition"
        >
          {loading ? "Updating..." : "Update Blog"}
        </button>
      </form>
    </div>
  );
}

export default EditBlog;