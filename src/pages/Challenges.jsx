import { useState } from 'react'
import {
  FaCalendarCheck,
  FaFire,
  FaPlus,
  FaTrash,
  FaCheck,
  FaRedo,
  FaTrophy
} from 'react-icons/fa'
import { useGameContext } from '@/lib/GameContext'

// Challenge type definition
// In JavaScript we don't use TypeScript interfaces

export default function Challenges() {
  const { showToast } = useGameContext()
  const [activeTab, setActiveTab] = useState('daily')

  // Sample data
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: "Morning Exercise",
      description: "Complete 30 minutes of exercise in the morning",
      xp: 50,
      job: "Health",
      frequency: "daily",
      streak: 5,
      lastCompleted: "2023-12-09",
      completed: false
    },
    {
      id: 2,
      title: "Read for 20 minutes",
      description: "Read a book for at least 20 minutes",
      xp: 30,
      job: "Knowledge",
      frequency: "daily",
      streak: 12,
      lastCompleted: "2023-12-09",
      completed: false
    },
    {
      id: 3,
      title: "Meditate",
      description: "Meditate for 10 minutes",
      xp: 20,
      job: "Health",
      frequency: "daily",
      streak: 3,
      lastCompleted: "2023-12-09",
      completed: true
    },
    {
      id: 4,
      title: "Weekly Review",
      description: "Review your goals and progress for the week",
      xp: 100,
      job: "Professional",
      frequency: "weekly",
      streak: 2,
      lastCompleted: "2023-12-03",
      completed: false
    },
    {
      id: 5,
      title: "Deep Clean",
      description: "Deep clean one area of your home",
      xp: 80,
      job: "Social",
      frequency: "weekly",
      streak: 1,
      lastCompleted: "2023-12-03",
      completed: false
    }
  ])

  const filteredChallenges = challenges.filter(
    challenge => challenge.frequency === activeTab
  )

  const completeChallenge = (id) => {
    setChallenges(prev =>
      prev.map(challenge =>
        challenge.id === id
          ? {
              ...challenge,
              completed: true,
              streak: challenge.streak + 1,
              lastCompleted: new Date().toISOString().split('T')[0]
            }
          : challenge
      )
    )

    const challenge = challenges.find(c => c.id === id)
    if (challenge) {
      showToast(`Challenge completed: ${challenge.title}`, 'success')
    }
  }

  const resetChallenge = (id) => {
    setChallenges(prev =>
      prev.map(challenge =>
        challenge.id === id
          ? {
              ...challenge,
              completed: false
            }
          : challenge
      )
    )
  }

  const deleteChallenge = (id) => {
    setChallenges(prev => prev.filter(challenge => challenge.id !== id))
    showToast('Challenge deleted', 'warning')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          <span className="text-primary highlight-text">Daily</span> Challenges
        </h1>
        <button className="rpg-border bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-200">
          <FaPlus size={14} />
          <span>New Challenge</span>
        </button>
      </div>

      <p className="text-text-muted">
        Recurring challenges to build habits and gain consistent XP. Maintain streaks for bonus rewards!
      </p>

      <div className="flex space-x-4 border-b border-background-light">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'daily'
              ? 'text-primary border-b-2 border-primary'
              : 'text-text-muted hover:text-text-bright'
          }`}
          onClick={() => setActiveTab('daily')}
        >
          Daily Challenges
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === 'weekly'
              ? 'text-primary border-b-2 border-primary'
              : 'text-text-muted hover:text-text-bright'
          }`}
          onClick={() => setActiveTab('weekly')}
        >
          Weekly Challenges
        </button>
      </div>

      <div className="space-y-4">
        {filteredChallenges.length === 0 ? (
          <div className="bg-background-light p-8 rounded-lg text-center">
            <FaCalendarCheck className="mx-auto text-text-muted mb-4" size={40} />
            <h3 className="text-xl font-medium mb-2">No {activeTab} challenges yet</h3>
            <p className="text-text-muted mb-4">Create recurring challenges to build habits and earn consistent XP</p>
            <button className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md inline-flex items-center space-x-2 transition-all duration-200">
              <FaPlus size={14} />
              <span>Create Your First Challenge</span>
            </button>
          </div>
        ) : (
          filteredChallenges.map(challenge => (
            <div
              key={challenge.id}
              className={`bg-background-light p-4 rounded-lg border-l-4 ${
                challenge.completed ? 'border-l-primary' : 'border-l-accent'
              } relative rpg-border`}
            >
              <div className="pixel-corner top-left"></div>
              <div className="pixel-corner top-right"></div>
              <div className="pixel-corner bottom-left"></div>
              <div className="pixel-corner bottom-right"></div>

              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-bold text-lg">{challenge.title}</h3>
                    {challenge.streak > 0 && (
                      <div className="ml-3 px-2 py-1 bg-accent/20 text-accent rounded-full text-xs flex items-center">
                        <FaFire className="mr-1" />
                        <span>Streak: {challenge.streak}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-text-muted mt-1">{challenge.description}</p>
                </div>

                <div className="flex space-x-2">
                  {challenge.completed ? (
                    <button
                      onClick={() => resetChallenge(challenge.id)}
                      className="p-2 rounded-full bg-background hover:bg-background-dark text-text-muted"
                      title="Reset Challenge"
                    >
                      <FaRedo size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => completeChallenge(challenge.id)}
                      className="p-2 rounded-full bg-secondary/20 hover:bg-secondary/30 text-secondary"
                      title="Complete Challenge"
                    >
                      <FaCheck size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteChallenge(challenge.id)}
                    className="p-2 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-400"
                    title="Delete Challenge"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-3 text-sm text-text-muted">
                  <span className="flex items-center">
                    <FaTrophy className="mr-1 text-accent" /> {challenge.xp} XP
                  </span>
                  <span className="px-2 py-1 bg-background rounded text-xs">
                    {challenge.job}
                  </span>
                </div>

                {challenge.lastCompleted && (
                  <span className="text-xs text-text-muted">
                    Last completed: {new Date(challenge.lastCompleted).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
