import { useState } from 'react'
import { FaBell, FaPlus, FaSearch, FaTrophy } from 'react-icons/fa'
import { useGameContext } from '@/lib/GameContext'
import CreateQuestForm from './CreateQuestForm'

const Header = () => {
  const { character, quests, addQuest } = useGameContext()
  const [notifications, setNotifications] = useState(3)
  const [showCreateQuest, setShowCreateQuest] = useState(false)
  
  // Calculate active quests
  const activeQuests = quests.filter(quest => !quest.completed)

  return (
    <>
      <header className="bg-background-dark border-b border-primary/30 py-3 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold font-display">
              <span className="text-primary">Adventure</span> Log
            </h2>
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search quests..."
                className="bg-background rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary w-64"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
            </div>
            <div className="hidden md:flex items-center space-x-2 text-text-muted text-sm">
              <span className="px-2 py-1 bg-background-light rounded-md">
                {activeQuests.length} Active Quests
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowCreateQuest(true)}
              className="rpg-border bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-200"
            >
              <FaPlus size={14} />
              <span>New Quest</span>
            </button>
            
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-background-light relative">
                <FaBell size={20} />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold relative">
                {character.name.charAt(0)}
                <div className="absolute -bottom-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {character.level}
                </div>
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{character.name}</p>
                <div className="flex items-center text-xs text-text-muted">
                  <FaTrophy className="mr-1 text-accent" size={10} />
                  <span>Level {character.level}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
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

export default Header
