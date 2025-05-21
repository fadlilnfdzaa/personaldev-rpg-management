import { useState } from 'react'
import { FaCalendarAlt, FaStar, FaBriefcase, FaCheck, FaTrash, FaTrophy, FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { useGameContext } from '@/lib/GameContext'

const QuestCard = ({ quest }) => {
  const { completeQuest, abandonQuest } = useGameContext()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  // Get the appropriate color for the quest type
  const getQuestTypeColor = () => {
    return quest.type === 'main' ? 'text-status-hp' : 'text-status-mp';
  }

  return (
    <div
      className={`quest-card ${quest.type} ${isExpanded ? 'shadow-glow-blue' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="sl-bracket top-left"></div>
      <div className="sl-bracket top-right"></div>
      <div className="sl-bracket bottom-left"></div>
      <div className="sl-bracket bottom-right"></div>

      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center">
            <h3 className="font-bold text-lg font-display">{quest.title}</h3>
            <div className="ml-3">
              {isExpanded ?
                <FaAngleUp className="text-text-muted" /> :
                <FaAngleDown className="text-text-muted" />
              }
            </div>
          </div>
          <div className="flex items-center space-x-3 mt-1 text-sm text-text-muted">
            <span className="flex items-center">
              <FaStar className="mr-1 text-status-xp" />
              <span className="font-mono">{quest.xp} XP</span>
            </span>
            <span className="flex items-center">
              <FaCalendarAlt className="mr-1 text-status-mp" />
              <span className="font-mono">{formatDate(quest.deadline)}</span>
            </span>
            <span className="flex items-center">
              <FaBriefcase className="mr-1 text-status-hp" />
              <span>{quest.job}</span>
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded text-xs font-medium font-display uppercase tracking-wider ${
            quest.type === 'main'
              ? 'bg-status-hp/10 text-status-hp'
              : 'bg-status-mp/10 text-status-mp'
          }`}>
            {quest.type === 'main' ? 'Main Quest' : 'Side Quest'}
          </span>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          <div className="bg-background-dark/50 p-3 rounded border border-primary/10">
            <p className="text-text-muted">{quest.description}</p>
          </div>

          {quest.completed ? (
            <div className="flex items-center justify-center p-2 bg-status-mp/10 rounded-md border border-status-mp/20">
              <FaTrophy className="text-status-mp mr-2" />
              <span className="text-text-glow font-display">Quest Completed!</span>
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
                className={`flex items-center space-x-1 px-3 py-1 rounded-md font-display ${
                  isCompleting
                    ? 'bg-status-mp/30 cursor-not-allowed'
                    : 'bg-status-mp/20 hover:bg-status-mp/30 border border-status-mp/30'
                } text-status-mp transition-all duration-200`}
              >
                <FaCheck size={14} className={isCompleting ? 'animate-spin' : ''} />
                <span>{isCompleting ? 'Completing...' : 'Complete'}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  abandonQuest(quest.id);
                }}
                className="flex items-center space-x-1 px-3 py-1 rounded-md bg-status-hp/10 hover:bg-status-hp/20 text-status-hp transition-all duration-200 border border-status-hp/30 font-display"
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
