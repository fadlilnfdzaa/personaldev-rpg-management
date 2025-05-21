import React from 'react'

const StatCard = ({ name, value, icon }) => {
  // Determine which color to use based on the stat name
  const getBarColor = () => {
    switch(name.toLowerCase()) {
      case 'strength':
        return 'hp-bar-fill';
      case 'intelligence':
        return 'mp-bar-fill';
      case 'charisma':
        return 'xp-bar-fill';
      case 'discipline':
        return 'xp-bar-fill';
      default:
        return 'xp-bar-fill';
    }
  };

  return (
    <div className="status-window">
      <div className="sl-bracket top-left"></div>
      <div className="sl-bracket top-right"></div>
      <div className="sl-bracket bottom-left"></div>
      <div className="sl-bracket bottom-right"></div>

      <div className="flex items-center justify-between mb-3">
        <h3 className="text-text-muted font-display uppercase tracking-wider text-sm">{name}</h3>
        <div className="w-8 h-8 flex items-center justify-center">
          {icon}
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="stat-value">{value}</div>
        <div className="text-xs text-text-muted font-mono">MAX 100</div>
      </div>

      <div className="xp-bar">
        <div className={getBarColor()} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  )
}

export default StatCard
