import { useState } from 'react'
import { FaTimes, FaScroll, FaCalendarAlt, FaStar, FaBriefcase, FaPlus } from 'react-icons/fa'

const CreateQuestForm = ({ onClose, onCreateQuest }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
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
    <div className="fixed inset-0 bg-background-dark/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="status-window w-full max-w-md relative">
        <div className="sl-bracket top-left"></div>
        <div className="sl-bracket top-right"></div>
        <div className="sl-bracket bottom-left"></div>
        <div className="sl-bracket bottom-right"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-muted hover:text-text-bright"
        >
          <FaTimes size={20} />
        </button>

        <div className="p-6">
          <h2 className="status-window-title flex items-center">
            <FaScroll className="mr-2 text-status-mp" />
            Create New Quest
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium font-display text-text-muted mb-1 uppercase tracking-wider">
                Quest Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full bg-background-dark border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-secondary focus:shadow-glow-blue text-text-bright"
                placeholder="Enter quest title..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium font-display text-text-muted mb-1 uppercase tracking-wider">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full bg-background-dark border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-secondary focus:shadow-glow-blue text-text-bright"
                placeholder="Describe your quest..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium font-display text-text-muted mb-1 uppercase tracking-wider">
                  Quest Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full bg-background-dark border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-secondary focus:shadow-glow-blue text-text-bright"
                >
                  <option value="main">Main Quest</option>
                  <option value="side">Side Quest</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium font-display text-text-muted mb-1 uppercase tracking-wider flex items-center">
                  <FaStar className="mr-1 text-status-xp" /> XP Reward
                </label>
                <input
                  type="number"
                  name="xp"
                  value={formData.xp}
                  onChange={handleChange}
                  min="10"
                  max="1000"
                  className="w-full bg-background-dark border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-secondary focus:shadow-glow-blue text-text-bright font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium font-display text-text-muted mb-1 uppercase tracking-wider flex items-center">
                  <FaCalendarAlt className="mr-1 text-status-mp" /> Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full bg-background-dark border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-secondary focus:shadow-glow-blue text-text-bright font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium font-display text-text-muted mb-1 uppercase tracking-wider flex items-center">
                  <FaBriefcase className="mr-1 text-status-hp" /> Job Class
                </label>
                <select
                  name="job"
                  value={formData.job}
                  onChange={handleChange}
                  className="w-full bg-background-dark border border-primary/20 rounded-md px-4 py-2 focus:outline-none focus:border-secondary focus:shadow-glow-blue text-text-bright"
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
                className="px-4 py-2 rounded-md bg-background-dark border border-primary/20 text-text-muted hover:text-text-bright hover:border-primary/40 transition-all duration-200 font-display"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-status-mp/20 border border-status-mp/40 text-status-mp hover:bg-status-mp/30 transition-all duration-200 flex items-center space-x-2 font-display"
              >
                <FaPlus size={14} />
                <span>Create Quest</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateQuestForm
