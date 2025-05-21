'use client'

import { FaFire, FaStar, FaTrophy, FaBriefcase, FaCalendarAlt, FaPlus, FaScroll } from 'react-icons/fa'
import QuestCard from '@/components/QuestCard'
import StatCard from '@/components/StatCard'
import { useGameContext } from '@/lib/GameContext'
import { useState } from 'react'
import CreateQuestForm from '@/components/CreateQuestForm'
import Link from 'next/link'

export default function Home() {
  const { character, quests, jobs, addQuest } = useGameContext()
  const [showCreateQuest, setShowCreateQuest] = useState(false)

  // Filter active quests
  const activeQuests = quests.filter(quest => !quest.completed).slice(0, 3)

  // Create stats array from character stats
  const stats = [
    { name: "Strength", value: character.stats.strength, icon: <FaFire className="text-red-500" /> },
    { name: "Intelligence", value: character.stats.intelligence, icon: <FaStar className="text-blue-500" /> },
    { name: "Charisma", value: character.stats.charisma, icon: <FaTrophy className="text-yellow-500" /> },
    { name: "Discipline", value: character.stats.discipline, icon: <FaCalendarAlt className="text-green-500" /> }
  ]

  // Get top 4 jobs
  const topJobs = jobs.slice(0, 4).map(job => ({
    name: job.name,
    level: job.level,
    progress: Math.floor((job.xp / job.nextLevelXp) * 100)
  }))

  return (
    <>
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-2 font-display">
          Welcome back, <span className="text-primary highlight-text">{character.name}</span>!
        </h1>
        <p className="text-text-muted">Your journey continues. You have {activeQuests.length} active quests to complete.</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.name} name={stat.name} value={stat.value} icon={stat.icon} />
        ))}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Active Quests</h2>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowCreateQuest(true)}
              className="flex items-center space-x-1 text-primary hover:text-primary-light"
            >
              <FaPlus size={14} />
              <span>New Quest</span>
            </button>
            <Link href="/quests" className="text-primary hover:text-primary-light">View All</Link>
          </div>
        </div>

        {activeQuests.length === 0 ? (
          <div className="bg-background-light p-8 rounded-lg text-center">
            <FaScroll className="mx-auto text-text-muted mb-4" size={40} />
            <h3 className="text-xl font-medium mb-2">No active quests</h3>
            <p className="text-text-muted mb-4">Create your first quest to start your adventure</p>
            <button
              onClick={() => setShowCreateQuest(true)}
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md inline-flex items-center space-x-2 transition-all duration-200"
            >
              <FaPlus size={14} />
              <span>Create Your First Quest</span>
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {activeQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <FaBriefcase className="mr-2 text-primary" />
            Job Classes
          </h2>
          <Link href="/jobs" className="text-primary hover:text-primary-light">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topJobs.map((job) => (
            <div key={job.name} className="bg-background-light p-4 rounded-lg rpg-border relative">
              <div className="pixel-corner top-left"></div>
              <div className="pixel-corner top-right"></div>
              <div className="pixel-corner bottom-left"></div>
              <div className="pixel-corner bottom-right"></div>

              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{job.name}</h3>
                <span className="text-sm bg-primary/20 text-primary px-2 py-1 rounded">Lv.{job.level}</span>
              </div>
              <div className="xp-bar">
                <div className="xp-bar-fill" style={{ width: `${job.progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>

    {/* Create Quest Modal */}
    {showCreateQuest && (
      <CreateQuestForm
        onClose={() => setShowCreateQuest(false)}
        onCreateQuest={addQuest}
      />
    )}
    </>
  )
}
