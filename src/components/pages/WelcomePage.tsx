import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'

export function WelcomePage() {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 px-6">
      <div className="w-full max-w-md mx-auto">
        <motion.div
          className="flex flex-col items-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo/Title */}
          <motion.h1
            className="text-5xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Chunks
          </motion.h1>

          {/* Gradient Circle */}
          <motion.div
            className="relative w-64 h-64 my-12"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, type: 'spring' }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 blur-2xl opacity-60 animate-pulse"></div>
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 shadow-2xl"></div>
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 opacity-80"></div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-gray-600 text-center text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Discover. Reflect. Grow.
          </motion.p>

          {/* Sign Up Button */}
          <motion.div
            className="w-full max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button
              onClick={() => navigate('/signup')}
              variant="outline"
              size="lg"
              className="w-full text-base font-semibold"
            >
              SIGN UP
            </Button>
          </motion.div>

          {/* Already Have Account Link */}
          <motion.button
            onClick={() => navigate('/login')}
            className="text-gray-500 hover:text-gray-700 transition-colors text-sm tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            ALREADY HAVE AN ACCOUNT?
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

