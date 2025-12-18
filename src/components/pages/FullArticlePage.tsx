import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Calendar, Building } from 'lucide-react'
import { motion } from 'motion/react'
import { generateArticles } from '@/data/content'
import { useUserStore } from '@/stores/userStore'
import type { Article } from '@/types'

export function FullArticlePage() {
  const navigate = useNavigate()
  const { currentStory } = useUserStore()
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    if (currentStory) {
      setArticles(generateArticles(currentStory))
    } else {
      navigate('/actions')
    }
  }, [currentStory, navigate])

  if (!currentStory) return null

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
        <button
          onClick={() => navigate('/actions')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="font-medium">Related Articles</h2>
      </div>

      <div className="px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-2">Dive Deeper</h1>
          <p className="text-gray-500 mb-8">
            Explore these articles to learn more about {currentStory.title}.
          </p>

          <div className="space-y-4">
            {articles.map((article, index) => (
              <motion.a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border border-gray-200 rounded-2xl hover:border-black transition-all duration-200 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-black transition-colors">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        {article.source}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {article.date}
                      </span>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <div className="mt-8">
          <button
            onClick={() => navigate('/actions')}
            className="w-full py-4 px-6 border-2 border-black rounded-full hover:bg-gray-50 transition-colors"
          >
            Back to Actions
          </button>
        </div>
      </div>
    </div>
  )
}
