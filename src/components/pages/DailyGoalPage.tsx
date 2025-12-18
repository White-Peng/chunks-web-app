import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Zap, Coffee } from 'lucide-react'
import { motion } from 'motion/react'
import { DailyGoalOptions } from '@/data/content'
import type { DailyGoal } from '@/types'
import { cn } from '@/lib/utils'

interface DailyGoalPageProps {
  onSelectGoal: (goal: DailyGoal) => void
}

export function DailyGoalPage({ onSelectGoal }: DailyGoalPageProps) {
  const navigate = useNavigate()

  const handleSelectGoal = (goal: DailyGoal) => {
    onSelectGoal(goal)
    navigate('/stories')
  }

  const goalIcons = {
    'deep-dive': Zap,
    chill: Coffee,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <div className="flex items-center px-4 py-4">
        <button
          onClick={() => navigate('/welcome-home')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      <div className="px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold mb-2">Set Your Daily Goal</h1>
          <p className="text-gray-600 mb-8">
            How much time do you want to invest in learning today?
          </p>
        </motion.div>

        <div className="space-y-4">
          {DailyGoalOptions.map((option, index) => {
            const Icon = goalIcons[option.id]
            return (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
              >
                <Button
                  onClick={() => handleSelectGoal(option.id)}
                  variant="outline"
                  className={cn(
                    'w-full h-auto py-6 px-4 sm:px-6 flex items-center gap-3 sm:gap-4 justify-start text-left',
                    'whitespace-normal overflow-hidden',
                    'hover:border-purple-300 hover:bg-purple-50 transition-all duration-200'
                  )}
                >
                  <div className="p-3 rounded-full bg-purple-100 shrink-0">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                      {option.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 break-words">
                      {option.subtitle}
                    </p>
                  </div>
                </Button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

