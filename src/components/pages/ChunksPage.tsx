import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, X } from 'lucide-react'
import { useUserStore } from '@/stores/userStore'

export function ChunksPage() {
  const navigate = useNavigate()
  const { currentStory } = useUserStore()
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!currentStory) {
    navigate('/stories')
    return null
  }

  const chunks = currentStory.chunks
  const currentChunk = chunks[currentIndex]
  const progress = ((currentIndex + 1) / chunks.length) * 100

  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const thirdWidth = rect.width / 3

    if (x < thirdWidth) {
      // Left third - previous
      if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1)
      }
    } else if (x > thirdWidth * 2) {
      // Right third - next
      if (currentIndex < chunks.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        // Finished all chunks
        handleComplete()
      }
    }
  }

  const handleComplete = () => {
    // Mark story as consumed
    const consumedStories = JSON.parse(localStorage.getItem('consumedStories') || '[]')
    if (!consumedStories.includes(currentStory.id)) {
      consumedStories.push(currentStory.id)
      localStorage.setItem('consumedStories', JSON.stringify(consumedStories))
    }
    navigate('/quiz')
  }

  const handleExit = () => {
    navigate('/stories')
  }

  return (
    <div className="flex flex-col min-h-screen bg-white" onClick={handleTap}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button
          onClick={(e) => {
            e.stopPropagation()
            navigate('/stories')
          }}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        {/* Progress Bar */}
        <div className="flex-1 mx-4 h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-black"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            handleExit()
          }}
          className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md text-center"
          >
            {/* Chunk Image (if available) */}
            {currentChunk.imageUrl && (
              <div className="mb-8 mx-auto w-48 h-48 rounded-2xl overflow-hidden">
                <img
                  src={currentChunk.imageUrl}
                  alt={currentChunk.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Chunk Title */}
            <h2 className="text-2xl font-bold mb-6">
              {currentChunk.title}
            </h2>

            {/* Chunk Content */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {currentChunk.content}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Hint */}
      <div className="px-8 pb-8 text-center">
        <p className="text-gray-400 text-sm">
          Tap left to go back • Tap right to continue
        </p>
        <p className="text-gray-300 text-xs mt-2">
          {currentIndex + 1} of {chunks.length}
        </p>
      </div>
    </div>
  )
}
