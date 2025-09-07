// script.js
const chatBox = document.getElementById("chat");
const form = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("msg", sender);
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Initial greeting
appendMessage("bot", "Hello, I am ECHO – Experimental Cognitive Handler Online. How can I assist you today?");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = userInput.value.trim();
  if (!text) return;

  appendMessage("user", text);
  userInput.value = "";

  appendMessage("bot", "Thinking...");

  try {
    const res = await fetch("/api/echo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text })
    });

    const data = await res.json();
    chatBox.lastChild.textContent = data.reply || "⚠️ No response.";
  } catch (err) {
    chatBox.lastChild.textContent = "⚠️ Error: " + err.message;
  }
});
