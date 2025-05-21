'use client'

import { useState } from 'react'
import { FaCog, FaUser, FaBell, FaPalette, FaShieldAlt, FaDatabase, FaSave } from 'react-icons/fa'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', name: 'Profile', icon: <FaUser /> },
    { id: 'appearance', name: 'Appearance', icon: <FaPalette /> },
    { id: 'notifications', name: 'Notifications', icon: <FaBell /> },
    { id: 'privacy', name: 'Privacy', icon: <FaShieldAlt /> },
    { id: 'data', name: 'Data Management', icon: <FaDatabase /> },
  ]

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
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-background rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue="Adventurer"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-background rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    defaultValue="adventurer@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Bio
                  </label>
                  <textarea
                    className="w-full bg-background rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    rows={4}
                    defaultValue="A brave adventurer on a quest to level up in life."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-1">
                    Primary Job Class
                  </label>
                  <select className="w-full bg-background rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="professional">Professional</option>
                    <option value="health">Health</option>
                    <option value="knowledge">Knowledge</option>
                    <option value="social">Social</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button className="rpg-border bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-200">
                  <FaSave size={14} />
                  <span>Save Changes</span>
                </button>
              </div>
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
              
              <div className="flex justify-end">
                <button className="rpg-border bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-200">
                  <FaSave size={14} />
                  <span>Save Changes</span>
                </button>
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
              <p className="text-text-muted">Export or delete your data.</p>
              
              {/* Data management content would go here */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
