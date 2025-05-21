import { FaFilter, FaPlus } from 'react-icons/fa'
import QuestCard from '@/components/QuestCard'

export default function QuestsPage() {
  // Sample data
  const quests = [
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
    },
    {
      id: 4,
      title: "Family Dinner",
      description: "Organize and host a family dinner this weekend",
      type: "main",
      xp: 250,
      deadline: "2023-12-17",
      job: "Social"
    },
    {
      id: 5,
      title: "Read Business Book",
      description: "Finish reading 'The Lean Startup' and take notes",
      type: "side",
      xp: 150,
      deadline: "2023-12-25",
      job: "Knowledge"
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          <span className="text-primary highlight-text">Quests</span> Log
        </h1>
        <button className="rpg-border bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-200">
          <FaPlus size={14} />
          <span>New Quest</span>
        </button>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search quests..."
            className="w-full bg-background-light rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-background-light rounded-lg hover:bg-background">
            <FaFilter size={14} />
            <span>Filter</span>
          </button>
          <select className="bg-background-light rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="all">All Jobs</option>
            <option value="professional">Professional</option>
            <option value="health">Health</option>
            <option value="knowledge">Knowledge</option>
            <option value="social">Social</option>
          </select>
          <select className="bg-background-light rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="all">All Types</option>
            <option value="main">Main Quests</option>
            <option value="side">Side Quests</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Active Quests (5)</h2>
        <div className="space-y-4">
          {quests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      </div>
    </div>
  )
}
