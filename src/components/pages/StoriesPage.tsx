import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useMotionValue, useTransform, type PanInfo } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { SampleStories } from '@/data/content'
import type { Story } from '@/types'

interface StoriesPageProps {
  onSelectStory: (story: Story) => void
}

export function StoriesPage({ onSelectStory }: StoriesPageProps) {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [stories, setStories] = useState(SampleStories)

  const y = useMotionValue(0)
  const opacity = useTransform(y, [-300, 0, 300], [0.5, 1, 0.5])

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 100

    // Vertical swipe
    if (Math.abs(info.offset.y) > Math.abs(info.offset.x)) {
      if (info.offset.y > swipeThreshold) {
        // Swipe down - Skip/Not interested
        dismissStory()
      } else if (info.offset.y < -swipeThreshold) {
        // Swipe up - Interested/Read more
        navigateToReflection()
      }
    }
    // Horizontal swipe
    else if (Math.abs(info.offset.x) > swipeThreshold) {
      if (info.offset.x > 0 && currentIndex > 0) {
        // Swipe right - Previous story
        setCurrentIndex(currentIndex - 1)
      } else if (info.offset.x < 0 && currentIndex < stories.length - 1) {
        // Swipe left - Next story
        setCurrentIndex(currentIndex + 1)
      }
    }
  }

  const dismissStory = () => {
    const newStories = stories.filter((_, index) => index !== currentIndex)
    setStories(newStories)

    if (newStories.length === 0) {
      navigate('/daily-goal')
    } else if (currentIndex >= newStories.length) {
      setCurrentIndex(newStories.length - 1)
    }
  }

  const navigateToReflection = () => {
    const story = stories[currentIndex]
    onSelectStory(story)
    navigate('/reflection')
  }

  const currentStory = stories[currentIndex]

  if (!currentStory) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-4 bg-gradient-to-b from-black/60 to-transparent">
        <button
          onClick={() => navigate('/daily-goal')}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-white font-medium">Discover Stories</h2>
        <div className="w-10"></div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute top-20 left-0 right-0 flex justify-center gap-2 px-4 z-20">
        {stories.map((_, index) => (
          <div
            key={index}
            className={`h-1 flex-1 rounded-full transition-colors ${
              index === currentIndex ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Story Card */}
      <motion.div
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.7}
        onDragEnd={handleDragEnd}
        style={{ y, opacity }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentStory.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80"></div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 pb-24">
          <motion.div
            key={currentStory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-white text-3xl font-bold mb-4 drop-shadow-lg">
              {currentStory.title}
            </h1>
            <p className="text-white/90 text-lg drop-shadow-lg">
              {currentStory.description}
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Swipe Hints */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8 text-white/50 text-sm pointer-events-none z-10">
        <div className="text-center flex flex-col items-center">
          <span className="text-2xl mb-1">↓</span>
          <span>Skip</span>
        </div>
        <div className="text-center flex flex-col items-center">
          <span className="text-2xl mb-1">↑</span>
          <span>Read</span>
        </div>
      </div>
    </div>
  )
}

