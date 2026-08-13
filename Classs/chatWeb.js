// Classs/chatWeb.js
export default class ChatWeb {
  constructor(user, ai) {
    this.user = user;
    this.ai = ai;
    this.queue = Promise.resolve();
  }

  async receive(text) {
    this.queue = this.queue.then(async () => {
      this.addMessage(text, "user");

      this.addMessage(`${this.ai.Ai_name} sedang berpikir...`, "ai");

      const response = await this.ai.generateResponse(this.user, text);

      this.removeLastMessage(); 
      this.addMessage(response, "ai");
    });

    return this.queue;
  }

 addMessage(text, sender) {
    const messages = document.querySelector(".messages");
    const message = document.createElement("div");
    message.classList.add("message", sender);
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
}

removeLastMessage() {
    const messages = document.querySelector(".messages");
    messages.removeChild(messages.lastChild);
}
}