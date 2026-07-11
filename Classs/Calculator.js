// Classs/Calculator.js
export default class Calculator {
    isMath(text) {
        return /^[0-9\-*/().\s+]+$/.test(text)
    }
    calculate(expression) {
        try {
            if (!/^[\d\s\+\-\*\/\(\)\.]+$/.test(expression)) {
                return "Ekspresi tidak valid"
            }
            return Function(`"use strict"; return (${expression})`)()
        } catch (error) {
            return "tidak bisa di hitung"
        }
    }
    extraMath(text) {
        const match = text.match(/(\d+\s*[\+\-\*\/]\s*\d+)/)
        return match ? match[0].replace(/\s+/g, "") : null
    }
}