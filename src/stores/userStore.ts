import { useState, useEffect, useCallback } from 'react'
import type { User, Story, DailyGoal, Interest } from '@/types'

// Storage keys
const STORAGE_KEYS = {
  USER: 'chunks_user',
  INTERESTS: 'chunks_interests',
  CURRENT_STORY: 'chunks_current_story',
  DAILY_GOAL: 'chunks_daily_goal',
} as const

// Custom hook for user state management
export function useUserStore() {
  const [user, setUser] = useState<User | null>(null)
  const [interests, setInterests] = useState<Interest[]>([])
  const [currentStory, setCurrentStory] = useState<Story | null>(null)
  const [dailyGoal, setDailyGoal] = useState<DailyGoal | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER)
      const storedInterests = localStorage.getItem(STORAGE_KEYS.INTERESTS)
      const storedStory = localStorage.getItem(STORAGE_KEYS.CURRENT_STORY)
      const storedGoal = localStorage.getItem(STORAGE_KEYS.DAILY_GOAL)

      if (storedUser) setUser(JSON.parse(storedUser))
      if (storedInterests) setInterests(JSON.parse(storedInterests))
      if (storedStory) setCurrentStory(JSON.parse(storedStory))
      if (storedGoal) setDailyGoal(storedGoal as DailyGoal)
    } catch (error) {
      console.error('Failed to load user state:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Sign up
  const signUp = useCallback((email: string, _password: string, name: string) => {
    const newUser: User = {
      email,
      name,
      hasCompletedOnboarding: false,
    }
    setUser(newUser)
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser))
  }, [])

  // Login
  const login = useCallback((email: string, _password: string) => {
    const existingUser: User = {
      email,
      name: 'Chunks Explorer',
      hasCompletedOnboarding: true,
    }
    setUser(existingUser)
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(existingUser))
  }, [])

  // Complete onboarding
  const completeOnboarding = useCallback((selectedInterests: Interest[]) => {
    if (!user) return

    const updatedUser = { ...user, hasCompletedOnboarding: true }
    setUser(updatedUser)
    setInterests(selectedInterests)
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser))
    localStorage.setItem(STORAGE_KEYS.INTERESTS, JSON.stringify(selectedInterests))
  }, [user])

  // Update interests
  const updateInterests = useCallback((newInterests: Interest[]) => {
    setInterests(newInterests)
    localStorage.setItem(STORAGE_KEYS.INTERESTS, JSON.stringify(newInterests))
  }, [])

  // Select daily goal
  const selectDailyGoal = useCallback((goal: DailyGoal) => {
    setDailyGoal(goal)
    localStorage.setItem(STORAGE_KEYS.DAILY_GOAL, goal)
  }, [])

  // Select story
  const selectStory = useCallback((story: Story) => {
    setCurrentStory(story)
    localStorage.setItem(STORAGE_KEYS.CURRENT_STORY, JSON.stringify(story))
  }, [])

  // Clear current story
  const clearCurrentStory = useCallback(() => {
    setCurrentStory(null)
    localStorage.removeItem(STORAGE_KEYS.CURRENT_STORY)
  }, [])

  // Reset goal
  const resetGoal = useCallback(() => {
    setDailyGoal(null)
    localStorage.removeItem(STORAGE_KEYS.DAILY_GOAL)
  }, [])

  // Logout
  const logout = useCallback(() => {
    setUser(null)
    setInterests([])
    setCurrentStory(null)
    setDailyGoal(null)
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key))
  }, [])

  return {
    // State
    user,
    interests,
    currentStory,
    dailyGoal,
    isLoading,
    isAuthenticated: !!user,

    // Actions
    signUp,
    login,
    logout,
    completeOnboarding,
    updateInterests,
    selectDailyGoal,
    selectStory,
    clearCurrentStory,
    resetGoal,
  }
}

// Type for the store
export type UserStore = ReturnType<typeof useUserStore>

