import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, Check, X } from 'lucide-react'
import { useUserStore } from '@/stores/userStore'

export function QuizPage() {
  const navigate = useNavigate()
  const { currentStory } = useUserStore()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  if (!currentStory) {
    navigate('/stories')
    return null
  }

  const questions = currentStory.quiz.questions
  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  const handleSelectAnswer = (index: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)
    
    if (index === currentQuestion.correctAnswerIndex) {
      setScore(score + 1)
    }

    // Auto-advance after delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
      }
    }, 1500)
  }

  const handleContinue = () => {
    navigate('/actions')
  }

  const handleRetry = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore(0)
  }

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100)
    const isPassing = percentage >= 70

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white px-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-8 ${
            isPassing ? 'bg-green-100' : 'bg-orange-100'
          }`}>
            <span className="text-5xl font-bold">{percentage}%</span>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">
            {isPassing ? 'Great Job! 🎉' : 'Keep Learning! 📚'}
          </h1>
          
          <p className="text-gray-500 mb-8">
            You got {score} out of {questions.length} questions correct
          </p>

          <div className="space-y-4">
            <button
              onClick={handleContinue}
              className="w-full py-4 px-6 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              Continue
            </button>
            
            {!isPassing && (
              <button
                onClick={handleRetry}
                className="w-full py-4 px-6 border-2 border-black rounded-full hover:bg-gray-50 transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <button
          onClick={() => navigate('/chunks')}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        {/* Progress Bar */}
        <div className="flex-1 mx-4 h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-black"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <span className="text-sm text-gray-500">
          {currentQuestionIndex + 1}/{questions.length}
        </span>
      </div>

      {/* Question */}
      <div className="flex-1 flex flex-col px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1"
          >
            <h2 className="text-2xl font-bold mb-8">
              {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrect = index === currentQuestion.correctAnswerIndex
                const showFeedback = selectedAnswer !== null

                let buttonStyle = 'border-2 border-gray-200'
                if (showFeedback && isCorrect) {
                  buttonStyle = 'border-2 border-green-500 bg-green-50'
                } else if (showFeedback && isSelected && !isCorrect) {
                  buttonStyle = 'border-2 border-red-500 bg-red-50'
                } else if (isSelected) {
                  buttonStyle = 'border-2 border-black'
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full py-4 px-6 rounded-2xl text-left transition-all flex items-center justify-between ${buttonStyle}`}
                  >
                    <span>{option}</span>
                    {showFeedback && isCorrect && (
                      <Check className="w-5 h-5 text-green-500" />
                    )}
                    {showFeedback && isSelected && !isCorrect && (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            {selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-gray-50 rounded-2xl"
              >
                <p className="text-sm text-gray-600">
                  {currentQuestion.explanation}
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
