import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Layout } from './components/Layout'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Home } from './pages/Home'
import { Detector } from './pages/Detector'
import { Results } from './pages/Results'
import type { AppPage, AnalysisData } from './types'

// Page transition animation
const PAGE_TRANSITION = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -12 },
  transition: { duration: 0.28, ease: 'easeInOut' as const },
}

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home')
  const [analysisData, setAnalysisData] = useState<AnalysisData>({
    threatType: 'none',
    severityLevel: 'low',
  })

  // Home → Detector
  const handleStartAnalysis = () => {
    setCurrentPage('detector')
  }

  // Detector → Results (carries threat type + severity)
  const handleCompleteAnalysis = (
    threatType: AnalysisData['threatType'],
    severityLevel: AnalysisData['severityLevel']
  ) => {
    setAnalysisData({ threatType, severityLevel })
    setCurrentPage('results')
  }

  // Results / anywhere → Home
  const handleBackToHome = () => {
    setCurrentPage('home')
    setAnalysisData({ threatType: 'none', severityLevel: 'low' })
  }

  return (
    <ErrorBoundary>
      <Layout>
        {/* AnimatePresence enables exit animations on page change */}
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div key="home" {...PAGE_TRANSITION}>
              <Home onStart={handleStartAnalysis} />
            </motion.div>
          )}

          {currentPage === 'detector' && (
            <motion.div key="detector" {...PAGE_TRANSITION}>
              <Detector onCompleteAnalysis={handleCompleteAnalysis} />
            </motion.div>
          )}

          {currentPage === 'results' && (
            <motion.div key="results" {...PAGE_TRANSITION}>
              <Results
                threatType={analysisData.threatType}
                severity={analysisData.severityLevel}
                onBack={handleBackToHome}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Layout>
    </ErrorBoundary>
  )
}

export default App
