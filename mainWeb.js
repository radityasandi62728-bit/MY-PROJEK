import User from "./Classs/User.js";
import Ai from "./Classs/Ai.js";
import Calculator from "./Classs/Calculator.js";
import ChatWeb from "./Classs/chatWeb.js";

const user = new User("Raditya");
const calc = new Calculator();
const ai = new Ai("Celia", calc);
const chat = new ChatWeb(user, ai);

const form = document.querySelector(".input-form");
const input = document.querySelector(".input-form input");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  await chat.receive(text);
});