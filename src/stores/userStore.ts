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
  const [interests, setInterestsState] = useState<Interest[]>([])
  const [currentStory, setCurrentStoryState] = useState<Story | null>(null)
  const [dailyGoal, setDailyGoalState] = useState<DailyGoal | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(STORAGE_KEYS.USER)
      const storedInterests = localStorage.getItem(STORAGE_KEYS.INTERESTS)
      const storedStory = localStorage.getItem(STORAGE_KEYS.CURRENT_STORY)
      const storedGoal = localStorage.getItem(STORAGE_KEYS.DAILY_GOAL)

      if (storedUser) setUser(JSON.parse(storedUser))
      if (storedInterests) setInterestsState(JSON.parse(storedInterests))
      if (storedStory) setCurrentStoryState(JSON.parse(storedStory))
      if (storedGoal) setDailyGoalState(storedGoal as DailyGoal)
    } catch (error) {
      console.error('Failed to load user state:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Sign up
  const signup = useCallback((email: string, _password: string, name: string) => {
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

  // Set interests
  const setInterests = useCallback((newInterests: string[]) => {
    setInterestsState(newInterests as Interest[])
    localStorage.setItem(STORAGE_KEYS.INTERESTS, JSON.stringify(newInterests))
    
    // Also mark onboarding as complete
    if (user) {
      const updatedUser = { ...user, hasCompletedOnboarding: true }
      setUser(updatedUser)
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser))
    }
  }, [user])

  // Complete onboarding
  const completeOnboarding = useCallback((selectedInterests: Interest[]) => {
    if (!user) return

    const updatedUser = { ...user, hasCompletedOnboarding: true }
    setUser(updatedUser)
    setInterestsState(selectedInterests)
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUser))
    localStorage.setItem(STORAGE_KEYS.INTERESTS, JSON.stringify(selectedInterests))
  }, [user])

  // Update interests
  const updateInterests = useCallback((newInterests: Interest[]) => {
    setInterestsState(newInterests)
    localStorage.setItem(STORAGE_KEYS.INTERESTS, JSON.stringify(newInterests))
  }, [])

  // Select daily goal
  const setDailyGoal = useCallback((goal: DailyGoal) => {
    setDailyGoalState(goal)
    localStorage.setItem(STORAGE_KEYS.DAILY_GOAL, goal)
  }, [])

  // Select story
  const setCurrentStory = useCallback((story: Story) => {
    setCurrentStoryState(story)
    localStorage.setItem(STORAGE_KEYS.CURRENT_STORY, JSON.stringify(story))
  }, [])

  // Clear current story
  const clearCurrentStory = useCallback(() => {
    setCurrentStoryState(null)
    localStorage.removeItem(STORAGE_KEYS.CURRENT_STORY)
  }, [])

  // Reset goal
  const resetGoal = useCallback(() => {
    setDailyGoalState(null)
    localStorage.removeItem(STORAGE_KEYS.DAILY_GOAL)
  }, [])

  // Logout
  const logout = useCallback(() => {
    setUser(null)
    setInterestsState([])
    setCurrentStoryState(null)
    setDailyGoalState(null)
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
    signup,
    login,
    logout,
    setInterests,
    completeOnboarding,
    updateInterests,
    setDailyGoal,
    setCurrentStory,
    clearCurrentStory,
    resetGoal,
    
    // Aliases for backward compatibility
    signUp: signup,
    selectDailyGoal: setDailyGoal,
    selectStory: setCurrentStory,
  }
}

// Type for the store
export type UserStore = ReturnType<typeof useUserStore>
