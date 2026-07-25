import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/axios";

function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const { data } = await api.get(`/api/shop/blogs/${slug}`);
      setBlog(data.blog);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getPublishedDate = (blogObj) => {
    if (!blogObj) return null;
    const rawDate = blogObj.created_at || blogObj.createdAt || blogObj.created_time;
    if (!rawDate) return null;
    const d = new Date(rawDate);
    if (isNaN(d.getTime())) return null;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-['Poppins'] text-[#606C33]">
          Loading blog...
        </p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-['Poppins'] text-red-500">
          Blog not found
        </p>
      </div>
    );
  }

  const publishedDate = getPublishedDate(blog);
  const coverUrl = blog.cover_image || blog.coverImage;

  return (
    <section className="bg-white min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold font-['Playfair_Display'] text-[#1B2624] mb-4">
          {blog.title}
        </h1>

        {/* Date: Only show if valid, otherwise hide completely */}
        {publishedDate && (
          <p className="text-sm font-['Poppins'] text-[#606C33]/80 mb-8 font-medium">
            📅 {publishedDate}
          </p>
        )}

        {/* Cover Image */}
        {coverUrl && (
          <div className="mb-10 bg-white p-1 border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
            <img
              src={coverUrl.startsWith("http") ? coverUrl : `${import.meta.env.VITE_API_URL}${coverUrl}`}
              alt={blog.title}
              className="w-full max-h-[650px] object-contain rounded-xl"
              loading="eager"
            />
          </div>
        )}

        {/* Content */}
        <div
          className="prose max-w-none font-['Poppins'] text-[#1B2624]/90 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </section>
  );
}

export default BlogDetails;