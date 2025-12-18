import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { LogOut, Settings } from 'lucide-react'
import { motion } from 'motion/react'

interface WelcomeHomePageProps {
  userName: string
  onLogout: () => void
}

export function WelcomeHomePage({ userName, onLogout }: WelcomeHomePageProps) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <button
          onClick={() => navigate('/settings')}
          className="p-2 hover:bg-white/50 rounded-full transition-colors"
        >
          <Settings className="w-6 h-6 text-gray-600" />
        </button>
        <button
          onClick={onLogout}
          className="p-2 hover:bg-white/50 rounded-full transition-colors"
        >
          <LogOut className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Greeting */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p className="text-gray-500 text-lg mb-2">Welcome back,</p>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
              {userName}
            </h1>
          </motion.div>

          {/* Animated Circles */}
          <motion.div
            className="relative w-48 h-48 mx-auto mb-12"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 opacity-40 blur-xl animate-pulse"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-60"></div>
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-4xl">📚</span>
            </div>
          </motion.div>

          {/* Message */}
          <motion.p
            className="text-gray-600 text-lg mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Ready to discover something new today?
          </motion.p>

          {/* Start Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Button
              onClick={() => navigate('/daily-goal')}
              size="lg"
              className="px-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Let's Start
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

