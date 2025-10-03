"use client";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";

import { sendChatMessage } from "@/api/chat";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi, I am Zain.\nHow can I help you?" }
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await sendChatMessage(newMessages);

      setMessages([
        ...newMessages,
        { role: "assistant", content: res },
      ]);
    } catch (error) {
      console.error("Chat error:", error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="p-4 bg-pink-600 rounded-full shadow-lg hover:bg-pink-700 transition"
        >
          <MessageCircle className="w-6 h-6 text-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-85 h-110 bg-white rounded-xl shadow-xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-3 bg-pink-600 text-white">
            <span className="font-semibold">Chat with me</span>
            <button onClick={toggleChat}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? "ml-auto bg-pink-500 text-white"
                    : "mr-auto bg-gray-200 text-gray-800"
                }`}
              >
                <article className="max-w-full prose">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw, rehypeHighlight]}
                    >
                      {msg.content}
                  </ReactMarkdown>
                </article>
              </div>
            ))}
            {/* dummy div to scroll into */}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-2 border-t flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 border rounded-l-lg focus:outline-none text-sm text-black"
            />
            <button
              onClick={handleSend}
              className="bg-pink-600 text-white px-4 rounded-r-lg hover:bg-pink-700 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
