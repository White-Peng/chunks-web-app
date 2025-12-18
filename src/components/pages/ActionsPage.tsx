import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { MessageCircle, RotateCcw, BookOpen, ArrowRight } from 'lucide-react'
import { useUserStore } from '@/stores/userStore'

export function ActionsPage() {
  const navigate = useNavigate()
  const { currentStory } = useUserStore()

  const actions = [
    {
      id: 'chat',
      title: 'Chat with AI',
      description: 'Ask questions about what you learned',
      icon: MessageCircle,
      route: '/chatbot',
    },
    {
      id: 'retry',
      title: 'Take Quiz Again',
      description: 'Test your knowledge once more',
      icon: RotateCcw,
      route: '/quiz',
    },
    {
      id: 'explore',
      title: 'Explore More',
      description: 'Discover related topics',
      icon: BookOpen,
      route: '/explore',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto w-full"
      >
        {/* Completion Message */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6"
          >
            <span className="text-4xl">🎉</span>
          </motion.div>
          
          <h1 className="text-2xl font-bold mb-2">Great Job!</h1>
          <p className="text-gray-500">
            You've completed "{currentStory?.title}"
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <motion.button
                key={action.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onClick={() => navigate(action.route)}
                className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-2xl hover:border-black transition-colors group"
              >
                <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-black group-hover:text-white transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium">{action.title}</h3>
                  <p className="text-sm text-gray-500">{action.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
              </motion.button>
            )
          })}
        </div>

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          onClick={() => navigate('/stories')}
          className="w-full py-4 px-6 bg-black text-white rounded-full hover:bg-gray-800 transition-colors mt-12"
        >
          Continue to Next Story
        </motion.button>
      </motion.div>
    </div>
  )
}
