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
}