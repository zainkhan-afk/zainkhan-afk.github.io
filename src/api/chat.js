// src/api/chat.js
import { getVisitorId } from "@/lib/visitor";

export async function sendChatMessage(messages) {
  try {
    const visitor_id = getVisitorId();
    const res = await fetch("https://multi-project-api.vercel.app/chat/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({messages, visitor_id}),
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
