import { useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'

const LevelUpAnimation = ({ level, onAnimationComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationComplete()
    }, 2500)

    return () => clearTimeout(timer)
  }, [onAnimationComplete])

  return (
    <div className="level-up-animation">
      <div className="level-up-content">
        <div className="sl-bracket top-left"></div>
        <div className="sl-bracket top-right"></div>
        <div className="sl-bracket bottom-left"></div>
        <div className="sl-bracket bottom-right"></div>

        <div className="flex justify-center mb-6">
          <div className="relative">
            <FaArrowUp
              className="text-secondary animate-pulse-slow"
              size={40}
            />
            <div className="absolute inset-0 blur-sm text-secondary animate-pulse-slow">
              <FaArrowUp size={40} />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold font-display text-text-glow mb-4 tracking-wider">LEVEL UP</h2>

        <div className="relative mb-6">
          <div className="text-7xl font-bold font-display text-text-glow">{level}</div>
          <div className="absolute inset-0 blur-sm text-text-glow opacity-70">
            <div className="text-7xl font-bold font-display">{level}</div>
          </div>
        </div>

        <div className="text-sm font-display text-text-bright uppercase tracking-widest">
          Your skills have improved
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-left">
          <div>
            <div className="text-xs text-text-muted mb-1">Strength</div>
            <div className="flex items-center">
              <div className="w-full bg-background-dark h-1 mr-2">
                <div className="bg-status-hp h-1" style={{ width: '70%' }}></div>
              </div>
              <span className="text-xs text-status-hp">+2</span>
            </div>
          </div>

          <div>
            <div className="text-xs text-text-muted mb-1">Intelligence</div>
            <div className="flex items-center">
              <div className="w-full bg-background-dark h-1 mr-2">
                <div className="bg-status-mp h-1" style={{ width: '85%' }}></div>
              </div>
              <span className="text-xs text-status-mp">+2</span>
            </div>
          </div>

          <div>
            <div className="text-xs text-text-muted mb-1">Charisma</div>
            <div className="flex items-center">
              <div className="w-full bg-background-dark h-1 mr-2">
                <div className="bg-status-xp h-1" style={{ width: '60%' }}></div>
              </div>
              <span className="text-xs text-status-xp">+2</span>
            </div>
          </div>

          <div>
            <div className="text-xs text-text-muted mb-1">Discipline</div>
            <div className="flex items-center">
              <div className="w-full bg-background-dark h-1 mr-2">
                <div className="bg-secondary h-1" style={{ width: '75%' }}></div>
              </div>
              <span className="text-xs text-secondary">+2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LevelUpAnimation
