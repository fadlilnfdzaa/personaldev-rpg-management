import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GameProvider } from '@/lib/GameContext'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import HomePage from '@/pages/Home'
import QuestsPage from '@/pages/Quests'
import ChallengesPage from '@/pages/Challenges'
import CharacterPage from '@/pages/Character'
import JobsPage from '@/pages/Jobs'
import AchievementsPage from '@/pages/Achievements'
import SettingsPage from '@/pages/Settings'

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-6 bg-background">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quests" element={<QuestsPage />} />
                <Route path="/challenges" element={<ChallengesPage />} />
                <Route path="/character" element={<CharacterPage />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/achievements" element={<AchievementsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </GameProvider>
  )
}

export default App
