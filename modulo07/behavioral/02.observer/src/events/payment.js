export default class Payment {
  constructor(paymentSubject) {
    this.paymentSubject = paymentSubject
  }

  creditCard(paymentData) {
    console.log(`\na payment occurred from ${paymentData.userName}`)
    this.paymentSubject.notify(paymentData)
  }
}