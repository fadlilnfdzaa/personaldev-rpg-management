import { createContext, useContext, useState, useEffect } from 'react'
import RpgToast from '@/components/RpgToast'
import LevelUpAnimation from '@/components/LevelUpAnimation'

// Define types
export const GameContext = createContext()

export const useGameContext = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider')
  }
  return context
}

export const GameProvider = ({ children }) => {
  // Character state
  const [character, setCharacter] = useState({
    name: 'Adventurer',
    level: 1,
    xp: 0,
    nextLevelXp: 1000,
    stats: {
      strength: 10,
      intelligence: 10,
      charisma: 10,
      discipline: 10
    }
  })

  // Quests state
  const [quests, setQuests] = useState([
    {
      id: 1,
      title: "Complete Project Presentation",
      description: "Prepare and deliver the quarterly project presentation to stakeholders",
      type: "main",
      xp: 500,
      deadline: "2023-12-15",
      job: "Professional"
    },
    {
      id: 2,
      title: "Morning Workout Routine",
      description: "Complete 30 minutes of exercise including cardio and strength training",
      type: "side",
      xp: 100,
      deadline: "2023-12-10",
      job: "Health"
    },
    {
      id: 3,
      title: "Learn New Programming Language",
      description: "Complete the introductory course for Python programming",
      type: "side",
      xp: 300,
      deadline: "2023-12-20",
      job: "Knowledge"
    }
  ])

  // Jobs state
  const [jobs, setJobs] = useState([
    { name: "Professional", level: 1, xp: 0, nextLevelXp: 1000 },
    { name: "Health", level: 1, xp: 0, nextLevelXp: 1000 },
    { name: "Knowledge", level: 1, xp: 0, nextLevelXp: 1000 },
    { name: "Social", level: 1, xp: 0, nextLevelXp: 1000 },
    { name: "Creativity", level: 1, xp: 0, nextLevelXp: 1000 },
    { name: "Finance", level: 1, xp: 0, nextLevelXp: 1000 }
  ])

  // Toast notifications
  const [toasts, setToasts] = useState([])

  // Level up animation
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [newLevel, setNewLevel] = useState(1)

  // Add a new quest
  const addQuest = (quest) => {
    const newQuest = {
      ...quest,
      id: Date.now(),
      completed: false
    }
    setQuests(prev => [...prev, newQuest])
    showToast(`New quest added: ${quest.title}`, 'info')
  }

  // Complete a quest
  const completeQuest = (questId) => {
    const quest = quests.find(q => q.id === questId)
    if (!quest) return

    // Mark quest as completed
    setQuests(prev => prev.map(q =>
      q.id === questId ? { ...q, completed: true } : q
    ))

    // Add XP to character
    addXpToCharacter(quest.xp)

    // Add XP to job
    addXpToJob(quest.job, quest.xp)

    showToast(`Quest completed: ${quest.title}`, 'success')
  }

  // Abandon a quest
  const abandonQuest = (questId) => {
    const quest = quests.find(q => q.id === questId)
    if (!quest) return

    setQuests(prev => prev.filter(q => q.id !== questId))
    showToast(`Quest abandoned: ${quest.title}`, 'warning')
  }

  // Add XP to character
  const addXpToCharacter = (xp) => {
    setCharacter(prev => {
      const newXp = prev.xp + xp

      // Check if character leveled up
      if (newXp >= prev.nextLevelXp) {
        const newLevel = prev.level + 1
        setShowLevelUp(true)
        setNewLevel(newLevel)

        return {
          ...prev,
          level: newLevel,
          xp: newXp - prev.nextLevelXp,
          nextLevelXp: Math.floor(prev.nextLevelXp * 1.5),
          stats: {
            strength: prev.stats.strength + 2,
            intelligence: prev.stats.intelligence + 2,
            charisma: prev.stats.charisma + 2,
            discipline: prev.stats.discipline + 2
          }
        }
      }

      return {
        ...prev,
        xp: newXp
      }
    })
  }

  // Add XP to job
  const addXpToJob = (jobName, xp) => {
    setJobs(prev => prev.map(job => {
      if (job.name === jobName) {
        const newXp = job.xp + xp

        // Check if job leveled up
        if (newXp >= job.nextLevelXp) {
          showToast(`${jobName} job leveled up to ${job.level + 1}!`, 'success')

          return {
            ...job,
            level: job.level + 1,
            xp: newXp - job.nextLevelXp,
            nextLevelXp: Math.floor(job.nextLevelXp * 1.4)
          }
        }

        return {
          ...job,
          xp: newXp
        }
      }
      return job
    }))
  }

  // Show toast notification
  const showToast = (message, type = 'info') => {
    const newToast = {
      id: Date.now(),
      message,
      type
    }
    setToasts(prev => [...prev, newToast])
  }

  // Remove toast
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  // Import data from CSV
  const importDataFromCSV = (data, dataType) => {
    if (!data || data.length === 0) {
      showToast('No data to import', 'warning')
      return
    }

    try {
      switch (dataType) {
        case 'quests':
          importQuests(data)
          break
        case 'character':
          importCharacter(data)
          break
        case 'jobs':
          importJobs(data)
          break
        default:
          showToast(`Unknown data type: ${dataType}`, 'error')
      }
    } catch (error) {
      showToast(`Error importing data: ${error.message}`, 'error')
    }
  }

  // Import quests from CSV data
  const importQuests = (data) => {
    // Validate required fields
    const requiredFields = ['title', 'description', 'type', 'xp', 'job']
    const missingFields = requiredFields.filter(field =>
      !data.some(item => field in item && item[field])
    )

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
    }

    // Process and add each quest
    const newQuests = data.map(item => ({
      id: Date.now() + Math.floor(Math.random() * 1000), // Generate unique ID
      title: item.title,
      description: item.description,
      type: item.type.toLowerCase() === 'main' ? 'main' : 'side',
      xp: Number(item.xp),
      deadline: item.deadline || '',
      job: item.job,
      completed: false
    }))

    setQuests(prev => [...prev, ...newQuests])
    showToast(`Successfully imported ${newQuests.length} quests`, 'success')
  }

  // Import character data from CSV
  const importCharacter = (data) => {
    if (data.length === 0) {
      throw new Error('No character data found')
    }

    // Take the first row as character data
    const charData = data[0]

    // Validate required fields
    if (!charData.name) {
      throw new Error('Character name is required')
    }

    const newCharacter = {
      name: charData.name,
      level: Number(charData.level) || 1,
      xp: Number(charData.xp) || 0,
      nextLevelXp: Number(charData.nextLevelXp) || 1000,
      stats: {
        strength: Number(charData.strength) || 10,
        intelligence: Number(charData.intelligence) || 10,
        charisma: Number(charData.charisma) || 10,
        discipline: Number(charData.discipline) || 10
      }
    }

    setCharacter(newCharacter)
    showToast(`Character data imported for ${newCharacter.name}`, 'success')
  }

  // Import jobs data from CSV
  const importJobs = (data) => {
    // Validate required fields
    const requiredFields = ['name', 'level', 'xp', 'nextLevelXp']
    const missingFields = requiredFields.filter(field =>
      !data.some(item => field in item && item[field])
    )

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`)
    }

    // Process job data
    const newJobs = data.map(item => ({
      name: item.name,
      level: Number(item.level) || 1,
      xp: Number(item.xp) || 0,
      nextLevelXp: Number(item.nextLevelXp) || 1000
    }))

    setJobs(newJobs)
    showToast(`Successfully imported ${newJobs.length} jobs`, 'success')
  }

  return (
    <GameContext.Provider value={{
      character,
      quests,
      jobs,
      addQuest,
      completeQuest,
      abandonQuest,
      importDataFromCSV,
      showToast
    }}>
      {children}

      {/* Toast notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-4">
        {toasts.map(toast => (
          <RpgToast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Level up animation */}
      {showLevelUp && (
        <LevelUpAnimation
          level={newLevel}
          onAnimationComplete={() => setShowLevelUp(false)}
        />
      )}
    </GameContext.Provider>
  )
}
