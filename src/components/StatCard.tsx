import React from 'react'

interface StatCardProps {
  name: string
  value: number
  icon: React.ReactNode
}

const StatCard = ({ name, value, icon }: StatCardProps) => {
  return (
    <div className="bg-background-light p-4 rounded-lg rpg-border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-text-muted">{name}</h3>
        <div className="w-8 h-8 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="stat-value">{value}</div>
      <div className="mt-2 xp-bar">
        <div className="xp-bar-fill" style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}

export default StatCard
