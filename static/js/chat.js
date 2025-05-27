document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("chat-toggle");
    const chatWidget = document.getElementById("chat-widget");
    const chatMessages = document.getElementById("chat-messages");
    const input = document.getElementById("chat-input");
  
    if (toggleBtn && chatWidget && chatMessages && input) {
      toggleBtn.addEventListener("click", () => {
        chatWidget.style.display = chatWidget.style.display === "none" ? "block" : "none";
      });
  
      window.sendMessage = async function () {
        const message = input.value.trim();
        if (!message) return;
  
        const userMsg = document.createElement("p");
        userMsg.className = "has-text-right has-text-weight-semibold";
        userMsg.textContent = "You: " + message;
        chatMessages.appendChild(userMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        input.value = "";
  
        try {
          const res = await fetch("http://localhost:8000/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
          });
          const data = await res.json();
  
          const botMsg = document.createElement("p");
          botMsg.className = "has-text-left";
          botMsg.textContent = "Bot: " + data.reply;
          chatMessages.appendChild(botMsg);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        } catch (e) {
          const errorMsg = document.createElement("p");
          errorMsg.className = "has-text-danger";
          errorMsg.textContent = "Bot: Error reaching server.";
          chatMessages.appendChild(errorMsg);
        }
      };
    }
  });
  