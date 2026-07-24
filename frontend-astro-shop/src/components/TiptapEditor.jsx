import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { useState, useRef } from "react";
import axios from "axios";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  ImageIcon,
  Upload,
  Undo,
  Redo,
  RemoveFormatting
} from "lucide-react";

const TiptapEditor = ({ content, onChange, placeholder = "Start writing your blog post here..." }) => {
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-purple-600 underline cursor-pointer",
        },
      }),
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
    content: content || "",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-purple max-w-none focus:outline-none min-h-[300px] p-4 bg-white rounded-b-lg text-gray-800 leading-relaxed border border-t-0 border-gray-300",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const uploadImageFile = async (file) => {
    if (!file) return;
    try {
      setUploadingImage(true);
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
        editor.chain().focus().setImage({ src: res.data.url }).run();
      } else {
        alert("Failed to get image CDN URL.");
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed: " + (err.response?.data?.detail || err.message));
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) uploadImageFile(file);
  };

  const addImageUrlPrompt = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = prompt("Enter URL:", previousUrl);

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetMark("link").run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setMark("link", { href: url }).run();
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm bg-gray-50">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-gray-100 border-b border-gray-300 rounded-t-lg">
        {/* Headings */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`p-2 rounded hover:bg-gray-200 transition ${
            editor.isActive("heading", { level: 1 }) ? "bg-purple-200 text-purple-800" : "text-gray-700"
          }`}
          title="Heading 1"
        >
          <Heading1 size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-gray-200 transition ${
            editor.isActive("heading", { level: 2 }) ? "bg-purple-200 text-purple-800" : "text-gray-700"
          }`}
          title="Heading 2"
        >
          <Heading2 size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-gray-200 transition ${
            editor.isActive("heading", { level: 3 }) ? "bg-purple-200 text-purple-800" : "text-gray-700"
          }`}
          title="Heading 3"
        >
          <Heading3 size={18} />
        </button>

        <div className="h-5 w-[1px] bg-gray-300 mx-1" />

        {/* Text Formats */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-gray-200 transition ${
            editor.isActive("bold") ? "bg-purple-200 text-purple-800" : "text-gray-700"
          }`}
          title="Bold"
        >
          <Bold size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-gray-200 transition ${
            editor.isActive("italic") ? "bg-purple-200 text-purple-800" : "text-gray-700"
          }`}
          title="Italic"
        >
          <Italic size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded hover:bg-gray-200 transition ${
            editor.isActive("underline") ? "bg-purple-200 text-purple-800" : "text-gray-700"
          }`}
          title="Underline"
        >
          <UnderlineIcon size={18} />
        </button>

        <div className="h-5 w-[1px] bg-gray-300 mx-1" />

        {/* Lists & Quotes */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-gray-200 transition ${
            editor.isActive("bulletList") ? "bg-purple-200 text-purple-800" : "text-gray-700"
          }`}
          title="Bullet List"
        >
          <List size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-gray-200 transition ${
            editor.isActive("orderedList") ? "bg-purple-200 text-purple-800" : "text-gray-700"
          }`}
          title="Ordered List"
        >
          <ListOrdered size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-gray-200 transition ${
            editor.isActive("blockquote") ? "bg-purple-200 text-purple-800" : "text-gray-700"
          }`}
          title="Blockquote"
        >
          <Quote size={18} />
        </button>

        <div className="h-5 w-[1px] bg-gray-300 mx-1" />

        {/* Links & Images */}
        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded hover:bg-gray-200 transition ${
            editor.isActive("link") ? "bg-purple-200 text-purple-800" : "text-gray-700"
          }`}
          title="Add Link"
        >
          <LinkIcon size={18} />
        </button>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadingImage}
          className="p-2 rounded hover:bg-gray-200 transition text-gray-700 flex items-center gap-1"
          title="Upload Image to Supabase CDN"
        >
          <Upload size={18} />
          {uploadingImage && <span className="text-xs text-purple-600 font-semibold">Uploading...</span>}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageSelect}
          accept="image/*"
          className="hidden"
        />
        <button
          type="button"
          onClick={addImageUrlPrompt}
          className="p-2 rounded hover:bg-gray-200 transition text-gray-700"
          title="Insert Image URL"
        >
          <ImageIcon size={18} />
        </button>

        <div className="h-5 w-[1px] bg-gray-300 mx-1" />

        {/* Undo / Redo */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="p-2 rounded hover:bg-gray-200 transition text-gray-700"
          title="Undo"
        >
          <Undo size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="p-2 rounded hover:bg-gray-200 transition text-gray-700"
          title="Redo"
        >
          <Redo size={18} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          className="p-2 rounded hover:bg-gray-200 transition text-gray-700"
          title="Clear Formatting"
        >
          <RemoveFormatting size={18} />
        </button>
      </div>

      {/* Editor Content Area */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
