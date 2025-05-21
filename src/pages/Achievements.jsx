import { useState } from 'react'
import { FaTrophy, FaLock, FaCheck, FaMedal, FaStar } from 'react-icons/fa'

export default function Achievements() {
  const [activeCategory, setActiveCategory] = useState('All')
  
  // Sample data
  const achievements = [
    {
      id: 1,
      name: "Early Riser",
      description: "Wake up before 6 AM for 7 consecutive days",
      progress: 5,
      max: 7,
      category: "Health",
      reward: "100 XP, +5 Discipline",
      completed: false
    },
    {
      id: 2,
      name: "Bookworm",
      description: "Read 10 books this year",
      progress: 8,
      max: 10,
      category: "Knowledge",
      reward: "300 XP, +10 Intelligence",
      completed: false
    },
    {
      id: 3,
      name: "Fitness Enthusiast",
      description: "Exercise 20 days in a month",
      progress: 15,
      max: 20,
      category: "Health",
      reward: "250 XP, +8 Strength",
      completed: false
    },
    {
      id: 4,
      name: "Project Master",
      description: "Complete 5 major projects",
      progress: 3,
      max: 5,
      category: "Professional",
      reward: "500 XP, +15 Professional Job Level",
      completed: false
    },
    {
      id: 5,
      name: "Social Butterfly",
      description: "Attend 10 social events",
      progress: 10,
      max: 10,
      category: "Social",
      reward: "200 XP, +10 Charisma",
      completed: true
    },
    {
      id: 6,
      name: "Meditation Guru",
      description: "Meditate for 30 days in a row",
      progress: 30,
      max: 30,
      category: "Health",
      reward: "350 XP, +12 Discipline",
      completed: true
    },
    {
      id: 7,
      name: "Financial Wizard",
      description: "Save 20% of income for 6 months",
      progress: 0,
      max: 6,
      category: "Finance",
      reward: "400 XP, +15 Finance Job Level",
      completed: false,
      locked: true
    },
    {
      id: 8,
      name: "Master Chef",
      description: "Cook 30 different healthy meals",
      progress: 0,
      max: 30,
      category: "Health",
      reward: "300 XP, +10 Health Job Level",
      completed: false,
      locked: true
    }
  ]

  // Get unique categories
  const categories = ['All', ...new Set(achievements.map(a => a.category))]
  
  // Filter achievements by category
  const filteredAchievements = activeCategory === 'All' 
    ? achievements 
    : achievements.filter(a => a.category === activeCategory)
  
  // Count completed achievements
  const completedCount = achievements.filter(a => a.completed).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          <span className="text-primary highlight-text">Achievements</span>
        </h1>
        <div className="text-text-muted">
          <span className="font-bold text-text-bright">{completedCount}</span> / {achievements.length} Completed
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button 
            key={category} 
            className={`px-4 py-2 rounded-full text-sm ${
              category === activeCategory 
                ? "bg-primary text-white" 
                : "bg-background-light hover:bg-background text-text-muted hover:text-text-bright"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAchievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`bg-background-light p-4 rounded-lg border-l-4 ${
              achievement.completed 
                ? "border-l-primary" 
                : achievement.locked 
                  ? "border-l-text-muted opacity-60" 
                  : "border-l-accent"
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold">{achievement.name}</h3>
                  {achievement.completed && <FaCheck className="text-primary" />}
                  {achievement.locked && <FaLock className="text-text-muted" />}
                </div>
                <p className="text-sm text-text-muted mt-1">{achievement.description}</p>
              </div>
              <span className="bg-background px-2 py-1 rounded text-xs">
                {achievement.category}
              </span>
            </div>

            {!achievement.locked && (
              <div className="mt-4">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{achievement.progress}/{achievement.max}</span>
                </div>
                <div className="xp-bar">
                  <div 
                    className={`xp-bar-fill ${achievement.completed ? "bg-primary" : "bg-accent"}`}
                    style={{ width: `${(achievement.progress / achievement.max) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center text-xs text-text-muted">
              <FaTrophy className="mr-1 text-accent" />
              <span>Reward: {achievement.reward}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
