import { createRngWithSeed } from '../../utils/random'

const params = new URLSearchParams(location.search)

const testVersion = localStorage.getItem('mathTest.index') || '0'

const random = createRngWithSeed(testVersion)

// -----------------------------------------------------------------------------
// Configuration
// -----------------------------------------------------------------------------

const questionCount = 20

// -------------------------------------------------------------------------------
// Enums for stuff
// -------------------------------------------------------------------------------

enum MathType {
  Addition = 0,
  Subtraction = 1,
  Multiplication = 2,
  Division = 3,
}

// -----------------------------------------------------------------------------
// App Loop
// -----------------------------------------------------------------------------

const questions: { question: string; answer: number }[] = []

document.getElementById('start-test')?.addEventListener('click', () => {
  for (let questionIndex = 0; questionIndex < questionCount; questionIndex++) {
    let first: number, second: number, answer: number

    switch (random.int(0, 3)) {
      case MathType.Addition:
        const firstStart = random.int(1, 20)
        const firstZeros = random.int(0, 4)
        first = Number(`${firstStart}${'0'.repeat(firstZeros)}`)

        const secondStart = random.int(1, 20)
        const secondZeros = random.int(0, 4)
        second = Number(`${secondStart}${'0'.repeat(secondZeros)}`)

        answer = first + second

        questions.push({ question: `${first} + ${second}`, answer })

        break

      case MathType.Subtraction:
        do {
          const firstStart = random.int(1, 20)
          const firstZeros = random.int(0, 4)
          first = Number(`${firstStart}${'0'.repeat(firstZeros)}`)

          const secondStart = random.int(1, 20)
          const secondZeros = random.int(0, 4)
          second = Number(`${secondStart}${'0'.repeat(secondZeros)}`)
        } while (first < second)

        answer = first - second

        questions.push({ question: `${first} - ${second}`, answer })

        break

      case MathType.Multiplication:
        {
          const firstStart = random.int(1, 9)
          const firstZeros = random.int(0, 4)
          first = Number(`${firstStart}${'0'.repeat(firstZeros)}`)

          const secondStart = random.int(1, 9)
          const secondZeros = random.int(0, 4)
          second = Number(`${secondStart}${'0'.repeat(secondZeros)}`)
        }

        answer = first * second
        questions.push({ question: `${first} × ${second}`, answer })

        break

      case MathType.Division:
        first = 23
        second = 4

        while (
          (first || 23) % (second || 4) !== 0 ||
          (first || 23) < (second || 4)
        ) {
          console.log(first, second)

          const firstStart = random.int(1, 30)
          const firstZeros = random.int(0, 4)
          first = Number(`${firstStart}${'0'.repeat(firstZeros)}`)

          const secondStart = random.int(1, 9)
          const secondZeros = random.int(0, 4)
          second = Number(`${secondStart}${'0'.repeat(secondZeros)}`)
        }

        console.log(
          first,
          second,
          (first || 23) % (second || 4) !== 0 || (first || 23) < (second || 4)
        )

        answer = first / second
        questions.push({
          question: `${Math.round(first)} ÷ ${Math.round(second)}`,
          answer,
        })

        break
    }
  }

  document.getElementById('start')?.remove()
  createQuestion(0)
})

customElements.define(
  'math-question',
  class extends HTMLElement {
    constructor() {
      super()
      let template = document.getElementById(
        'questionTemplate'
      ) as HTMLTemplateElement
      let templateContent = template.content

      const shadowRoot = this.attachShadow({ mode: 'open' })
      shadowRoot.appendChild(templateContent.cloneNode(true))

      const submit = shadowRoot.getElementById('submitAnswer')
      const inputEl = shadowRoot.getElementById('answer') as HTMLInputElement
      if (!submit) {
        console.error('Submit fails to exist')
        return
      }

      inputEl.focus()

      let submitFn = () => {
        const questionIndex = Number(this.dataset.index)

        const userAnswer = shadowRoot.getElementById(
          'answer'
        ) as HTMLInputElement
        const correctAnswerEl = shadowRoot.getElementById('correctAnswer')

        if (!userAnswer || !correctAnswerEl) {
          console.error('Failed to find user answer or correct answer')
          return
        }

        const userAnswerValue = Number(userAnswer.value)

        if (userAnswerValue === questions[questionIndex].answer) {
          if (questionIndex < questions.length - 1) {
            createQuestion(questionIndex + 1)
          } else {
            localStorage.setItem(
              'mathTest.index',
              String(Number(testVersion) + 1)
            )
            alert('You are done!')
            location.reload()
          }
        } else {
          correctAnswerEl.style.display = 'block'
          submitFn = () => {
            if (questionIndex < questions.length - 1) {
              createQuestion(questionIndex + 1)
            } else {
              localStorage.setItem(
                'mathTest.index',
                String(Number(testVersion) + 1)
              )
              alert('You are done!')
              location.reload()
            }
          }

          submit.onclick = submitFn
          inputEl.onkeydown = (e) => {
            if (e.key === 'Enter') {
              submitFn()
            }
          }
        }
      }

      submit.onclick = submitFn
      inputEl.onkeydown = (e) => {
        if (e.key === 'Enter') {
          submitFn()
        }
      }
    }
  }
)

function createQuestion(index: number) {
  const questionContainer = document.getElementById('question')
  if (!questionContainer) {
    console.error('Missing question container or template')
    return
  }

  const question = questions[index]
  questionContainer.innerHTML = `<math-question data-index="${index}"><span slot="question">${question.question}</span><span slot="answer">${question.answer}</span></math-question>`
}
