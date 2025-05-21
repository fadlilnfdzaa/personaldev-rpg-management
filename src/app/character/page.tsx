import { 
  FaFire, 
  FaStar, 
  FaTrophy, 
  FaCalendarAlt, 
  FaBrain, 
  FaHeart, 
  FaHandshake, 
  FaMoneyBillWave,
  FaChartLine
} from 'react-icons/fa'
import StatCard from '@/components/StatCard'

export default function CharacterPage() {
  // Sample data
  const primaryStats = [
    { name: "Strength", value: 65, icon: <FaFire className="text-red-500" /> },
    { name: "Intelligence", value: 82, icon: <FaBrain className="text-blue-500" /> },
    { name: "Charisma", value: 70, icon: <FaHandshake className="text-yellow-500" /> },
    { name: "Discipline", value: 75, icon: <FaCalendarAlt className="text-green-500" /> }
  ]

  const secondaryStats = [
    { name: "Health", value: 78, icon: <FaHeart className="text-red-500" /> },
    { name: "Wealth", value: 60, icon: <FaMoneyBillWave className="text-yellow-500" /> },
    { name: "Knowledge", value: 85, icon: <FaStar className="text-blue-500" /> },
    { name: "Growth", value: 72, icon: <FaChartLine className="text-green-500" /> }
  ]

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
              A
            </div>
            <h1 className="text-2xl font-bold">Adventurer</h1>
            <p className="text-text-muted">Wizard Lv.42</p>
            
            <div className="w-full mt-6">
              <div className="flex justify-between text-sm mb-1">
                <span>XP: 8,450 / 10,000</span>
                <span>85%</span>
              </div>
              <div className="xp-bar">
                <div className="xp-bar-fill" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div className="mt-6 w-full">
              <h3 className="font-medium mb-2">Active Jobs</h3>
              <div className="space-y-2">
                <div className="job-badge bg-blue-500/20 text-blue-400">Professional Lv.28</div>
                <div className="job-badge bg-green-500/20 text-green-400">Health Guru Lv.15</div>
                <div className="job-badge bg-purple-500/20 text-purple-400">Scholar Lv.22</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Primary Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {primaryStats.map((stat) => (
                <StatCard key={stat.name} name={stat.name} value={stat.value} icon={stat.icon} />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Secondary Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {secondaryStats.map((stat) => (
                <StatCard key={stat.name} name={stat.name} value={stat.value} icon={stat.icon} />
              ))}
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
