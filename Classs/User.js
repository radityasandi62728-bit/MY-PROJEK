export default class User {
    constructor(nama) {
        this.nama = nama
    }
    greeting() {
        console.log("Nama: ", this.nama)
    }
    async sendMessage(chat, text) {
        console.log(`${this.nama}: ${text}`)
        await chat.receiveFromUser(this, text)
    }
}