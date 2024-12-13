import React from 'react'

function StartScreen({ onStart, language, setLanguage, t }) {
  return (
    <div className="start-screen">
      <div className="language-selector">
        <button 
          onClick={() => setLanguage('en')}
          className={`lang-button ${language === 'en' ? 'active' : ''}`}
        >
          EN
        </button>
        <button 
          onClick={() => setLanguage('zh')}
          className={`lang-button ${language === 'zh' ? 'active' : ''}`}
        >
          中文
        </button>
      </div>
      <h1>{t.title}</h1>
      <div className="instructions">
        <p>{t.instructions.intro}</p>
        <p>{t.instructions.time}</p>
        <p>{t.instructions.options}</p>
        <p className="number-range">{t.instructions.range}</p>
      </div>
      <button onClick={onStart} className="start-button">
        {t.buttons.start}
      </button>
    </div>
  )
}

export default StartScreen
