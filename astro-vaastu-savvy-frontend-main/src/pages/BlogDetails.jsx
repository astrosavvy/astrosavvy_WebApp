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

  return (
    <section className="bg-white min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold font-['Playfair_Display']
                       text-[#1B2624] mb-6">
          {blog.title}
        </h1>

        {/* Date */}
        <p className="text-sm font-['Poppins'] text-[#606C33]/80 mb-8">
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="mb-10">
            <img
              src={`${import.meta.env.VITE_API_URL}${blog.coverImage}`}
              alt={blog.title}
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
        )}

        {/* Content */}
        <div
  className="prose max-w-none
             font-['Poppins']
             text-[#1B2624]/90
             leading-relaxed"
  dangerouslySetInnerHTML={{ __html: blog.content }}
/>
      </div>
    </section>
  );
}

export default BlogDetails;