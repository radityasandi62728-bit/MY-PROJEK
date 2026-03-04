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
    const chatLog = document.querySelector(".chat-log");
    const message = document.createElement("div");
    message.classList.add("message", sender);
    message.textContent = text;
    chatLog.appendChild(message);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  removeLastMessage() {
    const chatLog = document.querySelector(".chat-log");
    chatLog.removeChild(chatLog.lastChild);
  }
}