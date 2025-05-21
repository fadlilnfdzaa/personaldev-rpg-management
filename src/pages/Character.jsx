import { useGameContext } from '@/lib/GameContext'
import { FaFire, FaStar, FaTrophy, FaCalendarAlt, FaBrain, FaHeart, FaHandshake, FaMoneyBillWave, FaChartLine } from 'react-icons/fa'

export default function Character() {
  const { character } = useGameContext()
  
  // Sample data for achievements
  const achievements = [
    { name: "Early Riser", description: "Wake up before 6 AM for 7 consecutive days", progress: 5, max: 7 },
    { name: "Bookworm", description: "Read 10 books this year", progress: 8, max: 10 },
    { name: "Fitness Enthusiast", description: "Exercise 20 days in a month", progress: 15, max: 20 },
    { name: "Project Master", description: "Complete 5 major projects", progress: 3, max: 5 }
  ]

  return (
    <div className="space-y-8">
      <section className="flex flex-col md:flex-row gap-8 items-start">
        <div className="bg-background-light rounded-lg p-6 rpg-border flex-shrink-0 w-full md:w-auto">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-bold mb-4">
              {character.name.charAt(0)}
            </div>
            <h1 className="text-2xl font-bold">{character.name}</h1>
            <p className="text-text-muted">Level {character.level}</p>
            
            <div className="w-full mt-6">
              <div className="flex justify-between text-sm mb-1">
                <span>XP: {character.xp} / {character.nextLevelXp}</span>
                <span>{Math.floor((character.xp / character.nextLevelXp) * 100)}%</span>
              </div>
              <div className="xp-bar">
                <div className="xp-bar-fill" style={{ width: `${(character.xp / character.nextLevelXp) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Character Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-background-light p-4 rounded-lg rpg-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-text-muted">Strength</h3>
                  <div className="w-8 h-8 flex items-center justify-center">
                    <FaFire className="text-red-500" />
                  </div>
                </div>
                <div className="stat-value">{character.stats.strength}</div>
                <div className="mt-2 xp-bar">
                  <div className="xp-bar-fill" style={{ width: `${character.stats.strength}%` }}></div>
                </div>
              </div>
              
              <div className="bg-background-light p-4 rounded-lg rpg-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-text-muted">Intelligence</h3>
                  <div className="w-8 h-8 flex items-center justify-center">
                    <FaBrain className="text-blue-500" />
                  </div>
                </div>
                <div className="stat-value">{character.stats.intelligence}</div>
                <div className="mt-2 xp-bar">
                  <div className="xp-bar-fill" style={{ width: `${character.stats.intelligence}%` }}></div>
                </div>
              </div>
              
              <div className="bg-background-light p-4 rounded-lg rpg-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-text-muted">Charisma</h3>
                  <div className="w-8 h-8 flex items-center justify-center">
                    <FaHandshake className="text-yellow-500" />
                  </div>
                </div>
                <div className="stat-value">{character.stats.charisma}</div>
                <div className="mt-2 xp-bar">
                  <div className="xp-bar-fill" style={{ width: `${character.stats.charisma}%` }}></div>
                </div>
              </div>
              
              <div className="bg-background-light p-4 rounded-lg rpg-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-text-muted">Discipline</h3>
                  <div className="w-8 h-8 flex items-center justify-center">
                    <FaCalendarAlt className="text-green-500" />
                  </div>
                </div>
                <div className="stat-value">{character.stats.discipline}</div>
                <div className="mt-2 xp-bar">
                  <div className="xp-bar-fill" style={{ width: `${character.stats.discipline}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <FaTrophy className="mr-2 text-accent" />
          Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div key={achievement.name} className="bg-background-light p-4 rounded-lg">
              <h3 className="font-medium">{achievement.name}</h3>
              <p className="text-sm text-text-muted mb-2">{achievement.description}</p>
              <div className="flex justify-between text-xs mb-1">
                <span>Progress</span>
                <span>{achievement.progress}/{achievement.max}</span>
              </div>
              <div className="xp-bar">
                <div 
                  className="xp-bar-fill bg-accent" 
                  style={{ width: `${(achievement.progress / achievement.max) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
