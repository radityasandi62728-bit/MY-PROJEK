import Ai_Attitude from "./Ai_Asset/Ai_Attitude.js"
import NLP from "./Ai_Asset/NLP.js"
export default class Ai {
    constructor(Ai_name, calculator) {
        this.Ai_name = Ai_name
        this.calculator = calculator
        this.personality = "centil"
        this.nlp = new NLP()
        this.memory = []
        this.moodScore = 0
        this.topic = null
        this.attitude = new Ai_Attitude()
        this.startmoodRecovery()
    }
    introduce(user) {
        return `Halo ${user.nama}, perkenalkan aku ${this.Ai_name}, senang bertemu denganmu!`
    }
    async generateResponse(user, text) {
        await this.think()
        const mood = this.getMood();
        const analisis = this.nlp.analis(text)

        const intent = analisis.intent
        const topic = analisis.topic
        const sentiment = analisis.sentiment
        const mathExpression = this.calculator.extraMath(text)
        const word = this.nlp.generateWord()
        const entity = analisis.entity

        const privousMathCount = this.memory.filter(m => this.calculator.isMath(m.message)).length
        let response = ""
       if (mathExpression) {
            const result = this.calculator.calculate(mathExpression)
            response += this.makeCentil(`Hasil dari ${mathExpression} adalah ${result}.`)
            this.moodScore += 1
        } else if (intent === "question") {
            response += this.renderbyMood(`Itu pertanyaan yang menarik! Tapi maaf, aku belum bisa menjawabnya dengan baik.`)
        } else if (intent === "greeting") {
            response += this.renderbyMood(`Halo! Senang bertemu denganmu!`)
        } else {
            response += this.responToUser(text, sentiment)
        }

        if (privousMathCount >= 2 && this.calculator.isMath(text)) {
            const komentar = await this.speak()
            response += `\n${this.Ai_name}: ${komentar}`
        }

        this.memory.push({
            user: user.nama, 
            message:text,
            mood: this.getMood(),
            time: Date.now(),
            type: this.calculator.isMath(text) ? "math" : "chat"
        })

        if (this.memory.length % 5 === 0) {
            return response + ` Ngomong-ngomong kamu lagi belajar apa?`
        }
        if (this.calculator.isMath(text) && text.length > 5) {
            response += "Bisa bahas yang lain tidak?"
        }


        if (topic) {
            this.topic = topic
            this.currentTopic = topic
            response += `Ngomong-ngomong, kamu suka ${topic} ya?`
        }

        if(this.currentTopic === topic){
            const topicResponses = {
                    game: {
                    fps: "FPS itu game tembak-tembakan kan?",
                    rpg: "RPG biasanya punya cerita panjang ya"
                    },

                    study: {
                    matematika: "Matematika memang menantang ya",
                    tugas: "Tugas sekolah kadang bikin pusing"
                    }
                }
            if(this.currentTopic){
                const topicMap = topicResponses[this.currentTopic]
                return topicMap[text.toLowerCase()] || `Kamu suka ${this.currentTopic} ya?`
            }
        }

        if (word) {
            response 
        }
    
        console.log("Mood sekarang:", this.getMood(), "| Score:", this.moodScore)
        return response += " "
      
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
    

    responToUser(text, sentiment) {
        const lower = text.toLowerCase()

        const repeatCount = this.memory.filter(m => m.message.toLowerCase().includes(lower)).length
        if (repeatCount > 1) { 
            this.moodScore -= 1
            return `Kamu sudah bilang itu beberapa kali, berhenti ulang-ulang! push up 20x sana!`
        }

        const respon = {
            "hai": "Hai juga!",
            "halo": "Halo",
            "celia": `Ya?, ada apa?`,
            "apa kabar": "Aku baik-baik saja, terima kasih sudah bertanya!",
        }

        for (const key in respon) {
            if (lower.includes(key)) {
                const keyCount = this.memory.filter(m => m.message.toLowerCase().includes(key)).length
                if (keyCount > 1) {
                    this.moodScore -= 2
                    return `hm, berhenti godain aku! push up 20x sana!`
                }
                this.moodScore += 2
                const mood = this.getMood()
                if (mood === "angry") {
                    return this.attitude.getrandomAttitude("angry")
                }
                if (mood === "annoyed") {
                    return this.attitude.getrandomAttitude("annoyed")
                }
                if (sentiment === "positive") {
                    this.moodScore += 2
                }
                if (sentiment === "negative") {
                    this.moodScore -= 2
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
        if (mood === "angry") {
            return `Aku sedang marah, jadi aku tidak bisa menjawab dengan baik.`
        }
        if (mood === "annoyed") {
            return `Aku sedang kesal, jadi aku tidak bisa menjawab dengan baik.`
        }
        return text  
    } 

    getMood() {
        return Ai_Attitude.getAttitude(this.moodScore)
    }

    getMoodPresentase() {
        const clamped = Math.max(-100, Math.min(100, this.moodScore));
        return (clamped + 100) / 200;
    }
    detectTopic(text) {
        const lower = text.toLowerCase()
        if (lower.includes("matematika")) { return "math" }
        if (lower.includes("belajar")) { return "study" }
        if (lower.includes("game")) { return "game" }
        return null
    }
}