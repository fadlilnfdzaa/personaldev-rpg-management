'use client'

import { useEffect, useState } from 'react'
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaInfoCircle, FaTimes } from 'react-icons/fa'

type ToastType = 'success' | 'warning' | 'error' | 'info'

interface RpgToastProps {
  message: string
  type?: ToastType
  duration?: number
  onClose: () => void
}

const RpgToast = ({ message, type = 'info', duration = 3000, onClose }: RpgToastProps) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Allow time for exit animation
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-green-500" size={20} />
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-500" size={20} />
      case 'error':
        return <FaTimesCircle className="text-red-500" size={20} />
      default:
        return <FaInfoCircle className="text-blue-500" size={20} />
    }
  }

  const getTitle = () => {
    switch (type) {
      case 'success':
        return 'Quest Completed!'
      case 'warning':
        return 'Quest Warning'
      case 'error':
        return 'Quest Failed'
      default:
        return 'Quest Update'
    }
  }

  return (
    <div 
      className={`rpg-toast ${type} bottom-4 right-4 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      style={{ 
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      <button 
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }}
        className="absolute top-2 right-2 text-text-muted hover:text-text-bright"
      >
        <FaTimes size={16} />
      </button>
      
      <div className="flex items-start">
        <div className="mr-3 mt-0.5">
          {getIcon()}
        </div>
        <div>
          <h4 className="font-bold text-sm">{getTitle()}</h4>
          <p className="text-text-muted text-sm mt-1">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default RpgToast
