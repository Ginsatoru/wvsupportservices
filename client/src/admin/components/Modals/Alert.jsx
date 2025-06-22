import { useEffect, useState } from 'react';
import { CheckCircle, X, AlertCircle } from 'lucide-react';

export const ModernAlert = ({ message, type = 'success', onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setIsVisible(true);

    // Auto-hide after 5 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match exit animation duration
  };

  const getAlertConfig = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
          icon: <CheckCircle className="w-5 h-5" />,
          borderColor: 'border-emerald-400'
        };
      case 'error':
        return {
          bgColor: 'bg-gradient-to-r from-red-500 to-red-600',
          icon: <AlertCircle className="w-5 h-5" />,
          borderColor: 'border-red-400'
        };
      case 'warning':
        return {
          bgColor: 'bg-gradient-to-r from-amber-500 to-orange-500',
          icon: <AlertCircle className="w-5 h-5" />,
          borderColor: 'border-amber-400'
        };
      case 'info':
        return {
          bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
          icon: <AlertCircle className="w-5 h-5" />,
          borderColor: 'border-blue-400'
        };
      default:
        return {
          bgColor: 'bg-gradient-to-r from-emerald-500 to-emerald-600',
          icon: <CheckCircle className="w-5 h-5" />,
          borderColor: 'border-emerald-400'
        };
    }
  };

  const { bgColor, icon, borderColor } = getAlertConfig();

  return (
    <div 
      className={`
        fixed top-28 right-7 ${bgColor} text-white px-5 py-4 rounded-2xl 
        shadow-xl border-l-4 ${borderColor} flex items-center gap-3 z-50 
        backdrop-blur-sm min-w-80 max-w-md
        transition-all duration-300 ease-out transform
        ${isVisible && !isExiting 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
        }
        hover:shadow-2xl hover:scale-105
      `}
      style={{
        background: `${bgColor.replace('bg-gradient-to-r', 'linear-gradient(to right,')} + ')'`,
        animation: isVisible && !isExiting ? 'slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : undefined
      }}
    >
      {/* Icon with subtle animation */}
      <div className="flex-shrink-0 animate-pulse">
        {icon}
      </div>
      
      {/* Message */}
      <div className="flex-1">
        <span className="text-sm font-medium leading-relaxed">{message}</span>
      </div>
      
      {/* Close button with hover effect */}
      <button 
        onClick={handleClose}
        className="flex-shrink-0 ml-2 p-1 rounded-full hover:bg-white/20 
                   focus:outline-none focus:ring-2 focus:ring-white/50 
                   transition-all duration-200 ease-in-out transform hover:scale-110"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Progress bar */}
      <div 
        className="absolute bottom-0 left-0 h-1 bg-white/30 rounded-b-2xl"
        style={{
          width: '100%',
          animation: isVisible && !isExiting ? 'progress 5s linear' : 'none'
        }}
      />

      <style jsx>{`
        @keyframes slideIn {
          0% {
            transform: translateX(100%) scale(0.9);
            opacity: 0;
          }
          50% {
            transform: translateX(-8px) scale(1.02);
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }

        @keyframes progress {
          0% {
            width: 100%;
            opacity: 0.8;
          }
          100% {
            width: 0%;
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};