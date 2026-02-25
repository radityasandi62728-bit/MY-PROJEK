import User from "./Classs/User.js"
import Ai from "./Classs/Ai.js"
import Chat from "./Classs/Chat.js"
import Calculator from "./Classs/Calculator.js"


let user = new User("Raditya")
let calc = new Calculator()
let ai = new Ai("Celia", calc)
let chat1 = new Chat(user, ai)

chat1.starInterActionChat()