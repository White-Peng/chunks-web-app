import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft, X } from 'lucide-react'
import { useUserStore } from '@/stores/userStore'

export function ReflectionPage() {
  const navigate = useNavigate()
  const { currentStory } = useUserStore()
  const [reflection, setReflection] = useState('')

  const handleSave = () => {
    // Save reflection to localStorage
    if (currentStory && reflection.trim()) {
      const reflections = JSON.parse(localStorage.getItem('reflections') || '{}')
      reflections[currentStory.id] = {
        text: reflection,
        timestamp: new Date().toISOString(),
      }
      localStorage.setItem('reflections', JSON.stringify(reflections))
    }
    navigate('/quiz')
  }

  const handleSkip = () => {
    navigate('/quiz')
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4">
        <button
          onClick={() => navigate('/chunks')}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <h2 className="font-medium">Reflection</h2>
        
        <button
          onClick={handleSkip}
          className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Content */}
      <motion.div 
        className="flex-1 flex flex-col px-6 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold mb-4">
          What stood out to you?
        </h1>
        <p className="text-gray-500 mb-8">
          Take a moment to reflect on what you just learned about "{currentStory?.title}".
        </p>

        {/* Textarea */}
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="Write your thoughts here..."
          className="flex-1 min-h-[200px] p-4 bg-gray-50 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-black/10 text-lg"
        />

        {/* Prompts */}
        <div className="mt-6 space-y-2">
          <p className="text-sm text-gray-400">Prompts to consider:</p>
          <div className="flex flex-wrap gap-2">
            {['What surprised me?', 'How does this connect?', 'What questions do I have?'].map((prompt) => (
              <button
                key={prompt}
                onClick={() => setReflection((prev) => prev + (prev ? '\n\n' : '') + prompt + ' ')}
                className="px-3 py-1.5 bg-gray-100 rounded-full text-sm text-gray-600 hover:bg-gray-200 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <div className="p-6 space-y-3">
        <button
          onClick={handleSave}
          disabled={!reflection.trim()}
          className={`w-full py-4 px-6 rounded-full transition-all ${
            reflection.trim()
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Save & Continue
        </button>
        
        <button
          onClick={handleSkip}
          className="w-full py-4 px-6 text-gray-500 hover:text-black transition-colors"
        >
          Skip for now
        </button>
      </div>
    </div>
  )
}
