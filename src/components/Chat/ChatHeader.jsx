import { useState } from 'react';
import { MoreHorizontal, Phone, Video, X } from 'lucide-react';
import { GiNightSleep } from "react-icons/gi";

const ChatHeader = ({ conversation }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isOnline] = useState(true); 

  if (!conversation) return null;

  const actionButtons = [
    { icon: Phone, label: 'Voice call', color: 'text-green-600 hover:text-green-700 hover:bg-green-50' },
    { icon: Video, label: 'Video call', color: 'text-blue-600 hover:text-blue-700 hover:bg-blue-50' },
  ];

  return (
    <div className="border-b border-gray-200 p-2 mt-[5px] md:px-4 flex justify-between items-center bg-white/95 backdrop-blur-sm sticky top-0 z-10 w-full animate-slide-down">
      <div className="flex items-center animate-fade-in">
        <div className="flex flex-col">
          <div className="flex items-center space-x-2">
            <h2 className="text-base md:text-lg font-semibold truncate max-w-[120px] md:max-w-full text-gray-800 hover:text-blue-600 transition-colors duration-300">
              {conversation.name.split(' ')[0]}
            </h2>
            
            <div className="relative">
              <div className={`
                w-3 h-3 rounded-full transition-all duration-300
                ${isOnline ? 'bg-green-400 animate-pulse-gentle' : 'bg-gray-300'}
              `}>
                {isOnline && (
                  <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 animate-fade-in" style={{animationDelay: '0.2s'}}>
            {isOnline ? 'Active now' : 'Last seen 2h ago'}
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-1 md:space-x-2 animate-fade-in" style={{animationDelay: '0.1s'}}>
        <button
          className={`
            p-2 rounded-lg transition-all duration-300 transform
            hover:bg-gray-100 hover:scale-110 active:scale-95
            ${showOptions ? 'bg-gray-100 rotate-90' : 'text-gray-400 hover:text-gray-600'}
          `}
          onClick={() => setShowOptions(!showOptions)}
        >
          <MoreHorizontal size={20} />
        </button>

        <div className={`
          flex items-center space-x-1 md:space-x-2 overflow-hidden
          transition-all duration-500 ease-out
          ${showOptions ? 'max-w-48 opacity-100' : 'max-w-0 opacity-0'}
        `}>
          {actionButtons.map(({ icon: Icon, label, color }, index) => (
            <button
              key={label}
              className={`
                p-2 rounded-lg transition-all duration-300 transform
                ${color} hover:scale-110 active:scale-95
                animate-slide-in-right
              `}
              style={{
                animationDelay: `${showOptions ? index * 0.1 + 0.2 : 0}s`,
                animationFillMode: 'both'
              }}
              title={label}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>

        <button 
          className="p-2 rounded-lg hover:bg-purple-50 text-purple-600 hover:text-purple-700 transition-all duration-300 transform hover:scale-110 active:scale-95"
          title="Sleep mode"
        >
          <GiNightSleep size={16} />
        </button>
        
        <button className={`
          text-white bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg px-3 py-2 
          text-xs md:text-sm font-medium transition-all duration-300 transform
          hover:from-gray-800 hover:to-gray-900 hover:scale-105 hover:shadow-lg
          active:scale-95 relative overflow-hidden group
        `}>
          <span className="relative z-10 flex items-center gap-1">
            <X size={14} className="group-hover:rotate-90 transition-transform duration-300" />
            Close
          </span>
          
          <div className="absolute insets-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-full animate-shimmer"></div>
        </button>
      </div>

    </div>
  );
};

export default ChatHeader;