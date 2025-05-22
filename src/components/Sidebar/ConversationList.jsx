import { ChevronDown } from 'lucide-react';
import Avatar from '../Shared/Avatar';
import { useState } from 'react';
import './Convo.css'

const ConversationList = ({ conversations, activeConversation, onConversationClick }) => {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="space-y-4 h-full flex flex-col animate-fade-in">
      <div className="border-b border-gray-200 px-4 py-4 mt-1 animate-slide-down">
        <h2 className="text-lg font-semibold text-gray-800 transition-colors duration-300 hover:text-blue-600">
          Your inbox
        </h2>
      </div>

      <div className="flex justify-between px-4 border-gray-100 animate-slide-down" style={{animationDelay: '0.1s'}}>
        <div className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-200 cursor-pointer group">
          <span className="group-hover:scale-105 transition-transform duration-200">
            {conversations.length} Open
          </span>
          <ChevronDown className="w-4 h-4 ml-1 cursor-pointer group-hover:rotate-180 transition-transform duration-300" />
        </div>
        <div className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-200 cursor-pointer group">
          <span className="group-hover:scale-105 transition-transform duration-200">
            Waiting longest
          </span>
          <ChevronDown className="w-4 h-4 ml-1 cursor-pointer group-hover:rotate-180 transition-transform duration-300" />
        </div>
      </div>
      <div className="overflow-y-auto flex-1 px-2 animate-slide-up" style={{animationDelay: '0.2s'}}>
        {conversations.map((conversation, index) => (
          <div
            key={conversation.id}
            className={`flex items-start p-3 rounded-xl mb-2 cursor-pointer transition-all duration-300 transform hover:scale-102 hover:shadow-md animate-slide-up ${
              activeConversation?.id === conversation.id 
                ? 'bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 shadow-sm scale-102' 
                : 'hover:bg-gray-50'
            }`}
            style={{animationDelay: `${0.3 + index * 0.1}s`}}
            onClick={() => onConversationClick(conversation)}
            onMouseEnter={() => setHoveredId(conversation.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div className="transform transition-all duration-300 hover:scale-110">
              <Avatar
                letter={conversation.icon}
                color={conversation.iconColor}
                size="w-10 h-10"
                isActive={activeConversation?.id === conversation.id}
                isHovered={hoveredId === conversation.id}
              />
            </div>

            <div className="ml-3 flex-1 min-w-0">
              <div className="flex justify-between">
                <div className={`text-sm truncate transition-all duration-300 ${
                  conversation.unread > 0 
                    ? 'font-bold text-gray-900' 
                    : 'font-normal text-gray-700 hover:text-gray-900'
                }`}>
                  {conversation.name}
                  {conversation.unread > 0 && (
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full ml-2 animate-pulse"></span>
                  )}
                </div>
              </div>
              
              <div className="text-xs text-gray-500 truncate mt-1 pr-2 transition-colors duration-300 hover:text-gray-700">
                {conversation.message}
              </div>
              
              {conversation.subtext && (
                <div className="text-xs text-gray-400 mt-0.5 transition-colors duration-300 hover:text-gray-600">
                  {conversation.subtext}
                </div>
              )}
            </div>

            <div className="flex flex-col items-end space-y-1 ml-1">
              {conversation.badge && (
                <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 px-2 py-1 rounded-full text-[10px] font-medium text-yellow-800 shadow-sm animate-bounce-gentle transform hover:scale-110 transition-transform duration-200">
                  {conversation.badge}
                </div>
              )}
              
              <span className={`text-xs transition-all duration-300 ${
                activeConversation?.id === conversation.id 
                  ? 'text-blue-600 font-medium' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}>
                {conversation.time}
              </span>
            </div>

            <div className={`absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-full transform transition-all duration-300 ${
              hoveredId === conversation.id || activeConversation?.id === conversation.id
                ? 'opacity-100 scale-y-100' 
                : 'opacity-0 scale-y-0'
            }`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;