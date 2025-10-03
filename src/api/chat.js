// src/lib/chatService.js

export async function sendChatMessage(messages) {
  try {
    const res = await fetch("http://127.0.0.1:8000/chat/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({messages}),
    });

    if (!res.ok) {
      throw new Error(`API returned ${res.status}`);
    }

    const data = await res.json();
    return data.reply;
  } catch (err) {
    console.error("Chat service error:", err);
    return "⚠️ Sorry, something went wrong.";
  }
}
