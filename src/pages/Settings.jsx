import { useState } from 'react'
import { FaCog, FaUser, FaBell, FaPalette, FaShieldAlt, FaDatabase, FaSave, FaFileImport, FaFileExport } from 'react-icons/fa'
import { useGameContext } from '@/lib/GameContext'
import CSVImport from '@/components/CSVImport'
import { downloadCSV } from '@/lib/csvUtils'

export default function Settings() {
  const { character, quests, jobs, importDataFromCSV } = useGameContext()
  const [activeTab, setActiveTab] = useState('data')
  const [formData, setFormData] = useState({
    name: character.name,
    email: 'adventurer@example.com',
    bio: 'A brave adventurer on a quest to level up in life.',
    primaryJob: 'Professional'
  })

  const tabs = [
    { id: 'profile', name: 'Profile', icon: <FaUser /> },
    { id: 'appearance', name: 'Appearance', icon: <FaPalette /> },
    { id: 'notifications', name: 'Notifications', icon: <FaBell /> },
    { id: 'privacy', name: 'Privacy', icon: <FaShieldAlt /> },
    { id: 'data', name: 'Data Management', icon: <FaDatabase /> },
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
    // Save settings logic would go here
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">
        <span className="text-primary highlight-text">Settings</span>
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 bg-background-light rounded-lg p-4">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`w-full text-left menu-item ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 bg-background-light rounded-lg p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Profile Settings</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-background rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-background rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full bg-background rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Primary Job Class
                  </label>
                  <select
                    name="primaryJob"
                    value={formData.primaryJob}
                    onChange={handleChange}
                    className="w-full bg-background rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Professional">Professional</option>
                    <option value="Health">Health</option>
                    <option value="Knowledge">Knowledge</option>
                    <option value="Social">Social</option>
                    <option value="Creativity">Creativity</option>
                    <option value="Finance">Finance</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="rpg-border bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-200"
                  >
                    <FaSave size={14} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Appearance Settings</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Theme
                  </label>
                  <div className="flex space-x-4">
                    <button className="w-12 h-12 bg-background-dark rounded-lg border-2 border-primary"></button>
                    <button className="w-12 h-12 bg-slate-100 rounded-lg"></button>
                    <button className="w-12 h-12 bg-emerald-900 rounded-lg"></button>
                    <button className="w-12 h-12 bg-purple-900 rounded-lg"></button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Accent Color
                  </label>
                  <div className="flex space-x-4">
                    <button className="w-8 h-8 bg-primary rounded-full border-2 border-white"></button>
                    <button className="w-8 h-8 bg-green-500 rounded-full"></button>
                    <button className="w-8 h-8 bg-purple-500 rounded-full"></button>
                    <button className="w-8 h-8 bg-pink-500 rounded-full"></button>
                    <button className="w-8 h-8 bg-amber-500 rounded-full"></button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-text-muted">
                    Enable Animations
                  </label>
                  <div className="relative inline-block w-12 h-6 rounded-full bg-background">
                    <input type="checkbox" className="sr-only" defaultChecked />
                    <div className="block w-12 h-6 rounded-full bg-primary"></div>
                    <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform translate-x-6"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Notification Settings</h2>
              <p className="text-text-muted">Configure how and when you receive notifications.</p>

              {/* Notification settings content would go here */}
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Privacy Settings</h2>
              <p className="text-text-muted">Manage your privacy preferences.</p>

              {/* Privacy settings content would go here */}
            </div>
          )}

          {activeTab === 'data' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Data Management</h2>
              <p className="text-text-muted">Import or export your data.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-primary">Import Data</h3>

                  {/* Quest Import */}
                  <CSVImport
                    onImport={importDataFromCSV}
                    dataType="quests"
                    schema={{
                      title: { type: 'string', required: true },
                      description: { type: 'string', required: true },
                      type: { type: 'string', required: true },
                      xp: { type: 'number', required: true },
                      job: { type: 'string', required: true },
                      deadline: { type: 'date', required: false }
                    }}
                  />

                  {/* Character Import */}
                  <CSVImport
                    onImport={importDataFromCSV}
                    dataType="character"
                    schema={{
                      name: { type: 'string', required: true },
                      level: { type: 'number', required: false },
                      xp: { type: 'number', required: false },
                      nextLevelXp: { type: 'number', required: false },
                      strength: { type: 'number', required: false },
                      intelligence: { type: 'number', required: false },
                      charisma: { type: 'number', required: false },
                      discipline: { type: 'number', required: false }
                    }}
                  />

                  {/* Jobs Import */}
                  <CSVImport
                    onImport={importDataFromCSV}
                    dataType="jobs"
                    schema={{
                      name: { type: 'string', required: true },
                      level: { type: 'number', required: true },
                      xp: { type: 'number', required: true },
                      nextLevelXp: { type: 'number', required: true }
                    }}
                  />
                </div>

                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-primary">Export Data</h3>

                  <div className="status-window">
                    <h3 className="status-window-title mb-4">Export Options</h3>
                    <p className="mb-4 text-sm text-text-muted">
                      Download your data in CSV format for backup or to use in other applications.
                    </p>

                    <div className="space-y-3">
                      <button
                        className="w-full flex items-center justify-between p-3 bg-background-dark rounded-md hover:bg-background transition-colors"
                        onClick={() => downloadCSV(quests, 'dunyaquest-quests.csv')}
                      >
                        <span className="font-medium">Export Quests</span>
                        <FaFileExport />
                      </button>

                      <button
                        className="w-full flex items-center justify-between p-3 bg-background-dark rounded-md hover:bg-background transition-colors"
                        onClick={() => {
                          // Format character data for CSV
                          const charData = [{
                            name: character.name,
                            level: character.level,
                            xp: character.xp,
                            nextLevelXp: character.nextLevelXp,
                            strength: character.stats.strength,
                            intelligence: character.stats.intelligence,
                            charisma: character.stats.charisma,
                            discipline: character.stats.discipline
                          }];
                          downloadCSV(charData, 'dunyaquest-character.csv');
                        }}
                      >
                        <span className="font-medium">Export Character</span>
                        <FaFileExport />
                      </button>

                      <button
                        className="w-full flex items-center justify-between p-3 bg-background-dark rounded-md hover:bg-background transition-colors"
                        onClick={() => downloadCSV(jobs, 'dunyaquest-jobs.csv')}
                      >
                        <span className="font-medium">Export Jobs</span>
                        <FaFileExport />
                      </button>

                      <button
                        className="w-full flex items-center justify-between p-3 bg-background-dark rounded-md hover:bg-background transition-colors"
                        onClick={() => {
                          // Export all data as a zip file
                          downloadCSV(quests, 'dunyaquest-quests.csv');

                          // Format character data for CSV
                          const charData = [{
                            name: character.name,
                            level: character.level,
                            xp: character.xp,
                            nextLevelXp: character.nextLevelXp,
                            strength: character.stats.strength,
                            intelligence: character.stats.intelligence,
                            charisma: character.stats.charisma,
                            discipline: character.stats.discipline
                          }];
                          downloadCSV(charData, 'dunyaquest-character.csv');

                          downloadCSV(jobs, 'dunyaquest-jobs.csv');
                        }}
                      >
                        <span className="font-medium">Export All Data</span>
                        <FaFileExport />
                      </button>
                    </div>
                  </div>

                  <div className="status-window">
                    <h3 className="status-window-title mb-4">CSV Templates</h3>
                    <p className="mb-4 text-sm text-text-muted">
                      Download template CSV files to help you format your data correctly.
                    </p>

                    <div className="space-y-3">
                      <a
                        href="/templates/quests-template.csv"
                        download
                        className="w-full flex items-center justify-between p-3 bg-background-dark rounded-md hover:bg-background transition-colors"
                      >
                        <span className="font-medium">Quest Template</span>
                        <FaFileExport />
                      </a>

                      <a
                        href="/templates/character-template.csv"
                        download
                        className="w-full flex items-center justify-between p-3 bg-background-dark rounded-md hover:bg-background transition-colors"
                      >
                        <span className="font-medium">Character Template</span>
                        <FaFileExport />
                      </a>

                      <a
                        href="/templates/jobs-template.csv"
                        download
                        className="w-full flex items-center justify-between p-3 bg-background-dark rounded-md hover:bg-background transition-colors"
                      >
                        <span className="font-medium">Jobs Template</span>
                        <FaFileExport />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
