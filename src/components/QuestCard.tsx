'use client'

import { useState } from 'react'
import { FaCalendarAlt, FaStar, FaBriefcase, FaCheck, FaTrash, FaTrophy } from 'react-icons/fa'
import { useGameContext, Quest } from '@/lib/GameContext'

interface QuestCardProps {
  quest: Quest
}

const QuestCard = ({ quest }: QuestCardProps) => {
  const { completeQuest, abandonQuest } = useGameContext()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div
      className={`quest-card ${quest.type} ${isExpanded ? 'shadow-quest' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-lg">{quest.title}</h3>
          <div className="flex items-center space-x-3 mt-1 text-sm text-text-muted">
            <span className="flex items-center">
              <FaStar className="mr-1 text-accent" /> {quest.xp} XP
            </span>
            <span className="flex items-center">
              <FaCalendarAlt className="mr-1 text-primary" /> {formatDate(quest.deadline)}
            </span>
            <span className="flex items-center">
              <FaBriefcase className="mr-1 text-secondary" /> {quest.job}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            quest.type === 'main'
              ? 'bg-accent/20 text-accent'
              : 'bg-secondary/20 text-secondary'
          }`}>
            {quest.type === 'main' ? 'Main Quest' : 'Side Quest'}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          <p className="text-text-muted">{quest.description}</p>

          {quest.completed ? (
            <div className="flex items-center justify-center p-2 bg-primary/10 rounded-md">
              <FaTrophy className="text-accent mr-2" />
              <span className="text-text-bright">Quest Completed!</span>
            </div>
          ) : (
            <div className="flex justify-end space-x-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCompleting(true);
                  // Add a small delay to show the animation
                  setTimeout(() => {
                    completeQuest(quest.id);
                    setIsCompleting(false);
                  }, 500);
                }}
                disabled={isCompleting}
                className={`flex items-center space-x-1 px-3 py-1 rounded-md ${
                  isCompleting
                    ? 'bg-secondary/50 cursor-not-allowed'
                    : 'bg-secondary hover:bg-secondary-dark'
                } text-white transition-colors`}
              >
                <FaCheck size={14} className={isCompleting ? 'animate-spin' : ''} />
                <span>{isCompleting ? 'Completing...' : 'Complete'}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  abandonQuest(quest.id);
                }}
                className="flex items-center space-x-1 px-3 py-1 rounded-md bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
              >
                <FaTrash size={14} />
                <span>Abandon</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default QuestCard
