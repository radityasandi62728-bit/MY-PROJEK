export default class Ai {
    constructor(Ai_name, calculator) {
        this.Ai_name = Ai_name
        this.calculator = calculator
        this.personality = "centil"
        this.memory = []
        this.moodScore = 0
        this.startmoodRecovery()
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
            this.moodScore += 1
        } else {
            response += this.responToUser(text)
        }

        if (privousMathCount >= 2) {
            const komentar = await this.speak()
            response += `\n${this.Ai_name}: ${komentar}`
        }

        this.memory.push({user: user.nama, message:text})
        console.log("Mood sekarang:", this.getMood(), "| Score:", this.moodScore)
        return response
      
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
        const lower = text.toLowerCase()

        const repeatCount = this.memory.filter(m => m.message.toLowerCase().includes(lower)).length
        if (repeatCount > 1) { 
            this.moodScore -= 1
            return `Kamu sudah bilang itu beberapa kali, berhenti ulang-ulang! push up 20x sana!`
        }

        const respon = {
            "hai": "Hai juga!",
            "halo": "Halo, apa kabar?",
            "celia": `Ya?, ada apa?`,
            "apa kabar": "Aku baik-baik saja, terima kasih sudah bertanya!",
        }

        for (const key in respon) {
            if (lower.includes(key)) {
                const keyCount = this.memory.filter(m => m.message.toLowerCase().includes(key)).length
                if (keyCount > 1) {
                    this.moodScore -= 1
                    return `hm, berhenti godain aku! push up 20x sana!`
                }
                this.moodScore += 2
                const mood = this.getMood()
                if (mood === "marah") {
                    return `Yah, aku lagi marah nih, jangan ganggu aku!`
                }
                if (mood === "kesal") {
                    return 'Iya, iya denger kok'
                }
                return this.renderbyMood(respon[key])
            }
        }

        return "Maaf, aku belum mengerti itu."
    }
    startmoodRecovery() {
        setInterval(() => {
            if (this.moodScore > 0) {
                this.moodScore -= 1
            }
            if (this.moodScore < 0) {
                this.moodScore += 1
            }
        }, 50000)
    }
    renderbyMood(text) {
        const mood = this.getMood()
        if (mood === "marah") {
            return `Aku sedang marah, jadi aku tidak bisa menjawab dengan baik.`
        }
        if (mood === "kesal") {
            return `Aku sedang kesal, jadi aku tidak bisa menjawab dengan baik.`
        }
        return text
    } 

    getMood() {
        if (this.moodScore <= -10) {
            return "marah"
        } 
        if (this.moodScore <= -2) { 
            return "kesal"
        }  
        
        return "normal" 
    }
}