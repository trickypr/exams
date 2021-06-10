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
  And = 0,
  Or = 1,
  Not = 2,
  XOR = 3,
  NAND = 4,
  NOR = 5,
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
  // Final text that will be output
  let question = 'Evaluate '
  let answer = '<ui-color-secondary>'

  const A = random.bool()
  const B = random.bool()

  // Choose a number type to use
  switch (random.int(0, 5)) {
    case NumberTypes.And:
      question += `A ∧ B `
      answer += `${A} ∧ ${B} = ${A && B}`

      break

    case NumberTypes.Or:
      break

    case NumberTypes.Not:
      break

    case NumberTypes.XOR:
      break

    case NumberTypes.NOR:
      break

    case NumberTypes.NAND:
      break
  }

  question += `when A is ${A} and B is ${B}.`
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
