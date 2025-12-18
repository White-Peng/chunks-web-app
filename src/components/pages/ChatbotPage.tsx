import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowLeft, Send, ChevronDown } from 'lucide-react'
import { useUserStore } from '@/stores/userStore'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface Reference {
  id: string
  title: string
  source: string
}

export function ChatbotPage() {
  const navigate = useNavigate()
  const { currentStory } = useUserStore()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showReferences, setShowReferences] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Sample references based on story
  const references: Reference[] = currentStory ? [
    { id: '1', title: 'Understanding ' + currentStory.title, source: 'Wikipedia' },
    { id: '2', title: 'A Deep Dive into the Topic', source: 'Scientific American' },
    { id: '3', title: 'Further Reading', source: 'Nature Journal' },
  ] : []

  // Initial greeting
  useEffect(() => {
    if (messages.length === 0 && currentStory) {
      setTimeout(() => {
        setMessages([
          {
            id: '1',
            role: 'assistant',
            content: `Great job completing the chunks on "${currentStory.title}"! 🎉 Feel free to ask me any questions about what you've learned.`,
            timestamp: new Date(),
          },
        ])
      }, 500)
    }
  }, [currentStory, messages.length])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(userMessage.content),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase()
    
    if (lowerInput.includes('what') && lowerInput.includes('learn')) {
      return `Based on your reading about "${currentStory?.title}", you learned about the key concepts including the main ideas presented in each chunk. Would you like me to summarize any specific part?`
    }
    
    if (lowerInput.includes('explain') || lowerInput.includes('more')) {
      return `Great question! The topic we explored covers several fascinating aspects. Let me break it down further for you...`
    }
    
    if (lowerInput.includes('quiz') || lowerInput.includes('test')) {
      return `You can take the quiz anytime! Just head back and select "Take Quiz" to test your knowledge on "${currentStory?.title}".`
    }

    return `That's an interesting question! Based on what you read about "${currentStory?.title}", I'd say this relates to the broader concepts we covered. Would you like me to elaborate on any specific aspect?`
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

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
        <h2 className="font-medium">Chat with Chunks AI</h2>
        <div className="w-10"></div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-black text-white rounded-br-md'
                    : 'bg-gray-100 text-black rounded-bl-md'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start mb-4"
          >
            <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex gap-1">
                <motion.div
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-gray-400 rounded-full"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* References Accordion */}
      {references.length > 0 && (
        <div className="border-t border-gray-100">
          <button
            onClick={() => setShowReferences(!showReferences)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-500 hover:bg-gray-50"
          >
            <span>References ({references.length})</span>
            <motion.div
              animate={{ rotate: showReferences ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
          
          <AnimatePresence>
            {showReferences && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-2">
                  {references.map((ref) => (
                    <div
                      key={ref.id}
                      className="p-3 bg-gray-50 rounded-lg text-sm"
                    >
                      <p className="font-medium text-gray-800">{ref.title}</p>
                      <p className="text-gray-500 text-xs mt-1">{ref.source}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question..."
            className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-black/10"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="p-3 bg-black text-white rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
