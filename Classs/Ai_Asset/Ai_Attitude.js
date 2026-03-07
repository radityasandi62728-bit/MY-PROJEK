export default class Ai_Attitude {
    constructor() {
        this.angry = ["ugh apa lagi?", "boring banget sih, udah gitu aja masih nanya-nanya lagi"]
        this.happy = ["hehe~"]
        this.annoyed = ["ya ampun, kamu nanya terus sih?", "bosen tau, nanya terus"]
        this.neutral = ["oh ya?", "oke deh", "baiklah"]
        this.excited = ["wah kamu jago matematika ya?", "keren banget, kamu suka matematika ya?"]
    }
    static getAttitude(score) {
        if (score <= -10) return "angry";
        if (score <= -20) return "annoyed";
        if (score < 10) return "neutral";
        if (score < 50) return "happy";
        return "excited";
    }
    getrandomAttitude(attitude) {
        const List = this[attitude]
        if (!Array.isArray(List)) return ""
        const random = List[Math.floor(Math.random() * List.length)]
        return random
    }
}