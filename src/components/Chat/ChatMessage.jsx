import React, { useState, useEffect } from 'react';
import Avatar from '../Shared/Avatar';
import { CircleUser, CheckCheck } from 'lucide-react';
import './Chat.css';

const ChatMessage = ({ message, isUser, isNew = false }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showReadReceipt, setShowReadReceipt] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    if (message.seen && !isUser) {
      const receiptTimer = setTimeout(() => {
        setShowReadReceipt(true);
      }, 1000);
      return () => clearTimeout(receiptTimer);
    }

    return () => clearTimeout(timer);
  }, [message.seen, isUser]);

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 group`}>
      {!isUser && (
        <div className="mr-3 flex-shrink-0 animate-slide-right">
          <Avatar 
            letter={message.sender.charAt(0)} 
            color={message.avatarColor || 'bg-gray-100 text-gray-600'}
            size="w-8 h-8"
            isHovered={false}
          />
        </div>
      )}
      
      <div 
        className={`
          relative max-w-[75%] rounded-2xl p-4 shadow-sm
          transition-all duration-500 transform
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          ${isNew ? 'animate-message-pop' : ''}
          ${isUser 
            ? 'bg-blue-100 text-gray-800 ml-auto hover:shadow-md font-medium' 
            : 'bg-gray-200 text-gray-800 border border-gray-200 hover:shadow-md font-medium hover:border-gray-200'
          }
          hover:scale-102 group-hover:shadow-lg
        `}
      >
        <div className="text-sm leading-relaxed">
          {message.content}
        </div>
        
        <div className={`
          text-xs mt-2 flex items-center justify-end space-x-1
          ${isUser ? 'text-blue-100' : 'text-gray-500'}
          transition-opacity duration-300 opacity-70 group-hover:opacity-100
        `}>
          {showReadReceipt && message.seen && !isUser && (
            <span className="animate-fade-in flex items-center">
              <CheckCheck size={12} className="mr-1 text-green-500" />
              Seen ·
            </span>
          )}
          
          {isUser && (
            <div className="flex items-center animate-fade-in">
              <CheckCheck size={12} className="text-blue-200" />
            </div>
          )}
          
          <span className="animate-fade-in" style={{animationDelay: '0.2s'}}>
            {message.timestamp}
          </span>
        </div>

        <div className={`
          absolute top-4 w-0 h-0 transition-all duration-300
          ${isUser 
            ? 'right-0 translate-x-full border-l-8 border-l-blue-500 border-t-8 border-t-transparent border-b-8 border-b-transparent' 
            : 'left-0 -translate-x-full border-r-8 border-r-white border-t-8 border-t-transparent border-b-8 border-b-transparent'
          }
        `}></div>
      </div>
      
      {isUser && (
        <div className="ml-3 flex-shrink-0 animate-slide-left">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow duration-300">
            <CircleUser size={16} className="text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
