export default class NLP {
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

    return {
        clean,
        tokens,
        intent: this.detectIntent(tokens, text, clean),
        topic: this.detectTopic(tokens),
        sentiment: this.detectSentiment(tokens)
    }

    }

    generateResponse() {



    }
}
