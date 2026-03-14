export default class NLP {
    constructor() {
        this.wordBank = {
            subjek : [],
            predikat : [],
            object : []
        }
    }
    preprocess(text) {
        return text.toLowerCase().replace(/[^\w\s]/g, "").trim()
    }
    tokenize(text) {
        return text.match(/\d+|\w+|[+\-*/]/g) || []
    }
    detectIntent(tokens, text) {
        const greetings = ["halo", "hi", "hai", "hey"]
        const questionWords = ["apa", "bagaimana", "kenapa", "siapa", "dimana", "kapan"]

        if(/\d+[\+\-\*\/]\d+/.test(text)) {
            return "math"
        }

        for (const g of greetings) {
            if (tokens.includes(g)) {
                return "greeting"
            }
        }
        for (const q of questionWords) {
            if (tokens.includes(q)) {
                return "question"
            }
        }
        if (text.includes("Tolong") || text.includes("Bantu")) {
            return "request"
        }
        if (tokens.length === 1) {
            const greetings = ["halo", "hi", "hai", "hey"]
            if (greetings.includes(tokens[0])) {
                return "greeting"
            }
        }
        return "chat"
    }

    detectTopic(tokens) {
        const topics = {
            math : ["hitung", "matematika", "aljabar"],
            game : ["game", "main", "gaming"],
            study : ["belajar", "pelajaran", "tugas"],
            romance : ["cinta", "pacar", "sayang"],
        }
        
        for (const topic in topics) {
            for (const word of topics[topic]) {
                if (tokens.includes(word)) {
                    return topic
                }
            }
        }
        return null
    }
    detectSentiment(tokens) {
        const positiveWords = ["baik", "bagus", "hebat", "keren", "suka"]
        const negativeWords = ["buruk", "jelek", "bodoh", "benci", "tidak suka"]

    for (const word of tokens) {
        if (positiveWords.includes(word)) {
            return "positive"
        }
        if (negativeWords.includes(word)) {
            return "negative"
        }
    }
    return "neutral"
    } 

    analis(text) {
    
        const clean = this.preprocess(text)
        const tokens = this.tokenize(clean)

        this.learnWord(tokens)

    return {
        clean,
        tokens,
        intent: this.detectIntent(tokens, text, clean),
        topic: this.detectTopic(tokens),
        sentiment: this.detectSentiment(tokens),
        entity: this.extraEntity(tokens) 
    }

    }

    random(arr) {
        if (arr.length === 0) {
            return null
        }
        return arr[Math.floor(Math.random()*arr.length)]
    }

    generateWord() {
        const o = this.random(this.wordBank.object)
        const s = this.random(this.wordBank.subjek)
        const p = this.random(this.wordBank.predikat)

        if(!s || !p || !o) { 
            return ""
        }
        return `${s} ${p} ${o}`
    }
    learnWord(tokens) {
        
        if (tokens.length < 3) return

        const s = tokens[0]
        const p = tokens[1]
        const o = tokens.slice(2).join(" ")

        if (!this.wordBank.subjek.includes(s)) {
            this.wordBank.subjek.push(s)
        }
        if (!this.wordBank.object.includes(o)) {
            this.wordBank.object.push(o)
        }
        if (!this.wordBank.predikat.includes(p)) {
            this.wordBank.predikat.push(p)
        }

    }
    extraEntity(tokens) {
        const wordsQuestion = ["apa", "dimana", "siapa", "bagaimana", "mengapa", "kapan", "kenapa"]

        if (wordsQuestion.includes(tokens[0])) {
            return tokens.slice(1).join(" ")
        }
        return null
    }
}
