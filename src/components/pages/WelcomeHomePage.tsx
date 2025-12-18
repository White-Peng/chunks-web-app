import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { useUserStore } from '@/stores/userStore'

export function WelcomeHomePage() {
  const navigate = useNavigate()
  const { user } = useUserStore()

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  const handleStart = () => {
    navigate('/daily-goal')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      <motion.div
        className="w-full max-w-md mx-auto text-center space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Greeting */}
        <div>
          <p className="text-gray-500 mb-2">{getGreeting()}</p>
          <h1 className="text-4xl font-bold">
            {user?.name?.split(' ')[0] || 'Explorer'}
          </h1>
        </div>

        {/* Decorative Element */}
        <motion.div 
          className="relative w-48 h-48 mx-auto my-12"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 blur-xl opacity-60"></div>
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500"></div>
        </motion.div>

        {/* Motivational Text */}
        <motion.p
          className="text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Ready to discover something new today?
        </motion.p>

        {/* Start Button */}
        <motion.button
          onClick={handleStart}
          className="w-full py-4 px-6 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          LET'S START
        </motion.button>
      </motion.div>
    </div>
  )
}
