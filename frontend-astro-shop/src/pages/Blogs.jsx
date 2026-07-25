import { useEffect, useState } from "react";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await api.get("/api/shop/blogs");
      setBlogs(data.blogs || []);
    } catch (error) {
      console.error(error);
    }
  };

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

  return (
    <section className="relative bg-[white] overflow-hidden">
{/* Animated background layers */}
<div className="pointer-events-none absolute inset-0 -z-0">

  {/* Floating golden aura */}
  <div className="absolute -top-32 -left-32 w-[420px] h-[420px]
                  bg-[#DDA158]/25 rounded-full blur-[120px]
                  animate-floatSlow">
  </div>

  {/* Olive green aura */}
  <div className="absolute top-1/3 -right-40 w-[520px] h-[520px]
                  bg-[#606C33]/20 rounded-full blur-[140px]
                  animate-floatSlower">
  </div>

  {/* Soft horizontal drift */}
  <div className="absolute bottom-0 left-0 w-full h-full
                  bg-gradient-to-r from-transparent via-[#BC6C25]/5 to-transparent
                  animate-drift">
  </div>

</div>

      <div className="max-w-7xl mx-auto px-6 py-20 space-y-28">

        {/* FEATURED BLOG*/}

{blogs.length > 0 && (
  <div className="relative max-w-6xl mx-auto">

    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-10 left-10 w-64 h-64 bg-[#DDA158]/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-10 w-64 h-64 bg-[#606C33]/20 blur-[120px] rounded-full" />
    </div>

    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8
                    bg-[#F5EBE0] border border-[#606C33]/40
                    rounded-3xl p-8 md:p-10 shadow-md
                    hover:shadow-xl transition">

      {/* IMAGE */}
      {getCoverUrl(blogs[0]) && (
        <div className="md:col-span-1 flex justify-center items-center">
          <img
            src={getCoverUrl(blogs[0])}
            alt={blogs[0].title}
            className="w-full max-h-64 object-cover rounded-2xl shadow-md border border-[#606C33]/20"
          />
        </div>
      )}

      {/* CONTENT */}
      <div className={`${getCoverUrl(blogs[0]) ? "md:col-span-2" : "md:col-span-3"} flex flex-col justify-center`}>

        <span className="inline-block mb-3 text-xs uppercase tracking-wide
                         bg-[#BC6C25]/10 text-[#BC6C25]
                         px-3 py-1 rounded-full w-fit">
          Featured Blog
        </span>

        <h3 className="text-2xl md:text-3xl font-['Playfair_Display']
                       text-[#1B2624] font-bold mb-4">
          {blogs[0].title}
        </h3>

        <p className="font-['Poppins'] text-[#1B2624]/80 leading-relaxed mb-6">
          {blogs[0].excerpt}
        </p>

        <div>
          <button
            onClick={() => navigate(`/blogs/${blogs[0].slug}`)}
            className="inline-flex items-center gap-2
                       px-6 py-3 rounded-full
                       bg-[#BC6C25] text-white
                       font-['Poppins']
                       shadow-lg hover:shadow-xl
                       hover:translate-y-[-2px] transition-all"
          >
            Read Full Blog →
          </button>
        </div>
      </div>
    </div>
  </div>
)}
{/*Remaining blogs*/}
{blogs.length > 1 && (
  <div className="grid md:grid-cols-3 gap-8 mt-16">
    {blogs.slice(1).map((blog) => (
      <BlogCard key={blog.id || blog._id} blog={blog} />
    ))}
  </div>
)}
        {/* FEATURED BLOG – MAHA SHIVRATRI */}
<div className="relative max-w-6xl mx-auto">

  {/* Soft background glow */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      className="absolute -top-10 left-10 w-64 h-64
                 bg-[#DDA158]/20 blur-[120px] rounded-full"
    />
    <div
      className="absolute bottom-0 right-10 w-64 h-64
                 bg-[#606C33]/20 blur-[120px] rounded-full"
    />
  </div>

  {/* Card */}
  <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8
                  bg-[#F5EBE0] border border-[#606C33]/40
                  rounded-3xl p-8 md:p-10 shadow-md
                  hover:shadow-xl transition">

    {/* LEFT – IMAGE */}
    <div className="md:col-span-1 flex justify-center">
      <img
        src="/images/maha-shivratri.png"
        alt="Maha Shivratri 2026"
        className="w-full max-w-xs rounded-2xl shadow-lg"
      />
    </div>

    {/* RIGHT – CONTENT */}
    <div className="md:col-span-2 flex flex-col justify-center">

      <span className="inline-block mb-3 text-xs uppercase tracking-wide
                       bg-[#BC6C25]/10 text-[#BC6C25]
                       px-3 py-1 rounded-full w-fit">
        Featured Blog
      </span>

      <h3 className="text-2xl md:text-3xl font-['Playfair_Display']
                     text-[#1B2624] font-bold mb-4">
        महाशिवरात्रि 2026: तिथि, पूजा का शुभ समय, व्रत विधि, अनुष्ठान और महत्व
      </h3>

      <p className="font-['Poppins'] text-[#1B2624]/80 leading-relaxed mb-6">
        महा शिवरात्रि भगवान शिव की आराधना, तपस्या और आध्यात्मिक जागरण का पावन पर्व है।
        इस ब्लॉग में महाशिवरात्रि 2026 की तिथि, पूजा का शुभ समय, व्रत विधि और धार्मिक महत्व
        का विस्तार से वर्णन किया गया है।
      </p>

      {/* CTA */}
      <div>
        <a
          href="/blogs/maha-shivratri"
          className="inline-flex items-center gap-2
                     px-6 py-3 rounded-full
                     bg-[#BC6C25] text-white
                     font-['Poppins']
                     shadow-lg hover:shadow-xl
                     hover:translate-y-[-2px] transition-all"
        >
          पूरा ब्लॉग पढ़ें
          <span className="text-lg">→</span>
        </a>
      </div>

    </div>
  </div>
</div>

{/* PAGE INTRO */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-7xl">



  {/* LEFT TEXT */}
  <div className="max-w-4xl">
    <h1 className="text-4xl font-bold md:text-5xl font-['Playfair_Display'] text-[#1B2624] leading-tight">
      Discourses, Writings & Media
    </h1>

    <div className="mt-4 h-px w-24 bg-[#606C33]/60"></div>

    <p className="mt-6 font-['Poppins'] text-[#1B2624]/85 leading-relaxed">
      A curated collection of public discourses, written insights, and
      upcoming media engagements by Acharaya Dr. Savvy Singh — reflecting
      disciplined thought, ethical responsibility, and analytical depth
      across astrology, vastu, numerology, and socio-political studies.
    </p>
  </div>

  {/* RIGHT IMAGE */}
  <div className="flex justify-center md:justify-end">
    <div className="relative">

      {/* Soft shadow layer */}
      <div className="absolute inset-0 translate-x-3 translate-y-3 bg-[#606C33]/15 rounded-xl"></div>

     <div className="flex flex-row gap-4 justify-center items-center">
  <img
    src="/images/media/media-11.jpeg"
    alt="Discourses and Media Presence"
    className="relative w-72 md:w-60 rounded-xl border border-[#606C33]/40 bg-[#F5EBE0] shadow-lg"
  />
  <img
    src="/images/media/media-5.jpeg"
    alt="Discourses and Media Presence"
    className="relative w-72 md:w-60 rounded-xl border border-[#606C33]/40 bg-[#F5EBE0] shadow-lg"
  />
</div>
    </div>
  </div>

</div>


        {/* VIDEO DISCOURSES */}
  {/* VIDEO DISCOURSES */}
<div className="relative max-w-7xl mx-auto flex flex-col items-center">


  {/* Subtle constrained background glow */}
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div
      className="absolute top-16 right-12 w-56 h-56
                 bg-[#DDA158]/18 blur-[100px] rounded-full
                 animate-floatSlow"
    />
    <div
      className="absolute bottom-16 left-12 w-56 h-56
                 bg-[#606C33]/14 blur-[100px] rounded-full
                 animate-floatSlower"
    />
  </div>

  {/* Content ABOVE glow */}
  <div className="relative z-10">
    <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] text-[#1B2624] font-bold mb-6">
      Public Video Discourses
    </h2>

    <p className="max-w-3xl font-['Poppins'] text-[#1B2624]/80 leading-relaxed mb-14">
      Selected appearances from national and international platforms where
      <span className="font-bold">Acharaya Dr. Savvy Singh</span> presents structured insights with clarity,
      responsibility, and precision.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {[
        "6IUR4LYMnus",
        "5wDRJPVV9Vo",
        "lZegYBRFCUo",
        "DiggIiFAzAc",
        "VTkK4I1i7C8",
        "6IUR4LYMnus",
      ].map((id, index) => (
        <div
          key={index}
          className="group bg-[#F5EBE0] border border-[#606C33]/40 rounded-2xl
                     overflow-hidden shadow-sm hover:shadow-xl
                     transition hover:-translate-y-1"
        >
          <div className="aspect-video bg-[#606C33]/10">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${id}`}
              title="YouTube discourse"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="p-6">
            <p className="font-['Playfair_Display'] text-[#1B2624] mb-2">
              Analytical Discourse 
            </p>
            <p className="text-sm font-['Poppins'] text-[#1B2624]/70">
              A structured discussion offering astrological and vastu-based
              insights on contemporary life themes.
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>



        {/* YOUTUBE CHANNEL HIGHLIGHT */}
\{/* YOUTUBE CHANNEL HIGHLIGHT */}
<div className="relative border border-[#606C33]/40 rounded-3xl
                bg-[#F5EBE0] shadow-md overflow-hidden
                p-8 md:p-12 max-w-6xl mx-auto
                transition hover:shadow-xl">

  {/* Soft background glow */}
{/* Background glow – subtle & constrained */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">
  <div
    className="absolute top-20 right-10 w-56 h-56
               bg-[#DDA158]/18 blur-[100px] rounded-full
               animate-floatSlow"
  />
  <div
    className="absolute bottom-20 left-10 w-56 h-56
               bg-[#606C33]/14 blur-[100px] rounded-full
               animate-floatSlower"
  />
</div>

  <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 items-center">

    {/* LEFT – IMAGE / CHANNEL VISUAL */}
    <div className="flex justify-center md:justify-start">
   <div className="relative max-w-7xl mx-auto">

        {/* YouTube ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#BC6C25]/40"></div>

        {/* Thumbnail / Channel Image */}
        <img
          src="/images/media/media-10.jpeg"  // you can change this anytime
          alt="Astro Vaastu Savvy YouTube Channel"
          className="relative w-40 h-40 rounded-full object-cover shadow-lg"
        />

        {/* YouTube Icon Badge */}
        <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full
                        bg-[#BC6C25] flex items-center justify-center shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="white"
            className="w-5 h-5"
          >
            <path d="M23.498 6.186a2.958 2.958 0 00-2.08-2.094C19.63 3.5 12 3.5 12 3.5s-7.63 0-9.418.592A2.958 2.958 0 00.502 6.186C0 7.975 0 12 0 12s0 4.025.502 5.814a2.958 2.958 0 002.08 2.094C4.37 20.5 12 20.5 12 20.5s7.63 0 9.418-.592a2.958 2.958 0 002.08-2.094C24 16.025 24 12 24 12s0-4.025-.502-5.814zM9.75 15.5v-7l6.25 3.5-6.25 3.5z"/>
          </svg>
        </div>
      </div>
    </div>

    {/* CENTER – TEXT */}
    <div className="md:col-span-2">
      <h3 className="text-2xl md:text-3xl font-['Playfair_Display'] text-[#1B2624] font-bold mb-3">
        Astro Vaastu Savvy — Official YouTube Channel
      </h3>

      <p className="font-['Poppins'] text-[#1B2624]/80 leading-relaxed mb-5">
        A long-standing digital platform where Achraya Dr. Savvy Singh shares
        structured discourses on astrology, vastu, numerology, and
        socio-political analysis — guided by ethics, clarity, and discipline.
      </p>

      {/* STATS */}
      <div className="flex flex-wrap gap-6 text-sm font-['Poppins'] text-[#1B2624]/75">
        <span>📍 India</span>
        <span>📅 Joined Feb 2017</span>
        <span>👥 11.3K+ Subscribers</span>
        <span>🎥 1,100+ Videos</span>
        <span>👁️ 1.3M+ Views</span>
      </div>
    </div>

    {/* RIGHT – CTA */}
    <div className="flex md:justify-end">
      <a
        href="https://www.youtube.com/@AstroVaastuSavvy"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2
                   px-5 py-3 rounded-full
                   bg-[#BC6C25] text-white
                   font-['Poppins']
                   shadow-lg hover:shadow-xl
                   hover:translate-y-[-2px] transition-all"
      >
        Visit Channel
        <span className="text-lg">→</span>
      </a>
    </div>

  </div>
</div>


      

      </div>
    </section>
  );
}

export default Blogs;
