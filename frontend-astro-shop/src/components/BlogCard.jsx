import { useNavigate } from "react-router-dom";

function BlogCard({ blog }) {
  const navigate = useNavigate();

  const getCoverUrl = (b) => {
    if (!b) return null;
    const img = b.cover_image || b.coverImage;
    if (!img) return null;
    if (img.startsWith("http://") || img.startsWith("https://") || img.startsWith("data:")) {
      return img;
    }
    const baseUrl = import.meta.env.VITE_API_URL || "https://api.astrosavvysingh.com";
    return img.startsWith("/") ? `${baseUrl}${img}` : `${baseUrl}/${img}`;
  };

  const coverUrl = getCoverUrl(blog);

  return (
    <div
      onClick={() => navigate(`/blogs/${blog.slug}`)}
      className="cursor-pointer bg-[#F5EBE0] border border-[#606C33]/40
                 rounded-2xl overflow-hidden shadow-sm
                 hover:shadow-xl hover:-translate-y-1
                 transition duration-300 flex flex-col justify-between"
    >
      {/* Image */}
      {coverUrl && (
        <div className="w-full h-56 bg-slate-900/5 border-b border-[#606C33]/20 overflow-hidden flex items-center justify-center">
          <img
            src={coverUrl}
            alt={blog.title}
            className="w-full h-full object-cover transition duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold font-['Playfair_Display']
                         text-[#1B2624] mb-3 line-clamp-2">
            {blog.title}
          </h3>

          <p className="text-sm font-['Poppins']
                        text-[#1B2624]/75 line-clamp-3">
            {blog.excerpt}
          </p>
        </div>

        <div className="mt-4 text-[#BC6C25] font-['Poppins'] text-sm font-medium">
          Read More →
        </div>
      </div>
    </div>
  );
}

export default BlogCard;