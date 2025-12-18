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
  const {
    user,
    currentStory,
    isLoading,
    signUp,
    login,
    logout,
    completeOnboarding,
    selectDailyGoal,
    selectStory,
    clearCurrentStory,
  } = useUserStore()

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="animate-pulse text-purple-600 text-xl">Loading...</div>
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
              user ? (
                <Navigate to="/welcome-home" replace />
              ) : (
                <SignUpPage onSignUp={signUp} />
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/welcome-home" replace />
              ) : (
                <LoginPage onLogin={login} />
              )
            }
          />

          {/* Protected Routes */}
          <Route
            path="/onboarding"
            element={
              user && !user.hasCompletedOnboarding ? (
                <OnboardingPage onComplete={completeOnboarding} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/welcome-home"
            element={
              user ? (
                <WelcomeHomePage userName={user.name} onLogout={logout} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/daily-goal"
            element={
              user ? (
                <DailyGoalPage onSelectGoal={selectDailyGoal} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/stories"
            element={
              user ? (
                <StoriesPage onSelectStory={selectStory} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/reflection"
            element={
              user ? (
                <ReflectionPage story={currentStory} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/chunks"
            element={
              user ? (
                <ChunksPage story={currentStory} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/actions"
            element={
              user ? (
                <ActionsPage onSkip={clearCurrentStory} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/chatbot"
            element={
              user ? (
                <ChatbotPage story={currentStory} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/quiz"
            element={
              user ? <QuizPage story={currentStory} /> : <Navigate to="/" replace />
            }
          />
          <Route
            path="/full-article"
            element={
              user ? (
                <FullArticlePage story={currentStory} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/explore-more"
            element={
              user ? (
                <ExploreMorePage story={currentStory} onSelectStory={selectStory} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
