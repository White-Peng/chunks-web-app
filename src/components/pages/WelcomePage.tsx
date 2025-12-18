import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'

export function WelcomePage() {
  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/signup')
  }

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-6">
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo/Title */}
          <motion.h1 
            className="text-center text-4xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Chunks
          </motion.h1>

          {/* Gradient Circle */}
          <motion.div 
            className="relative w-64 h-64 my-12"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, type: 'spring' }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 blur-2xl opacity-80"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500"></div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-gray-500 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Discover. Reflect. Grow.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            className="w-full space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={handleStart}
              className="w-full py-4 px-6 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
            >
              GET STARTED
            </button>
            
            <button
              onClick={handleLogin}
              className="w-full py-4 px-6 bg-white border-2 border-black rounded-full hover:bg-gray-50 transition-colors"
            >
              ALREADY HAVE AN ACCOUNT?
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
