import readline from "readline"

export default class Chat {
    constructor(user, Ai) {
        this.user = user
        this.Ai = Ai
        this.queque = Promise.resolve()
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    }
    startChat() {
        console.log(`Chat dimulai antara ${this.user.nama} dan ${this.Ai.Ai_name}`)
    }
    sapa() {
       this.startChat()
         this.user.greeting()
            this.Ai.introduce(this.user)   
    }
    async receiveFromUser(user, text) {
        this.queque = this.queque.then(async () => {
           console.log(`${this.Ai.Ai_name} sedang berpikir...`)
           const response = await this.Ai.generateResponse(user, text)
           this.sendToUser(response)
        })
        
        return this.queque
    }

    starInterActionChat() {
        console.log(`${this.Ai.Ai_name} di sini~`)
        const askInput = () => {
            this.rl.question(`${this.user.nama}: `, async (text) => {
                if(text.toLowerCase() === "exit") {
                    console.log(`Sampai nanti ${this.user.nama}~`)
                    this.rl.close()
                    return
                }

                await this.user.sendMessage(this, text)
                askInput()
            })
        } 
        askInput()
    }

    sendToUser(message) {
        console.log(`${this.Ai.Ai_name}: ${message}`)
    }
    
}