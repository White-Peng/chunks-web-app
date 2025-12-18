import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft, ExternalLink, BookOpen } from 'lucide-react'
import { useUserStore } from '@/stores/userStore'

export function ExploreMorePage() {
  const navigate = useNavigate()
  const { currentStory } = useUserStore()

  // Generate related topics based on current story
  const relatedTopics = currentStory?.relatedTopics || [
    'Deep Dive Article',
    'Related Research',
    'Video Explanation',
    'Similar Topics',
  ]

  const resources = [
    {
      id: '1',
      title: `Understanding ${currentStory?.title || 'This Topic'}`,
      type: 'Article',
      source: 'Encyclopedia',
      readTime: '5 min read',
    },
    {
      id: '2',
      title: 'Scientific Research and Findings',
      type: 'Research Paper',
      source: 'Academic Journal',
      readTime: '15 min read',
    },
    {
      id: '3',
      title: 'Expert Video Explanation',
      type: 'Video',
      source: 'Educational Channel',
      readTime: '10 min watch',
    },
    {
      id: '4',
      title: 'Hands-on Exploration',
      type: 'Interactive',
      source: 'Learning Platform',
      readTime: '20 min activity',
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
        <button
          onClick={() => navigate('/actions')}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="font-medium">Explore More</h2>
        <div className="w-10"></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-bold mb-2">
            Continue Learning
          </h1>
          <p className="text-gray-500 mb-8">
            Dive deeper into topics related to "{currentStory?.title}"
          </p>

          {/* Related Topics */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-400 mb-4">RELATED TOPICS</h3>
            <div className="flex flex-wrap gap-2">
              {relatedTopics.map((topic, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="px-4 py-2 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors"
                >
                  {topic}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-4">CURATED RESOURCES</h3>
            <div className="space-y-4">
              {resources.map((resource, index) => (
                <motion.div
                  key={resource.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 border border-gray-200 rounded-2xl hover:border-black transition-colors cursor-pointer group"
                >
                  <div className="p-3 bg-gray-100 rounded-xl group-hover:bg-black group-hover:text-white transition-colors">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium mb-1 truncate">{resource.title}</h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                        {resource.type}
                      </span>
                      <span>{resource.source}</span>
                      <span>•</span>
                      <span>{resource.readTime}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors flex-shrink-0" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-100">
        <button
          onClick={() => navigate('/stories')}
          className="w-full py-4 px-6 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          Back to Stories
        </button>
      </div>
    </div>
  )
}
