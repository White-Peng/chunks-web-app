// User types
export interface User {
  email: string
  name: string
  hasCompletedOnboarding: boolean
}

// Content types
export interface Story {
  id: number
  title: string
  description: string
  imageUrl: string
}

export interface Chunk {
  id: number
  title: string
  content: string
  imageUrl: string
}

export interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswerIndex: number
  explanation: string
}

export interface Article {
  title: string
  url: string
  source: string
  date: string
}

export interface RelatedTopic {
  id: number
  title: string
  description: string
  category: string
  readTime: string
  imageUrl: string
  trending?: boolean
}

// App state types
export type DailyGoal = 'deep-dive' | 'chill'

export interface DailyGoalOption {
  id: DailyGoal
  title: string
  subtitle: string
}

// Interest options
export const InterestOptions = [
  'Travelling',
  'Books',
  'DIY',
  'Tech',
  'Food',
  'Arts',
  'News',
  'Music',
  'Sports',
] as const

export type Interest = typeof InterestOptions[number]

// Reflection questions
export const ReflectionQuestions = [
  'How does this topic connect to your personal experiences?',
  "What's the most surprising thing you learned from this?",
  'How might this information change your perspective?',
  'What questions does this raise for you?',
  'How could you apply this knowledge in your daily life?',
  'What emotions does this topic evoke for you?',
] as const

