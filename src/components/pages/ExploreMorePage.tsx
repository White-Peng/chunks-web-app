import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, TrendingUp, Clock } from 'lucide-react'
import { motion } from 'motion/react'
import { generateRelatedTopics, SampleStories } from '@/data/content'
import type { Story, RelatedTopic } from '@/types'

interface ExploreMorePageProps {
  story: Story | null
  onSelectStory: (story: Story) => void
}

export function ExploreMorePage({ story, onSelectStory }: ExploreMorePageProps) {
  const navigate = useNavigate()
  const [topics, setTopics] = useState<RelatedTopic[]>([])

  useEffect(() => {
    if (story) {
      setTopics(generateRelatedTopics(story))
    } else {
      navigate('/actions')
    }
  }, [story, navigate])

  if (!story) return null

  const handleSelectTopic = (topic: RelatedTopic) => {
    // Find a related story or create one from the topic
    const relatedStory = SampleStories.find(
      (s) => s.title.toLowerCase().includes(topic.category.toLowerCase())
    ) || {
      id: topic.id + 100,
      title: topic.title,
      description: topic.description,
      imageUrl: topic.imageUrl,
    }
    onSelectStory(relatedStory)
    navigate('/stories')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 bg-white border-b">
        <button
          onClick={() => navigate('/actions')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="font-medium">Explore More</h2>
      </div>

      <div className="px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold mb-2">Related Topics</h1>
          <p className="text-gray-600 mb-8">
            Discover more topics related to {story.title}.
          </p>

          <div className="grid gap-4">
            {topics.map((topic, index) => (
              <motion.button
                key={topic.id}
                onClick={() => handleSelectTopic(topic)}
                className="w-full p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 text-left group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex gap-4">
                  <div
                    className="w-20 h-20 rounded-xl bg-cover bg-center flex-shrink-0"
                    style={{ backgroundImage: `url(${topic.imageUrl})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-purple-600 bg-purple-100 px-2 py-0.5 rounded-full">
                        {topic.category}
                      </span>
                      {topic.trending && (
                        <span className="flex items-center gap-1 text-xs text-orange-600">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-purple-600 transition-colors">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                      {topic.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {topic.readTime}
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="mt-8">
          <Button
            onClick={() => navigate('/onboarding')}
            variant="outline"
            className="w-full"
          >
            Update My Interests
          </Button>
        </div>
      </div>
    </div>
  )
}

