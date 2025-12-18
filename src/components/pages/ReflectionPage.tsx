import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { ReflectionQuestions, type Story } from '@/types'

interface ReflectionPageProps {
  story: Story | null
}

export function ReflectionPage({ story }: ReflectionPageProps) {
  const navigate = useNavigate()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  if (!story) {
    navigate('/stories')
    return null
  }

  const currentQuestion = ReflectionQuestions[currentQuestionIndex]

  const shuffleQuestion = () => {
    let newIndex
    do {
      newIndex = Math.floor(Math.random() * ReflectionQuestions.length)
    } while (newIndex === currentQuestionIndex && ReflectionQuestions.length > 1)
    setCurrentQuestionIndex(newIndex)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <button
          onClick={() => navigate('/stories')}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-white font-medium">Reflection</h2>
        <div className="w-10"></div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
        <motion.div
          className="max-w-md text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Story Context */}
          <p className="text-purple-300 text-sm uppercase tracking-wider mb-2">
            Reflecting on
          </p>
          <h3 className="text-white text-xl font-semibold mb-12">{story.title}</h3>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="mb-12"
            >
              <p className="text-white text-2xl font-light leading-relaxed">
                "{currentQuestion}"
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Shuffle Button */}
          <motion.button
            onClick={shuffleQuestion}
            className="flex items-center gap-2 mx-auto text-purple-300 hover:text-white transition-colors mb-12"
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw className="w-5 h-5" />
            <span>Different question</span>
          </motion.button>

          {/* Continue Button */}
          <Button
            onClick={() => navigate('/chunks')}
            size="lg"
            className="bg-white text-purple-900 hover:bg-purple-100 px-12"
          >
            Continue to Chunks
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

