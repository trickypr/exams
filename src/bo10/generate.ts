import { createRngWithSeed } from '../utils/random'

const params = new URLSearchParams(location.search)

const testVersion = params.get('v') || '0'
const showAnswer = params.get('a') == 'true'

const random = createRngWithSeed(testVersion)

// -------------------------------------------------------------------------------
// Configuration
// -------------------------------------------------------------------------------

const saCount = 6

// -------------------------------------------------------------------------------
// Enums for stuff
// -------------------------------------------------------------------------------

enum NumberTypes {
  Bin = 0,
  Oct = 1,
  Hex = 2,
}

enum LongAnswerTypes {
  Addition = 0,
  Subtraction = 1,
}

// -------------------------------------------------------------------------------
// Short answer
// -------------------------------------------------------------------------------
const sael = document.getElementById('questions') as HTMLElement

new Array(saCount).fill(0).forEach(() => {
  // Should it be converting too or from different types
  const beginInDec = random.bool()

  // Final text that will be output
  let question = 'What is '
  let answer = '<ui-color-secondary>'

  const number = random.int(1, 254)

  // Choose a number type to use
  switch (random.int(0, 2)) {
    case NumberTypes.Bin:
      if (beginInDec) {
        question += `${number} in binary?`
        answer += `${number.toString(2)}`
      } else {
        question += `${number.toString(2)} in decimal?`
        answer += number
      }

      break

    case NumberTypes.Oct:
      if (beginInDec) {
        question += `${number} in octal?`
        answer += `${number.toString(8)}`
      } else {
        question += `${number.toString(8)} (octal) in decimal?`
        answer += number
      }

      break

    case NumberTypes.Hex:
      if (beginInDec) {
        question += `${number} in hexadecimal?`
        answer += `${number.toString(16)}`
      } else {
        question += `${number.toString(16)} (hexadecimal) in decimal?`
        answer += number
      }

      break
  }

  answer += '</ui-color-secondary>'

  const qP = document.createElement('p')
  qP.innerText = question

  sael.appendChild(qP)

  if (showAnswer) {
    sael.innerHTML += answer
  } else {
    sael.innerHTML += '<ui-spacer height="64px"></ui-spacer>'
  }
})

// Now generate a single long answer question

const number1 = random.int(1, 128)
const number2 = random.int(1, 128)

let question = 'Add or subtract '
let answer = '<ui-color-secondary>'

switch (random.int(0, 1)) {
  case LongAnswerTypes.Addition:
    question += `0${number1.toString(2).padStart(7, '0')} and 0${number2
      .toString(2)
      .padStart(7, '0')}`

    answer += `${number1.toString(2).padStart(7, '0')} + ${number2
      .toString(2)
      .padStart(7, '0')} = `
    answer += (number1 + number2).toString(2).padStart(8, '0')
    break

  case LongAnswerTypes.Subtraction:
    question += `0${number1.toString(2).padStart(7, '0')} and 1${number2
      .toString(2)
      .padStart(7, '0')}`

    answer += `${number1} - ${number2} = `
    answer += (number1 - number2).toString(2).padStart(8, '0')
    break
}

answer += '</ui-color-secondary>'

const qP = document.createElement('p')
qP.innerText = question

sael.appendChild(qP)

if (showAnswer) {
  sael.innerHTML += answer
} else {
  sael.innerHTML += '<ui-spacer height="64px"></ui-spacer>'
}
