import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, useMotionValue, useTransform, type PanInfo } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { SampleStories } from '@/data/content';
import type { Story } from '@/types';

interface StoriesPageProps {
  onSelectStory: (story: Story) => void;
}

export function StoriesPage({ onSelectStory }: StoriesPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stories] = useState(SampleStories);
  
  const y = useMotionValue(0);
  const opacity = useTransform(y, [-300, 0, 300], [0.5, 1, 0.5]);

  // Set initial index based on consumed stories - recalculate when returning to this page
  useEffect(() => {
    const consumedStories = JSON.parse(localStorage.getItem('consumedStories') || '[]');
    // Find the first unconsumed story
    const firstUnconsumedIndex = stories.findIndex(story => !consumedStories.includes(story.id));
    if (firstUnconsumedIndex !== -1) {
      setCurrentIndex(firstUnconsumedIndex);
    } else {
      // All stories consumed, reset and start from beginning
      localStorage.setItem('consumedStories', JSON.stringify([]));
      setCurrentIndex(0);
    }
  }, [location, stories]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 100;
    
    // Vertical swipe
    if (Math.abs(info.offset.y) > Math.abs(info.offset.x)) {
      if (info.offset.y < -swipeThreshold) {
        // Swipe up (bottom to top) - Interested/Dive into topic
        navigateToChunks();
      }
    }
    // Horizontal swipe
    else if (Math.abs(info.offset.x) > swipeThreshold) {
      if (info.offset.x > 0 && currentIndex > 0) {
        // Swipe right - Previous story
        setCurrentIndex(currentIndex - 1);
      } else if (info.offset.x < 0 && currentIndex < stories.length - 1) {
        // Swipe left - Next story
        setCurrentIndex(currentIndex + 1);
      }
    }
  };

  const navigateToChunks = () => {
    const story = stories[currentIndex];
    onSelectStory(story);
    navigate('/chunks');
  };

  const currentStory = stories[currentIndex];

  if (!currentStory) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 py-4 bg-black/50">
        <button 
          onClick={() => navigate('/')}
          className="p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <h2 className="text-white">Stories</h2>
        <div className="w-10"></div>
      </div>

      {/* Story Card */}
      <motion.div
        className="absolute inset-0"
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
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70"></div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 pb-16">
          <h1 className="text-white mb-4 drop-shadow-lg">
            {currentStory.title}
          </h1>
          <p className="text-white/90 drop-shadow-lg">
            {currentStory.description}
          </p>
        </div>

        {/* Progress Indicators */}
        <div className="absolute top-20 left-0 right-0 flex justify-center gap-2 px-4">
          {stories.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full ${
                index === currentIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Swipe Hints */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center text-white/50 text-sm pointer-events-none z-10">
        <div className="text-center">↑ Swipe up to dive in</div>
      </div>
    </div>
  );
}
