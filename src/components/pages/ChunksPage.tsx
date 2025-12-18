import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, X } from 'lucide-react'
import { generateChunksFor } from '@/data/content'
import type { Story, Chunk } from '@/types'

interface ChunksPageProps {
  story: Story | null
}

export function ChunksPage({ story }: ChunksPageProps) {
  const navigate = useNavigate()
  const [chunks, setChunks] = useState<Chunk[]>([])
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0)
  const [selectedChunk, setSelectedChunk] = useState<Chunk | null>(null)

  useEffect(() => {
    if (story) {
      setChunks(generateChunksFor(story))
    } else {
      navigate('/stories')
    }
  }, [story, navigate])

  if (!story) return null

  const handleChunkClick = (chunk: Chunk, index: number) => {
    setCurrentChunkIndex(index)
    setSelectedChunk(chunk)
  }

  const closeChunkDetail = () => {
    setSelectedChunk(null)
  }

  const nextChunk = () => {
    if (currentChunkIndex < chunks.length - 1) {
      const nextIndex = currentChunkIndex + 1
      setCurrentChunkIndex(nextIndex)
      setSelectedChunk(chunks[nextIndex])
    } else {
      closeChunkDetail()
      setTimeout(() => navigate('/actions'), 300)
    }
  }

  const prevChunk = () => {
    if (currentChunkIndex > 0) {
      const prevIndex = currentChunkIndex - 1
      setCurrentChunkIndex(prevIndex)
      setSelectedChunk(chunks[prevIndex])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 py-4 bg-white/80 backdrop-blur-sm border-b">
        <button
          onClick={() => navigate('/reflection')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="font-medium">Chunks</h2>
        <div className="w-10"></div>
      </div>

      {/* Topic Header */}
      <div className="px-6 py-8 border-b bg-white">
        <p className="text-purple-600 uppercase tracking-wider text-sm mb-2">
          About {story.title}
        </p>
        <h1 className="text-2xl font-bold mb-2">6 Chunks to Explore</h1>
        <p className="text-gray-600">
          Tap on any chunk to dive deeper into the topic.
        </p>
      </div>

      {/* Chunks Grid */}
      <div className="grid grid-cols-2 gap-4 p-6">
        {chunks.map((chunk, index) => (
          <motion.button
            key={chunk.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleChunkClick(chunk, index)}
            className="relative aspect-square rounded-2xl overflow-hidden group shadow-lg"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
              style={{ backgroundImage: `url(${chunk.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>
            </div>

            {/* Content */}
            <div className="absolute inset-0 p-4 flex flex-col justify-end text-left">
              <p className="text-white/70 text-sm mb-1">Chunk {index + 1}</p>
              <h3 className="text-white font-semibold">{chunk.title}</h3>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Full Screen Chunk Detail */}
      <AnimatePresence>
        {selectedChunk && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black"
          >
            {/* Close Button */}
            <button
              onClick={closeChunkDetail}
              className="absolute top-4 right-4 z-40 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Progress Indicators */}
            <div className="absolute top-20 left-0 right-0 flex justify-center gap-2 px-4 z-30">
              {chunks.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    index === currentChunkIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            {/* Tap Areas */}
            <button
              onClick={prevChunk}
              className="absolute left-0 top-0 bottom-0 w-1/3 z-10"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            />
            <button
              onClick={nextChunk}
              className="absolute right-0 top-0 bottom-0 w-1/3 z-10"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            />

            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${selectedChunk.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80"></div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 pb-16">
              <motion.div
                key={selectedChunk.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <p className="text-white/70 uppercase tracking-wider text-sm">
                  Chunk {currentChunkIndex + 1} of {chunks.length}
                </p>
                <h1 className="text-white text-2xl font-bold">
                  {selectedChunk.title}
                </h1>
                <p className="text-white/90 text-lg">{selectedChunk.content}</p>

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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

