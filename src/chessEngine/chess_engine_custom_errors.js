export class BoardError extends Error {
  constructor(msg) {
    super()
    this.message = msg
    this.name = 'Board Error'
  }
}
