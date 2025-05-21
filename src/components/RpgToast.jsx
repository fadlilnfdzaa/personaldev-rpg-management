import { useEffect, useState } from 'react'
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaInfoCircle, FaTimes } from 'react-icons/fa'

const RpgToast = ({ message, type = 'info', duration = 3000, onClose }) => {
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
        return <FaCheckCircle className="text-status-mp" size={20} />
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-500" size={20} />
      case 'error':
        return <FaTimesCircle className="text-status-hp" size={20} />
      default:
        return <FaInfoCircle className="text-status-xp" size={20} />
    }
  }

  const getTitle = () => {
    switch (type) {
      case 'success':
        return 'Quest Completed'
      case 'warning':
        return 'Quest Warning'
      case 'error':
        return 'Quest Failed'
      default:
        return 'System Message'
    }
  }

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-status-mp';
      case 'warning':
        return 'text-yellow-500';
      case 'error':
        return 'text-status-hp';
      default:
        return 'text-status-xp';
    }
  }

  return (
    <div
      className={`rpg-toast ${type} bottom-4 right-4 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      style={{
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      }}
    >
      <div className="sl-bracket top-left"></div>
      <div className="sl-bracket top-right"></div>
      <div className="sl-bracket bottom-left"></div>
      <div className="sl-bracket bottom-right"></div>

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
          <h4 className={`font-bold text-sm font-display uppercase tracking-wider ${getTextColor()}`}>
            {getTitle()}
          </h4>
          <p className="text-text-muted text-sm mt-1">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default RpgToast
