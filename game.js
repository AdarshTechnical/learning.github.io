const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'The process of loosening of the soil is called',
        choice1: '(a) tilling',
        choice2: '(b) harvesting',
        choice3: '(c) spraying',
        choice4: '(d) weeding',
        answer: 1,
    },
    {
        question:
            "Which is pesticides?",
        choice1: "(a) 2, 4-dichlorophenoxyacetic acid",
        choice2: "(b) Malathion",
        choice3: "(c) Metolachlor",
        choice4: "(d) Chloroform",
        answer: 2,
    },
    {
        question: "Seed drill is used for",
        choice1: "(a) harvesting",
        choice2: "(b) cleaning the seed",
        choice3: "(c) sowing",
        choice4: "(d) weeding",
        answer: 3,
    },
    {
        question: "Rabi crop is harvested in",
        choice1: "(a) January",
        choice2: "(b) March",
        choice3: "(c) October",
        choice4: "(d) September",
        answer: 2,
    },
    {
        question: "Maize grow well during",
        choice1: "(a) June",
        choice2: "(b) January",
        choice3: "(c) April",
        choice4: "(d) September",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()