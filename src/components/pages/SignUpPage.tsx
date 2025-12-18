import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { useUserStore } from '@/stores/userStore'

export function SignUpPage() {
  const navigate = useNavigate()
  const { signup } = useUserStore()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!formData.name.trim()) {
      setError('Please enter your name')
      return
    }
    if (!formData.email.trim()) {
      setError('Please enter your email')
      return
    }
    if (!formData.password.trim() || formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    signup(formData.email, formData.password, formData.name)
    navigate('/onboarding')
  }

  return (
    <div className="flex flex-col min-h-screen bg-white px-6 py-8">
      {/* Header */}
      <button
        onClick={() => navigate('/')}
        className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors w-fit"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <motion.div
        className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-2">Create Account</h1>
        <p className="text-gray-500 mb-8">Start your learning journey</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
              className="w-full px-4 py-4 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your@email.com"
              className="w-full px-4 py-4 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full px-4 py-4 bg-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/10"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full py-4 px-6 bg-black text-white rounded-full hover:bg-gray-800 transition-colors mt-8"
          >
            CREATE ACCOUNT
          </button>
        </form>

        <p className="text-center text-gray-500 mt-8">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-black font-medium hover:underline"
          >
            Log in
          </button>
        </p>
      </motion.div>
    </div>
  )
}
