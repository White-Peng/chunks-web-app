import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { generateQuizQuestions } from '@/data/content'
import type { Story, QuizQuestion } from '@/types'
import { cn } from '@/lib/utils'

interface QuizPageProps {
  story: Story | null
}

export function QuizPage({ story }: QuizPageProps) {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (story) {
      setQuestions(generateQuizQuestions(story))
    } else {
      navigate('/actions')
    }
  }, [story, navigate])

  if (!story || questions.length === 0) return null

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  const handleSelectAnswer = (index: number) => {
    if (showResult) return
    setSelectedAnswer(index)
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return

    setShowResult(true)
    if (selectedAnswer === currentQuestion.correctAnswerIndex) {
      setScore((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setIsComplete(true)
    }
  }

  if (isComplete) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 flex items-center justify-center px-6">
        <motion.div
          className="text-center max-w-md"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring' }}
        >
          <div className="text-6xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold mb-2">Quiz Complete!</h1>
          <p className="text-gray-600 mb-8">
            You scored {score} out of {questions.length} ({percentage}%)
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => navigate('/actions')}
              className="w-full"
              size="lg"
            >
              Continue
            </Button>
            <Button
              onClick={() => {
                setCurrentIndex(0)
                setSelectedAnswer(null)
                setShowResult(false)
                setScore(0)
                setIsComplete(false)
              }}
              variant="outline"
              className="w-full"
            >
              Try Again
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 bg-white border-b">
        <button
          onClick={() => navigate('/actions')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h2 className="font-medium">Quiz</h2>
          <p className="text-xs text-gray-500">
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="px-6 py-4">
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <div className="px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h1 className="text-xl font-semibold mb-8">
              {currentQuestion.question}
            </h1>

            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index
                const isCorrect = index === currentQuestion.correctAnswerIndex
                const showCorrect = showResult && isCorrect
                const showWrong = showResult && isSelected && !isCorrect

                return (
                  <motion.button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    className={cn(
                      'w-full p-4 rounded-xl text-left transition-all duration-200 border-2',
                      isSelected && !showResult
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 bg-white hover:border-gray-300',
                      showCorrect && 'border-green-500 bg-green-50',
                      showWrong && 'border-red-500 bg-red-50'
                    )}
                    whileTap={{ scale: showResult ? 1 : 0.98 }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'w-6 h-6 rounded-full border-2 flex items-center justify-center',
                          isSelected && !showResult
                            ? 'border-purple-500'
                            : 'border-gray-300',
                          showCorrect && 'border-green-500 bg-green-500',
                          showWrong && 'border-red-500 bg-red-500'
                        )}
                      >
                        {showCorrect && (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                        {showWrong && <XCircle className="w-4 h-4 text-white" />}
                      </div>
                      <span className="flex-1">{option}</span>
                    </div>
                  </motion.button>
                )
              })}
            </div>

            {/* Explanation */}
            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-blue-50 rounded-xl"
              >
                <p className="text-sm text-blue-800">
                  <strong>Explanation:</strong> {currentQuestion.explanation}
                </p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t">
        {!showResult ? (
          <Button
            onClick={handleSubmit}
            className="w-full"
            size="lg"
            disabled={selectedAnswer === null}
          >
            Check Answer
          </Button>
        ) : (
          <Button onClick={handleNext} className="w-full" size="lg">
            {currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
          </Button>
        )}
      </div>
    </div>
  )
}

