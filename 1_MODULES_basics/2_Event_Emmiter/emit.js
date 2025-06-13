//Emitter-ը դրանք հատուկ օբյեկտներ են, որոնց օգտագործում է node.js-ը
//Բոլոր օբյեկտները,որոնք գեներացնում են ՛event՛, հանդիսանում են  EventEmitter կլասի ժառանգներ"։
const Emitter = require('events') // ամբողջ ֆունկցիոնալը գտնվում է այս մոդուլում

let emitter = new Emitter()
let eventName = 'greet'

emitter.on(eventName, function () {
  console.log('Hello all!')
})

emitter.on(eventName, function () {
  console.log('Привет!')
})

//emitter.emit()- ֆունկցիան գեներացնում/առաջացնում և կանչում է
// այդ իրադարձության հետ կապված կոդերի ֆունկցիաները
emitter.emit(eventName)

//-------------------արգումենտով------------------------

let emitter2 = new Emitter()
let eventName2 = 'greet'
emitter2.on(eventName2, function (data) {
  console.log(data)
})
//2-արգումենտը == data
emitter2.emit(eventName2, 'Արգումենտի տեքստ/տվյալ/թիվ/օբյեկտ')
