import React, { useState, useEffect, useRef } from 'react'

function Quiz({ onQuizEnd, totalQuestions, timeLimit, onStartOver, t }) {
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion())
  const [score, setScore] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(1)
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const [options, setOptions] = useState([])
  const [questionsAttempted, setQuestionsAttempted] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState([])

  const scoreRef = useRef(score)
  const questionsAttemptedRef = useRef(questionsAttempted)
  const wrongAnswersRef = useRef(wrongAnswers)

  useEffect(() => {
    scoreRef.current = score
    questionsAttemptedRef.current = questionsAttempted
    wrongAnswersRef.current = wrongAnswers
  }, [score, questionsAttempted, wrongAnswers])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          onQuizEnd(
            scoreRef.current, 
            timeLimit - prev, 
            questionsAttemptedRef.current, 
            wrongAnswersRef.current
          )
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    setOptions(generateOptions(currentQuestion.answer))
  }, [currentQuestion])

  function generateQuestion() {
    const isAddition = Math.random() > 0.5

    if (isAddition) {
      const num1 = Math.floor(Math.random() * 18) + 1
      const num2 = Math.floor(Math.random() * (19 - num1)) + 1
      return {
        num1,
        num2,
        operator: '+',
        answer: num1 + num2
      }
    } else {
      const num1 = Math.floor(Math.random() * 18) + 2
      const num2 = Math.floor(Math.random() * (num1 - 1)) + 1
      return {
        num1,
        num2,
        operator: '-',
        answer: num1 - num2
      }
    }
  }

  function generateOptions(correctAnswer) {
    const options = [correctAnswer]
    while (options.length < 4) {
      const randomAnswer = Math.floor(Math.random() * 18) + 1
      if (!options.includes(randomAnswer)) {
        options.push(randomAnswer)
      }
    }
    return options.sort(() => Math.random() - 0.5)
  }

  function handleAnswer(selectedAnswer) {
    const isCorrect = selectedAnswer === currentQuestion.answer
    setQuestionsAttempted(prev => prev + 1)
    
    if (isCorrect) {
      setScore(prev => prev + 1)
    } else {
      setWrongAnswers(prev => [...prev, {
        question: `${currentQuestion.num1} ${currentQuestion.operator} ${currentQuestion.num2} = ?`,
        correctAnswer: currentQuestion.answer,
        userAnswer: selectedAnswer,
        options: options
      }]);
    }

    if (questionNumber === totalQuestions) {
      onQuizEnd(isCorrect ? score + 1 : score, timeLimit - timeLeft, questionsAttempted + 1, wrongAnswers)
    } else {
      setQuestionNumber(prev => prev + 1)
      setCurrentQuestion(generateQuestion())
    }
  }

  const endQuiz = () => {
    onQuizEnd(score, timeLeft, questionsAttempted, wrongAnswers);
  };

  return (
    <div>
      <div className="quiz-header">
        <div className="question-count">
          {t.quiz.question} {questionNumber}/{totalQuestions}
        </div>
        <div className="timer">
          {t.quiz.timeLeft}: {timeLeft}s
        </div>
      </div>
      <div className="question">
        {currentQuestion.num1} {currentQuestion.operator} {currentQuestion.num2} = ?
      </div>
      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            className="option-button"
            onClick={() => handleAnswer(option)}
          >
            {String.fromCharCode(65 + index)}. {option}
          </button>
        ))}
      </div>
      <div className="quiz-footer">
        <div className="score">
          {t.quiz.score}: {score}/{questionsAttempted}
        </div>
        <button onClick={onStartOver} className="start-over-button">
          {t.buttons.startOver}
        </button>
      </div>
    </div>
  )
}

export default Quiz
