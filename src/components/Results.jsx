import React, { useState } from 'react'

function Results({ score, questionsAttempted, timeUsed, wrongAnswers, onRestart, t }) {
  const [showReview, setShowReview] = useState(false);

  const accuracy = questionsAttempted > 0 
    ? Math.round((score / questionsAttempted) * 100) 
    : 0

  return (
    <div className="results">
      {!showReview ? (
        <>
          <h2>{t.results.complete}</h2>
          <div className="results-details">
            <p>{t.results.questionsCompleted}: {questionsAttempted} {t.results.outOf} 20</p>
            <p>{t.results.correctAnswers}: {score} {t.results.outOf} {questionsAttempted}</p>
            <p>{t.results.timeUsed}: {timeUsed} {t.results.seconds}</p>
            <p>{t.results.accuracy}: {accuracy}%</p>
          </div>
          <div className="results-actions">
            {wrongAnswers.length > 0 && (
              <button 
                onClick={() => setShowReview(true)} 
                className="review-button"
              >
                {t.buttons.review} ({wrongAnswers.length})
              </button>
            )}
            <button onClick={onRestart} className="restart-button">
              {t.buttons.tryAgain}
            </button>
          </div>
        </>
      ) : (
        <div className="review-section">
          <h2>{t.buttons.review}</h2>
          <div className="wrong-answers-list">
            {wrongAnswers.map((item, index) => (
              <div key={index} className="review-item">
                <h3>{t.quiz.question} {index + 1}</h3>
                <p className="review-question">{item.question}</p>
                <p className="review-answer wrong">
                  {t.results.yourAnswer}: {item.userAnswer}
                </p>
                <p className="review-answer correct">
                  {t.results.correctAnswer}: {item.correctAnswer}
                </p>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setShowReview(false)} 
            className="back-button"
          >
            {t.buttons.back}
          </button>
        </div>
      )}
    </div>
  )
}

export default Results
