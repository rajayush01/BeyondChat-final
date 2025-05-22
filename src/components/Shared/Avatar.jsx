import React from 'react';
import './Avatar.css';

const Avatar = ({ 
  letter, 
  color = 'bg-blue-300 text-white', 
  size = 'w-6 h-6',
  isActive = false,
  isHovered = false 
}) => {
  return (
    <div className="relative">
      <div className={`
        ${size} rounded-full ${color} 
        flex items-center justify-center text-xs font-medium
        transition-all duration-300 transform
        hover:scale-110 hover:shadow-lg hover:rotate-6
        ${isActive ? 'scale-110 shadow-lg ring-2 ring-blue-400 ring-opacity-50' : ''}
        ${isHovered ? 'animate-pulse-gentle' : ''}
        cursor-pointer relative overflow-hidden
      `}>
        <div className={`
          absolute inset-0 rounded-full
          bg-gradient-to-r from-transparent via-white to-transparent
          opacity-0 hover:opacity-20 transition-opacity duration-500
          transform -skew-x-12 translate-x-full hover:translate-x-full
          animate-shimmer
        `}></div>
        
        <span className={`
          relative z-10 transition-all duration-300 transform
          ${isHovered ? 'scale-110' : ''}
          ${isActive ? 'font-bold' : ''}
        `}>
          {letter}
        </span>
        
        {isActive && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse">
            <div className="w-full h-full bg-green-500 rounded-full animate-ping opacity-75"></div>
          </div>
        )}
      </div>

      <div className={`
        absolute inset-0 rounded-full
        bg-gradient-to-r from-blue-400 to-purple-500
        opacity-0 hover:opacity-20 transition-opacity duration-300
        scale-150 blur-md -z-10
        ${isHovered ? 'animate-pulse-slow' : ''}
      `}></div>
    </div>
  );
};

export default Avatar;