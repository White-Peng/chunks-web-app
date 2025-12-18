import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { MessageCircle, HelpCircle, FileText, Compass, ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'

interface ActionsPageProps {
  onSkip: () => void
}

const actions = [
  {
    id: 'chatbot',
    title: 'Chat with AI',
    description: 'Ask questions and explore deeper',
    icon: MessageCircle,
    route: '/chatbot',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'quiz',
    title: 'Take a Quiz',
    description: 'Test your understanding',
    icon: HelpCircle,
    route: '/quiz',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'article',
    title: 'Full Article',
    description: 'Read the complete story',
    icon: FileText,
    route: '/full-article',
    color: 'from-orange-500 to-amber-500',
  },
  {
    id: 'explore',
    title: 'Explore More',
    description: 'Discover related topics',
    icon: Compass,
    route: '/explore-more',
    color: 'from-purple-500 to-pink-500',
  },
]

export function ActionsPage({ onSkip }: ActionsPageProps) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 px-6 py-12">
      <motion.div
        className="max-w-md mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">What's Next?</h1>
        <p className="text-gray-600 mb-8">
          Choose how you'd like to continue your learning journey.
        </p>

        <div className="space-y-4 mb-8">
          {actions.map((action, index) => (
            <motion.button
              key={action.id}
              onClick={() => navigate(action.route)}
              className="w-full p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-4 group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className={`p-3 rounded-xl bg-gradient-to-br ${action.color} shadow-lg`}
              >
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-gray-900">{action.title}</h3>
                <p className="text-sm text-gray-500">{action.description}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
            </motion.button>
          ))}
        </div>

        <Button
          onClick={onSkip}
          variant="ghost"
          className="w-full text-gray-500"
        >
          Skip to next story
        </Button>
      </motion.div>
    </div>
  )
}

