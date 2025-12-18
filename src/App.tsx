import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useUserStore } from '@/stores/userStore'
import {
  WelcomePage,
  SignUpPage,
  LoginPage,
  OnboardingPage,
  WelcomeHomePage,
  DailyGoalPage,
  StoriesPage,
  ReflectionPage,
  ChunksPage,
  ActionsPage,
  ChatbotPage,
  QuizPage,
  FullArticlePage,
  ExploreMorePage,
} from '@/components/pages'

function App() {
  const { user, isLoading, setDailyGoal, setCurrentStory } = useUserStore()

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-black text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              user ? <Navigate to="/welcome-home" replace /> : <WelcomePage />
            }
          />
          <Route
            path="/signup"
            element={
              user ? <Navigate to="/welcome-home" replace /> : <SignUpPage />
            }
          />
          <Route
            path="/login"
            element={
              user ? <Navigate to="/welcome-home" replace /> : <LoginPage />
            }
          />

          {/* Protected Routes */}
          <Route
            path="/onboarding"
            element={user ? <OnboardingPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/welcome-home"
            element={user ? <WelcomeHomePage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/daily-goal"
            element={
              user ? (
                <DailyGoalPage onSelectGoal={setDailyGoal} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/stories"
            element={
              user ? (
                <StoriesPage onSelectStory={setCurrentStory} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/reflection"
            element={user ? <ReflectionPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/chunks"
            element={user ? <ChunksPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/actions"
            element={user ? <ActionsPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/chatbot"
            element={user ? <ChatbotPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/quiz"
            element={user ? <QuizPage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/full-article"
            element={user ? <FullArticlePage /> : <Navigate to="/" replace />}
          />
          <Route
            path="/explore"
            element={user ? <ExploreMorePage /> : <Navigate to="/" replace />}
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
