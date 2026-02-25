export default class Ai {
    constructor(Ai_name, calculator) {
        this.Ai_name = Ai_name
        this.calculator = calculator
        this.personality = "centil"
        this.memory = []
    }
    introduce(user) {
        return `Halo ${user.nama}, perkenalkan aku ${this.Ai_name}, senang bertemu denganmu!`
    }
    async generateResponse(user, text) {
        await this.think()

        const privousMathCount = this.memory.filter(m => this.calculator.isMath(m.message)).length
        let response = ""
        if (this.calculator.isMath(text)) {
            const result = this.calculator.calculate(text)
            response += this.makeCentil(`Hasil dari ${text} adalah ${result}.`)
        } else {
            response += this.responToUser(text)
        }

        if (privousMathCount >= 2) {
            const komentar = await this.speak()
            response += `\n${this.Ai_name}: ${komentar}`
        }

        this.memory.push({user: user.nama, message:text})
        if (response !== " ") {
            return response
        }
        return this.introduce(user)
    }

    async speak() {
       const kata_speak = [" uhh matematika lagi? bosan tau"," kamu suka matematika ya?"]
       const random = kata_speak[Math.floor(Math.random() * kata_speak.length)]

       await new Promise(resolve => setTimeout(resolve, 2500))
       return random
    }

    think() {
        return new Promise(resolve => {
            setTimeout(resolve, 2000)
        })
    }

    makeCentil(text) {
        const kata = [" hehe~", " mudah loh~", " masa gitu aja ga bisa sih~", " lihat, aku pintar kan~"]
        const random = kata[Math.floor(Math.random() * kata.length)]
        return text + random
    }

    responToUser(text) {

        const respon = {
            "hai": "Hai juga!",
            "halo": "Halo, apa kabar?", }
        for (const key in respon) {
            if (text.toLowerCase().includes(key)) {
                if (this.memory.filter(m => m.message.toLowerCase().includes(key)).length > 2) {
                    return `hm, berhenti godain aku! push up 20x sana!`
                }
                return respon[key]
            }
        }
        return "Maaf, aku belum mengerti itu."
    }
}