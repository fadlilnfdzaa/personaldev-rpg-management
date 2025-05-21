import { useGameContext } from '@/lib/GameContext'
import { FaBriefcase, FaPlus, FaChartLine, FaClipboardList } from 'react-icons/fa'

export default function Jobs() {
  const { jobs } = useGameContext()
  
  // Calculate progress percentages
  const jobsWithProgress = jobs.map(job => ({
    ...job,
    progressPercent: Math.floor((job.xp / job.nextLevelXp) * 100)
  }))

  const getColorClass = (name) => {
    const colorMap = {
      Professional: "bg-blue-500/20 text-blue-400",
      Health: "bg-green-500/20 text-green-400",
      Knowledge: "bg-purple-500/20 text-purple-400",
      Social: "bg-pink-500/20 text-pink-400",
      Creativity: "bg-orange-500/20 text-orange-400",
      Finance: "bg-yellow-500/20 text-yellow-400"
    }
    return colorMap[name] || "bg-primary/20 text-primary"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          <span className="text-primary highlight-text">Job</span> Classes
        </h1>
        <button className="rpg-border bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-200">
          <FaPlus size={14} />
          <span>New Job</span>
        </button>
      </div>

      <p className="text-text-muted">
        Jobs represent different areas of your life. Level them up by completing quests in each category.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobsWithProgress.map((job) => (
          <div key={job.name} className="bg-background-light rounded-lg overflow-hidden rpg-border">
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{job.name}</h2>
                <span className={`job-badge ${getColorClass(job.name)}`}>Lv.{job.level}</span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Experience</span>
                  <span>{job.xp}/{job.nextLevelXp} ({job.progressPercent}%)</span>
                </div>
                <div className="xp-bar">
                  <div className="xp-bar-fill" style={{ width: `${job.progressPercent}%` }}></div>
                </div>
              </div>
              
              <div className="flex justify-between">
                <div className="flex items-center text-sm text-text-muted">
                  <FaClipboardList className="mr-1" />
                  <span>0 Active Quests</span>
                </div>
                <div className="flex items-center text-sm text-text-muted">
                  <FaChartLine className="mr-1" />
                  <span>+{job.level > 1 ? job.level - 1 : 0} levels</span>
                </div>
              </div>
            </div>
            
            <div className="border-t border-background px-4 py-3 flex justify-between">
              <button className="text-primary hover:text-primary-light text-sm">View Quests</button>
              <button className="text-primary hover:text-primary-light text-sm">View Skills</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
