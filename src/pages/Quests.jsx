import { useState } from 'react'
import { FaFilter, FaPlus } from 'react-icons/fa'
import QuestCard from '@/components/QuestCard'
import { useGameContext } from '@/lib/GameContext'
import CreateQuestForm from '@/components/CreateQuestForm'

export default function Quests() {
  const { quests, addQuest } = useGameContext()
  const [showCreateQuest, setShowCreateQuest] = useState(false)
  const [filter, setFilter] = useState('all')
  const [jobFilter, setJobFilter] = useState('all')

  // Filter quests based on selected filters
  const filteredQuests = quests.filter(quest => {
    const typeMatch = filter === 'all' || quest.type === filter
    const jobMatch = jobFilter === 'all' || quest.job === jobFilter
    return typeMatch && jobMatch
  })

  // Get unique job types
  const jobTypes = ['all', ...new Set(quests.map(quest => quest.job))]

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            <span className="text-primary highlight-text">Quests</span> Log
          </h1>
          <button 
            onClick={() => setShowCreateQuest(true)}
            className="rpg-border bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-200"
          >
            <FaPlus size={14} />
            <span>New Quest</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search quests..."
              className="w-full bg-background-light rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-background-light rounded-lg hover:bg-background">
              <FaFilter size={14} />
              <span>Filter</span>
            </button>
            <select 
              className="bg-background-light rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={jobFilter}
              onChange={(e) => setJobFilter(e.target.value)}
            >
              {jobTypes.map(job => (
                <option key={job} value={job}>{job === 'all' ? 'All Jobs' : job}</option>
              ))}
            </select>
            <select 
              className="bg-background-light rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="main">Main Quests</option>
              <option value="side">Side Quests</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Active Quests ({filteredQuests.length})</h2>
          <div className="space-y-4">
            {filteredQuests.map((quest) => (
              <QuestCard key={quest.id} quest={quest} />
            ))}
          </div>
        </div>
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
