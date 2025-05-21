'use client'

import { useEffect } from 'react'
import { FaStar } from 'react-icons/fa'

interface LevelUpAnimationProps {
  level: number
  onAnimationComplete: () => void
}

const LevelUpAnimation = ({ level, onAnimationComplete }: LevelUpAnimationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onAnimationComplete()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onAnimationComplete])

  return (
    <div className="level-up-animation">
      <div className="level-up-content">
        <div className="flex justify-center mb-4">
          {[...Array(5)].map((_, i) => (
            <FaStar 
              key={i} 
              className="text-yellow-400 mx-1" 
              size={30} 
              style={{ 
                animation: `star-pulse 0.5s ease-in-out ${i * 0.1}s infinite alternate`
              }} 
            />
          ))}
        </div>
        <h2 className="text-4xl font-bold text-white mb-2">LEVEL UP!</h2>
        <div className="text-6xl font-bold text-primary mb-4">{level}</div>
        <p className="text-text-muted">Your adventure continues...</p>
      </div>
      
      <style jsx>{`
        @keyframes star-pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.7;
          }
          100% {
            transform: scale(1.2);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}

export default LevelUpAnimation
