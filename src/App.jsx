import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import TestSeriesPage from './pages/testSeries/TestSeriesPage'
import MockTestsPage from './pages/mockTest/MockTestsPage'
import InstructionsPage from './pages/instructions/InstructionsPage'
import StartTest from './pages/attempt/StartTest'
import ResultPage from './pages/attempt/ResultPage'
import LeaderboardPage from './pages/attempt/LeaderboardPage'
import HomePage from './pages/home/HomePage'
import Header from './pages/home/Header'
import MainPage from './pages/home/MainPage'
import PYPPage from './pages/pyq/PYPPage'
import PyqListPage from './pages/pyq/PyqListPage'
import PyqPage from './pages/pyq/PyqPage'




export default function App() {
  return (
    <div className="app">


      <main className="container">
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<MainPage />} />
          <Route path="/okk" element={<Header />} />
          <Route path="/testseries" element={<TestSeriesPage />} />
          <Route path="/pyppage" element={<PYPPage />} />
          <Route path="/mocktest/testseries/:seriesId" element={<MockTestsPage />} />
          <Route path="/instructions/mocktest/:mocktestId" element={<InstructionsPage />} />
          <Route path="/mocktest/:mocktestId/start" element={<StartTest />} />
          <Route path="/attempt/:attemptId/result/:studentId" element={<ResultPage />} />
          <Route path="/attempt/leaderboard/:mockTestId/:limit" element={<LeaderboardPage />} />
          {/* <Route path="/pyq/subcategory/:subCategoryId" element={<PyqListPage />} /> */}
          <Route path="/pyq/subcategory/:subCategoryId" element={<PyqPage />} />
          {/* <Route path="/mocktest/:mockTestId/start/:attemptId?" element={<StartAttemptPage />} />
          <Route path="/attempt/:attemptId/result" element={<ResultPage />} />
          <Route path="/leaderboard/:mockTestId" element={<LeaderboardPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/analytics/:attemptId" element={<AnalyticsPage />} />
          <Route path="/login" element={<LoginPage />} />  */}
        </Routes>
      </main>


    </div>
  )
}
