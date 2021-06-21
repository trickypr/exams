import { createRngWithSeed } from '../utils/random'
import { TruthTable } from './tables'

const params = new URLSearchParams(location.search)

const testVersion = params.get('v') || '0'
const showAnswer = params.get('a') == 'true'

const random = createRngWithSeed(testVersion + 'skjekgjdfgn,mbnoiretyjishfjdlajerpowkrglsd')

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

// -------------------------------------------------------------------------------
// Short answer
// -------------------------------------------------------------------------------
const sael = document.getElementById('questions') as HTMLElement

new Array(saCount).fill(true).forEach(() => {
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
      question += `A ⋁ B `
      answer += `${A} ⋁ ${B} = ${A || B}`
      break

    case NumberTypes.Not:
      question += `ㄱA `
      answer += `ㄱ${A} = ${!A}`
      break

    case NumberTypes.XOR:
      question += `A ⊕ B `
      answer += `${A} ⊕ ${B} = ${A ? !B : B}`
      break

    case NumberTypes.NOR:
      question += `ㄱ(A ⋁ B) `
      answer += `ㄱ(${A} ⋁ ${B}) = ${!(A || B)}`
      break

    case NumberTypes.NAND:
      question += `ㄱ(A ∧ B) `
      answer += `ㄱ(${A} ∧ ${B}) = ${!(A && B)}`
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

// Now generate a two long answer questions
;[0, 1].forEach(() => {
  // Final text that will be output
  let question = 'Construct a truth table for '
  let answer = '<ui-color-secondary>'

  const truthTable = new TruthTable(2)

  // Choose a number type to use
  switch (random.int(0, 5)) {
    case NumberTypes.And:
      question += `A ∧ B `
      answer += truthTable.evaluate('A ∧ B', (a, b) => a && b)

      break

    case NumberTypes.Or:
      question += `A ⋁ B `
      answer += truthTable.evaluate('A ⋁ B', (a, b) => a || b)
      break

    case NumberTypes.Not:
      question += `ㄱA`
      answer += truthTable.evaluate('ㄱA', (a, b) => !a)
      break

    case NumberTypes.XOR:
      question += `A ⊕ B `
      answer += truthTable.evaluate('A ⊕ B', (a, b) => a ? !b : b)
      break

    case NumberTypes.NOR:
      question += `ㄱ(A ⋁ B) `
      answer += truthTable.evaluate('ㄱ(A ⋁ B)', (a, b) => !(a || b))
      break

    case NumberTypes.NAND:
      question += `ㄱ(A ∧ B) `
      answer += truthTable.evaluate('ㄱ(A ∧ B)', (a, b) => !(a && b))
      break
  }

  question += `.`
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
