'use client'

import { useState } from 'react'
import { FaTimes, FaScroll, FaCalendarAlt, FaStar, FaBriefcase } from 'react-icons/fa'

interface CreateQuestFormProps {
  onClose: () => void
  onCreateQuest: (quest: any) => void
}

const CreateQuestForm = ({ onClose, onCreateQuest }: CreateQuestFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'side',
    xp: 100,
    deadline: '',
    job: 'Professional'
  })

  const jobOptions = [
    'Professional',
    'Health',
    'Knowledge',
    'Social',
    'Creativity',
    'Finance'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create a new quest with a unique ID
    const newQuest = {
      ...formData,
      id: Date.now(),
      xp: Number(formData.xp)
    }
    
    onCreateQuest(newQuest)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-background-light rounded-lg w-full max-w-md relative rpg-border">
        <div className="pixel-corner top-left"></div>
        <div className="pixel-corner top-right"></div>
        <div className="pixel-corner bottom-left"></div>
        <div className="pixel-corner bottom-right"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-bright"
        >
          <FaTimes size={20} />
        </button>
        
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <FaScroll className="mr-2 text-primary" />
            New Quest
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">
                Quest Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full bg-background rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter quest title..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full bg-background rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Describe your quest..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1">
                  Quest Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-background rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="main">Main Quest</option>
                  <option value="side">Side Quest</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1 flex items-center">
                  <FaStar className="mr-1 text-accent" /> XP Reward
                </label>
                <input
                  type="number"
                  name="xp"
                  value={formData.xp}
                  onChange={handleChange}
                  min="10"
                  max="1000"
                  className="w-full bg-background rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1 flex items-center">
                  <FaCalendarAlt className="mr-1 text-primary" /> Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full bg-background rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1 flex items-center">
                  <FaBriefcase className="mr-1 text-secondary" /> Job Class
                </label>
                <select
                  name="job"
                  value={formData.job}
                  onChange={handleChange}
                  className="w-full bg-background rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {jobOptions.map(job => (
                    <option key={job} value={job}>{job}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-background hover:bg-background-light text-text-muted transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rpg-border bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-all duration-200"
              >
                Create Quest
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateQuestForm
