import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { useUserStore } from '@/stores/userStore';

export function ChunksPage() {
  const navigate = useNavigate();
  const { currentStory } = useUserStore();
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);

  useEffect(() => {
    if (!currentStory) {
      navigate('/stories');
    }
  }, [currentStory, navigate]);

  if (!currentStory) return null;

  const chunks = currentStory.chunks;
  const currentChunk = chunks[currentChunkIndex];

  const nextChunk = () => {
    if (currentChunkIndex < chunks.length - 1) {
      setCurrentChunkIndex(currentChunkIndex + 1);
    } else {
      // All chunks viewed, navigate to chatbot page
      navigate('/chatbot');
    }
  };

  const prevChunk = () => {
    if (currentChunkIndex > 0) {
      setCurrentChunkIndex(currentChunkIndex - 1);
    }
  };

  if (!currentChunk) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-30 bg-black"
    >
      {/* Close Button */}
      <button
        onClick={() => navigate('/stories')}
        className="absolute top-4 right-4 z-40 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Chunk Content - Tappable */}
      <div className="relative h-full flex">
        {/* Left Tap Area - Previous Chunk */}
        <button
          onClick={prevChunk}
          className="absolute left-0 top-0 bottom-0 w-1/3 z-10"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        />

        {/* Right Tap Area - Next Chunk */}
        <button
          onClick={nextChunk}
          className="absolute right-0 top-0 bottom-0 w-1/3 z-10"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        />

        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentChunk.imageUrl || currentStory.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex flex-col justify-end p-8 pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={currentChunkIndex}
            className="space-y-4"
          >
            <p className="text-white/70 uppercase tracking-wider text-sm">
              Chunk {currentChunkIndex + 1} of {chunks.length}
            </p>
            <h1 className="text-white">
              {currentChunk.title}
            </h1>
            <p className="text-white/90 text-lg">
              {currentChunk.content}
            </p>
            
            {/* Navigation Hint */}
            <div className="pt-8 flex justify-between text-white/40 text-sm">
              <span>{currentChunkIndex > 0 ? '← Tap left' : ''}</span>
              <span>
                {currentChunkIndex < chunks.length - 1 
                  ? 'Tap right →' 
                  : 'Tap right to finish →'}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Progress Indicators */}
        <div className="absolute top-20 left-0 right-0 flex justify-center gap-2 px-4">
          {chunks.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full transition-colors ${
                index === currentChunkIndex ? 'bg-white' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
