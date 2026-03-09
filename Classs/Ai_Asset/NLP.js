export default class NLP {
    preprocess(text) {
        return text.toLowerCase().trim()
    }
    tokenize(text) {
        return text.split(/\s+/)
    }
    detectIntent(tokens) {
        const greetings = ["halo", "hi", "hai", "hey"]
        const questionWords = ["apa", "bagaimana", "kenapa", "siapa", "dimana", "kapan"]

        if(/\d+[\+\-\*\/]\d+/.test(tokens)){
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
        console.log(`NLP menganalisis: ${text}`)
        const clean = this.preprocess(text)
        const tokens = this.tokenize(clean)

    return {
        clean,
        tokens,
        intent: this.detectIntent(tokens),
        topic: this.detectTopic(clean),
        sentiment: this.detectSentiment(tokens)
    }

    }

}
