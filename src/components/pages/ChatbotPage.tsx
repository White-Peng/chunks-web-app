import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Send, Bot, User } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import type { Story } from '@/types'

interface Message {
  id: number
  text: string
  isBot: boolean
}

interface ChatbotPageProps {
  story: Story | null
}

export function ChatbotPage({ story }: ChatbotPageProps) {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: `Hi! I'm here to help you explore "${story?.title || 'this topic'}" further. What would you like to know?`,
      isBot: true,
    },
  ])
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      isBot: false,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: `That's a great question about ${story?.title || 'this topic'}! Let me think about that... This is a simulated response. In a real app, this would connect to an AI service to provide meaningful answers.`,
        isBot: true,
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 bg-white border-b">
        <button
          onClick={() => navigate('/actions')}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-blue-100">
            <Bot className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="font-medium">AI Assistant</h2>
            <p className="text-xs text-gray-500">Ask anything about {story?.title}</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${message.isBot ? '' : 'flex-row-reverse'}`}
            >
              <div
                className={`p-2 rounded-full ${
                  message.isBot ? 'bg-blue-100' : 'bg-purple-100'
                }`}
              >
                {message.isBot ? (
                  <Bot className="w-5 h-5 text-blue-600" />
                ) : (
                  <User className="w-5 h-5 text-purple-600" />
                )}
              </div>
              <div
                className={`max-w-[75%] p-4 rounded-2xl ${
                  message.isBot
                    ? 'bg-white shadow-sm'
                    : 'bg-purple-600 text-white'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={!input.trim()}>
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}

