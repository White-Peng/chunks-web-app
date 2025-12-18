import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink, Calendar, Building } from 'lucide-react'
import { motion } from 'motion/react'
import { generateArticles } from '@/data/content'
import type { Story, Article } from '@/types'

interface FullArticlePageProps {
  story: Story | null
}

export function FullArticlePage({ story }: FullArticlePageProps) {
  const navigate = useNavigate()
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    if (story) {
      setArticles(generateArticles(story))
    } else {
      navigate('/actions')
    }
  }, [story, navigate])

  if (!story) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 bg-white border-b">
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
          <p className="text-gray-600 mb-8">
            Explore these articles to learn more about {story.title}.
          </p>

          <div className="space-y-4">
            {articles.map((article, index) => (
              <motion.a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
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
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        <div className="mt-8">
          <Button
            onClick={() => navigate('/actions')}
            variant="outline"
            className="w-full"
          >
            Back to Actions
          </Button>
        </div>
      </div>
    </div>
  )
}

