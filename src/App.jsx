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
import ScrollToTop from "./components/ScrollToTop";
import CoursePage from './pages/courses/CoursePage'
import CoachingPage from './pages/coaching/CoachingPage'
import PricingPage from './pages/pricing/PricingPage'
import WhatsappButton from './components/watsapp/WhatsappButton'
import './App.css'

import AdminLayout from './admin/AdminLayout'
import AdminDashboardHome from './pages/admin/adminDashboard/AdminDashboard'
import CreateTestSeries from './pages/admin/adminTestSeries/AdminCreateTestSeries'
import CreateMockTest from './pages/admin/adminMockTest/AdminCreateMockTest'
import CreateQuestion from './pages/admin/adminQuestions/AdminCreateQuestion'
import UploadPYQ from './pages/admin/adminPyq/AdminUploadPyq'
import AdminExamCategoryPage from './pages/admin/adminExamCategory/AdminCreateExamCategory.jsx'
import ExamSubCategoryPage from './pages/admin/adminExamSubCategory/ExamSubCategoryPage.jsx'





export default function App() {
  return (
    <div className="app">


      <main className="container">
        <ScrollToTop />
        <Routes>


          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardHome />} />
            <Route path="testseries/create" element={<CreateTestSeries />} />
            <Route path="mocktest/create" element={<CreateMockTest />} />
            <Route path="questions/create" element={<CreateQuestion />} />
            <Route path="pyq/upload" element={<UploadPYQ />} />
            <Route path="exam-categories" element={<AdminExamCategoryPage />} />
            <Route path="exam-subcategories" element={<ExamSubCategoryPage />} />
          </Route>

          {/* <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/testseries/create" element={<AdminCreateTestSeries />} />
          <Route path="/admin/mocktest/create" element={<AdminCreateMockTest />} />
          <Route path="/admin/questions/create" element={<AdminCreateQuestions />} />
          <Route path="/admin/pyq/upload" element={<AdminUploadPyq />} /> */}


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
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/coaching" element={<CoachingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          {/* <Route path="/mocktest/:mockTestId/start/:attemptId?" element={<StartAttemptPage />} />
          <Route path="/attempt/:attemptId/result" element={<ResultPage />} />
          <Route path="/leaderboard/:mockTestId" element={<LeaderboardPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/analytics/:attemptId" element={<AnalyticsPage />} />
          <Route path="/login" element={<LoginPage />} />  */}
        </Routes>
        <WhatsappButton />
      </main>


    </div>
  )
}
