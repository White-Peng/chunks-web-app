import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'motion/react'
import type { DailyGoal } from '@/types'

interface DailyGoalPageProps {
  onSelectGoal: (goal: DailyGoal) => void
}

export function DailyGoalPage({ onSelectGoal }: DailyGoalPageProps) {
  const navigate = useNavigate()

  const handleGoalSelection = (goal: DailyGoal) => {
    onSelectGoal(goal)
    navigate('/stories')
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white px-6 pt-12">
      {/* Header */}
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate('/welcome-home')}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="w-full max-w-md space-y-8 pt-8">
        {/* Title */}
        <motion.h1 
          className="text-center text-3xl font-bold leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How much do you want to Crunch today
        </motion.h1>

        {/* Options */}
        <motion.div 
          className="space-y-4 pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <button
            onClick={() => handleGoalSelection('deep-dive')}
            className="w-full py-6 px-8 border-2 border-black rounded-3xl hover:bg-gray-50 active:scale-[0.98] transition-all text-center"
          >
            I am ready to deep dive
          </button>

          <button
            onClick={() => handleGoalSelection('chill')}
            className="w-full py-6 px-8 border-2 border-black rounded-3xl hover:bg-gray-50 active:scale-[0.98] transition-all text-center"
          >
            I want to chill in bed
          </button>
        </motion.div>
      </div>
    </div>
  )
}
