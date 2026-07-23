import { useNavigate } from "react-router-dom";

function BlogCard({ blog }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/blogs/${blog.slug}`)}
      className="cursor-pointer bg-[#F5EBE0] border border-[#606C33]/40
                 rounded-2xl overflow-hidden shadow-sm
                 hover:shadow-xl hover:-translate-y-1
                 transition duration-300"
    >
      {/* Image */}
      {blog.coverImage && (
        <img
          src={`${import.meta.env.VITE_API_URL}${blog.coverImage}`}
          alt={blog.title}
          className="w-full h-56 object-cover"
        />
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold font-['Playfair_Display']
                       text-[#1B2624] mb-3">
          {blog.title}
        </h3>

        <p className="text-sm font-['Poppins']
                      text-[#1B2624]/75 line-clamp-3">
          {blog.excerpt}
        </p>

        <div className="mt-4 text-[#BC6C25] font-['Poppins'] text-sm font-medium">
          Read More →
        </div>
      </div>
    </div>
  );
}

export default BlogCard;