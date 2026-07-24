import { useState } from "react";

function PromptBox() {
  const [open, setOpen] = useState(false);
  const [showKundliAd, setShowKundliAd] = useState(true);
  const [messages, setMessages] = useState([
    {
      sender: "system",
      text: "Welcome to our website. If you need any help or have a specific query, reply to this message and we will revert back to you.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };

    const replyOne = {
      sender: "system",
      text: "Thank you for connecting with Astro Vaastu Expert Savvy Singh, a renowned Celebrity Astrologer and Vastu Consultant.",
    };

    const replyTwo = {
      sender: "system",
      text:
        "We are happy to assist you further. For individualized and prompt solutions, kindly book an appointment or connect with us on WhatsApp at +91 7303014789.",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, replyOne]);
    }, 700);

    setTimeout(() => {
      setMessages((prev) => [...prev, replyTwo]);
    }, 1600);
  };

  return (
    <>
      {/* Floating Kundli Ad */}
      {showKundliAd && (
        <div
          className="fixed bottom-24 right-6 z-[9998]
                     flex flex-col items-center
                     transition-all duration-300"
        >
          {/* Close Button */}
          <button
            onClick={() => setShowKundliAd(false)}
            className="absolute -top-2 -right-2
                       w-5 h-5 rounded-full
                       bg-black/70 text-white
                       text-xs flex items-center justify-center
                       hover:bg-black"
            aria-label="Close"
          >
            ✕
          </button>

          <a
            href="/kundli-analysis"
            className="flex flex-col items-center
                       transition-transform duration-300
                       hover:scale-105"
          >
            <img
              src="/images/kundli-illustration.jpeg"
              alt="Bhagya Kundli"
              className="w-16 sm:w-20 md:w-24
                         animate-[float_4s_ease-in-out_infinite]"
            />

            <p
              className="mt-1 text-[10px] sm:text-xs md:text-sm
                         font-['Playfair_Display']
                         text-[#1B2624] text-center"
            >
              Book your Bhagya Kundli now
            </p>
          </a>
        </div>
      )}

      {/* Floating Help Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9999]
                   bg-[#BC6C25] text-white
                   px-5 py-3 rounded-full shadow-lg
                   hover:opacity-90 transition"
      >
        💬 Help?
      </button>

      {/* Chat Box */}
      {open && (
        <div
          className="fixed bottom-20 right-4 sm:right-6 z-[9999]
                     w-72 sm:w-80 bg-[#F5EBE0]
                     border border-[#606C33]/40
                     rounded-xl shadow-xl flex flex-col"
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-[#606C33]/30">
            <p className="font-['Playfair_Display'] text-[#1B2624]">
              Astro Vaastu Savvy
            </p>
            <p className="text-xs font-['Poppins'] text-[#606C33]">
              Professional Consultation Support
            </p>
          </div>

          {/* Messages */}
          <div className="p-4 space-y-3 overflow-y-auto max-h-60 text-sm">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[#DDA158]/30 text-right ml-auto"
                    : "bg-white"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="px-4 pb-3">
            <a
              href="https://wa.me/917303014789"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#25D366] text-white py-2 rounded-md text-sm font-['Poppins'] shadow hover:opacity-90 transition"
            >
              💬 Chat on WhatsApp
            </a>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-[#606C33]/30 flex gap-2">
            <input
              type="text"
              placeholder="Type your message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-md border border-[#606C33]/40 text-sm focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-[#1B2624] text-white px-4 py-2 rounded-md text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PromptBox;
