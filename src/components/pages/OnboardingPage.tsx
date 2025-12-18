import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, Check } from 'lucide-react'
import { useUserStore } from '@/stores/userStore'

const INTERESTS = [
  { id: 'technology', label: 'Technology', emoji: '💻' },
  { id: 'science', label: 'Science', emoji: '🔬' },
  { id: 'art', label: 'Art & Design', emoji: '🎨' },
  { id: 'business', label: 'Business', emoji: '💼' },
  { id: 'health', label: 'Health & Wellness', emoji: '🧘' },
  { id: 'history', label: 'History', emoji: '📜' },
  { id: 'psychology', label: 'Psychology', emoji: '🧠' },
  { id: 'philosophy', label: 'Philosophy', emoji: '🤔' },
  { id: 'nature', label: 'Nature', emoji: '🌿' },
  { id: 'music', label: 'Music', emoji: '🎵' },
  { id: 'travel', label: 'Travel', emoji: '✈️' },
  { id: 'food', label: 'Food & Cooking', emoji: '🍳' },
]

export function OnboardingPage() {
  const navigate = useNavigate()
  const { setInterests } = useUserStore()
  const [selectedInterests, setSelectedInterests] = useState<string[]>([])

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    )
  }

  const handleContinue = () => {
    setInterests(selectedInterests)
    navigate('/welcome-home')
  }

  const canContinue = selectedInterests.length >= 3

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 py-8">
      {/* Header */}
      <button
        onClick={() => navigate('/signup')}
        className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors w-fit"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <motion.div
        className="flex-1 flex flex-col max-w-md mx-auto w-full pt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">What interests you?</h1>
        <p className="text-gray-500 mb-8">
          Select at least 3 topics to personalize your experience
        </p>

        {/* Interest Grid */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          {INTERESTS.map((interest) => {
            const isSelected = selectedInterests.includes(interest.id)
            return (
              <motion.button
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                whileTap={{ scale: 0.95 }}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  isSelected
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-2xl">{interest.emoji}</span>
                <span className="text-sm font-medium">{interest.label}</span>
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute top-2 right-2"
                    >
                      <Check className="w-4 h-4" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </div>

        {/* Continue Button */}
        <div className="pt-8 pb-4">
          <button
            onClick={handleContinue}
            disabled={!canContinue}
            className={`w-full py-4 px-6 rounded-full transition-all ${
              canContinue
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            CONTINUE ({selectedInterests.length}/3 selected)
          </button>
        </div>
      </motion.div>
    </div>
  )
}
