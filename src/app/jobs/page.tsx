import { FaBriefcase, FaPlus, FaChartLine, FaClipboardList } from 'react-icons/fa'

export default function JobsPage() {
  // Sample data
  const jobs = [
    {
      name: "Professional",
      level: 28,
      progress: 65,
      description: "Career-related activities and skills",
      skills: ["Project Management", "Communication", "Leadership", "Technical Expertise"],
      activeQuests: 2,
      color: "blue"
    },
    {
      name: "Health",
      level: 15,
      progress: 40,
      description: "Physical and mental wellbeing",
      skills: ["Fitness", "Nutrition", "Sleep", "Mindfulness"],
      activeQuests: 1,
      color: "green"
    },
    {
      name: "Knowledge",
      level: 22,
      progress: 80,
      description: "Learning and intellectual growth",
      skills: ["Reading", "Courses", "Research", "Practice"],
      activeQuests: 2,
      color: "purple"
    },
    {
      name: "Social",
      level: 18,
      progress: 30,
      description: "Relationships and social connections",
      skills: ["Networking", "Family Time", "Friendship", "Community"],
      activeQuests: 1,
      color: "pink"
    },
    {
      name: "Creativity",
      level: 12,
      progress: 55,
      description: "Artistic and creative pursuits",
      skills: ["Writing", "Design", "Music", "Crafts"],
      activeQuests: 0,
      color: "orange"
    },
    {
      name: "Finance",
      level: 20,
      progress: 45,
      description: "Financial management and growth",
      skills: ["Budgeting", "Investing", "Saving", "Planning"],
      activeQuests: 0,
      color: "yellow"
    }
  ]

  const getColorClass = (color: string) => {
    const colorMap: {[key: string]: string} = {
      blue: "bg-blue-500/20 text-blue-400",
      green: "bg-green-500/20 text-green-400",
      purple: "bg-purple-500/20 text-purple-400",
      pink: "bg-pink-500/20 text-pink-400",
      orange: "bg-orange-500/20 text-orange-400",
      yellow: "bg-yellow-500/20 text-yellow-400"
    }
    return colorMap[color] || "bg-primary/20 text-primary"
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
        {jobs.map((job) => (
          <div key={job.name} className="bg-background-light rounded-lg overflow-hidden rpg-border">
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{job.name}</h2>
                <span className={`job-badge ${getColorClass(job.color)}`}>Lv.{job.level}</span>
              </div>
              <p className="text-text-muted text-sm mb-4">{job.description}</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Experience</span>
                  <span>{job.progress}%</span>
                </div>
                <div className="xp-bar">
                  <div className="xp-bar-fill" style={{ width: `${job.progress}%` }}></div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill) => (
                  <span key={skill} className="text-xs px-2 py-1 bg-background rounded">
                    {skill}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between">
                <div className="flex items-center text-sm text-text-muted">
                  <FaClipboardList className="mr-1" />
                  <span>{job.activeQuests} Active Quests</span>
                </div>
                <div className="flex items-center text-sm text-text-muted">
                  <FaChartLine className="mr-1" />
                  <span>+3 levels this month</span>
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
