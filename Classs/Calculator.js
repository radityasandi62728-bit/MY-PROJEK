export default class Calculator {
    isMath(text) {
        return /^[0-9\-*/().\s+]+$/.test(text)
    }
    calculate(expression) {
        try {
            return eval(expression)
        } catch (error) {
            return null
        }
    }
    extraMath(text) {
        const match = text.match(/(\d+\s*[\+\-\*\/]\s*\d+)/)
        return match ? match[0].replace(/\s+/g,"") : null
    }
}