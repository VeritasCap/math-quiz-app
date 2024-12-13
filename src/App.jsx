import React, { useState } from 'react'
import Quiz from './components/Quiz'
import Results from './components/Results'
import StartScreen from './components/StartScreen'
import { translations } from './translations'

function App() {
  const [gameState, setGameState] = useState('start')
  const [score, setScore] = useState(0)
  const [timeUsed, setTimeUsed] = useState(0)
  const [questionsAttempted, setQuestionsAttempted] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState([])
  const [language, setLanguage] = useState('en')

  const t = translations[language]

  const startQuiz = () => {
    setGameState('playing')
    setScore(0)
    setQuestionsAttempted(0)
    setTimeUsed(0)
    setWrongAnswers([])
  }

  const startOver = () => {
    setGameState('start')
    setScore(0)
    setQuestionsAttempted(0)
    setTimeUsed(0)
    setWrongAnswers([])
  }

  const endQuiz = (finalScore, finalTime, attempted, wrongAns) => {
    setScore(finalScore)
    setTimeUsed(finalTime)
    setQuestionsAttempted(attempted)
    setWrongAnswers(wrongAns)
    setGameState('finished')
  }

  return (
    <div className="quiz-container">
      {gameState === 'start' && (
        <StartScreen 
          onStart={startQuiz} 
          language={language}
          setLanguage={setLanguage}
          t={t}
        />
      )}
      {gameState === 'playing' && (
        <Quiz 
          onQuizEnd={endQuiz}
          onStartOver={startOver}
          totalQuestions={20}
          timeLimit={60}
          t={t}
        />
      )}
      {gameState === 'finished' && (
        <Results 
          score={score}
          questionsAttempted={questionsAttempted}
          timeUsed={timeUsed}
          wrongAnswers={wrongAnswers}
          onRestart={startQuiz}
          t={t}
        />
      )}
    </div>
  )
}

export default App
