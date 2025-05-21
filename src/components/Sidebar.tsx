'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FaHome,
  FaScroll,
  FaUser,
  FaBriefcase,
  FaTrophy,
  FaCog,
  FaBars,
  FaTimes,
  FaCalendarCheck
} from 'react-icons/fa'
import { useGameContext } from '@/lib/GameContext'

const Sidebar = () => {
  const { character } = useGameContext()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Calculate XP percentage
  const xpPercentage = Math.floor((character.xp / character.nextLevelXp) * 100)

  const menuItems = [
    { name: 'Dashboard', icon: <FaHome size={20} />, path: '/' },
    { name: 'Quests', icon: <FaScroll size={20} />, path: '/quests' },
    { name: 'Daily Challenges', icon: <FaCalendarCheck size={20} />, path: '/challenges' },
    { name: 'Character', icon: <FaUser size={20} />, path: '/character' },
    { name: 'Jobs', icon: <FaBriefcase size={20} />, path: '/jobs' },
    { name: 'Achievements', icon: <FaTrophy size={20} />, path: '/achievements' },
    { name: 'Settings', icon: <FaCog size={20} />, path: '/settings' },
  ]

  return (
    <aside
      className={`bg-background-dark transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } h-screen flex flex-col border-r border-primary/30`}
    >
      <div className="flex items-center justify-between p-4 border-b border-primary/30">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-primary">
            <span className="highlight-text">Dunya</span>Quest
          </h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-md hover:bg-background-light"
        >
          {isCollapsed ? <FaBars size={20} /> : <FaTimes size={20} />}
        </button>
      </div>

      <div className="flex-1 py-6 overflow-y-auto">
        <nav className="px-2 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`menu-item ${pathname === item.path ? 'active' : ''}`}
            >
              <span>{item.icon}</span>
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-primary/30">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="level-badge">{character.level}</div>
            <div className="w-full">
              <div className="flex justify-between text-xs mb-1">
                <p className="text-text-muted">Level {character.level}</p>
                <p className="text-text-muted">{character.xp}/{character.nextLevelXp} XP</p>
              </div>
              <div className="xp-bar">
                <div
                  className="xp-bar-fill"
                  style={{ width: `${xpPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}
        {isCollapsed && <div className="level-badge mx-auto">{character.level}</div>}
      </div>
    </aside>
  )
}

export default Sidebar
