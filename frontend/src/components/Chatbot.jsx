import { useState } from "react";

const API_URL = "http://localhost:8000/api/chat";

function Chatbot({ isOpen, setIsOpen }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "The sky is silent right now. Try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-icarus-bg border border-icarus-fg/20 flex flex-col z-50">
      <div className="flex justify-between items-center px-4 py-3 border-b border-icarus-fg/20">
        <span className="text-xs tracking-widest text-icarus-accent">
          ASK ICARUS
        </span>
        <button
          onClick={() => setIsOpen(false)}
          className="text-icarus-fg/60 hover:text-icarus-fg"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 text-sm">
        {messages.length === 0 && (
          <p className="text-icarus-fg/40 text-xs">
            Ask about ambition, flight, or falling.
          </p>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.role === "user"
                ? "text-icarus-fg text-right"
                : "text-icarus-fg/70"
            }
          >
            {msg.content}
          </div>
        ))}
        {loading && <div className="text-icarus-fg/40 text-xs">...</div>}
      </div>

      <div className="flex border-t border-icarus-fg/20">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a question..."
          className="flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-icarus-fg/30"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="px-4 text-icarus-accent text-sm hover:text-icarus-fg disabled:opacity-40"
        >
          →
        </button>
      </div>
    </div>
  );
}

export default Chatbot;