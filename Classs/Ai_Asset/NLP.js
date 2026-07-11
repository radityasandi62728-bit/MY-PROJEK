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
            romance : ["cinta", "pacar", "sayang", "suka"],
        }
        
       const scores = {}
       for (const topic in topics) {
            scores[topic] = topics[topic].filter(w => tokens.includes(w)).length
       }
       const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]
        return best[1] > 0 ? best[0] : null
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

        const intent = this.detectIntent(tokens, text)

        if (intent !== "math") {
            this.learnWord(tokens)
        }
        return {
            clean,
            tokens,
            intent,
            topic: this.detectTopic(tokens),
            sentiment: this.detectSentiment(tokens),
            entity: this.extraEntity(tokens)
        }

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
async learnWord(tokens) {
    if (tokens.length < 3) return

    const s = tokens[0]
    const p = tokens[1]
    const o = tokens.slice(2, 5).join(" ")

    const isValid = (w) => /^[a-zA-Z]+$/.test(w)

    if (!this.wordBank.subjek.includes(s) && isValid(s)) this.wordBank.subjek.push(s)
    if (!this.wordBank.object.includes(o) && isValid(o)) this.wordBank.object.push(o)
    if (!this.wordBank.predikat.includes(p) && isValid(p)) this.wordBank.predikat.push(p)

    console.log("Mau kirim wordBank:", this.wordBank)

    try {
        const res = await fetch('http://localhost:3000/api/wordbank', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.wordBank)
        })
        const data = await res.json()
        console.log("Response dari backend:", data) 
    } catch (err) {
        console.log("Error fetch:", err) 
    }
}
async loadWordBank() {
    try {
        const res = await fetch('http://localhost:3000/api/wordBank')
        const data = await res.json()
        this.wordBank = data

        console.log("Mau kirim wordBank:", this.wordBank)
    } catch (err) {
        console.error('Error loading word bank:', err)
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
