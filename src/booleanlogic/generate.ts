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
      question += `A ⋁ B `
      answer +=  `${A} ⋁ ${B} = ${A || B}`
      break

    case NumberTypes.Not:
      question += `ㄱA and ㄱB `
      answer +=  `ㄱ${A} = ${!A}<br>ㄱ${B} = ${!B}` 
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