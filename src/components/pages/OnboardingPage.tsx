import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { InterestOptions, type Interest } from '@/types'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

interface OnboardingPageProps {
  onComplete: (interests: Interest[]) => void
}

export function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const navigate = useNavigate()
  const [selectedInterests, setSelectedInterests] = useState<Interest[]>([])

  const toggleInterest = (interest: Interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    )
  }

  const handleSubmit = () => {
    onComplete(selectedInterests)
    navigate('/welcome-home')
  }

  const handleSkip = () => {
    onComplete([])
    navigate('/welcome-home')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 px-6 py-12">
      <motion.div
        className="max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">What interests you?</h1>
        <p className="text-gray-600 mb-8">
          Select topics you'd like to explore. This helps us personalize your
          experience.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {InterestOptions.map((interest, index) => (
            <motion.button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={cn(
                'py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200',
                selectedInterests.includes(interest)
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-200'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-purple-300'
              )}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {interest}
            </motion.button>
          ))}
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleSubmit}
            className="w-full"
            size="lg"
            disabled={selectedInterests.length === 0}
          >
            Continue ({selectedInterests.length} selected)
          </Button>

          <Button
            onClick={handleSkip}
            variant="ghost"
            className="w-full text-gray-500"
          >
            Skip for now
          </Button>
        </div>
      </motion.div>
    </div>
  )
}

