import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

const ChatWindow = ({ activeConversation }) => {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (activeConversation) {
      const initialMessages = getInitialMessages(activeConversation.name);
      setMessages(initialMessages);
    }
  }, [activeConversation]);

  const getInitialMessages = (conversationName) => {

    const userMessage = conversationName.includes('Github') 
      ? 'I bought a product from your store in November as a Christmas gift for a member of my family. However, it turns out they have something very similar already. I was hoping you\'d be able to refund me, as it is un-opened.'
      : 'Hi there, I have a question about my order...';
    
    const userResponse = conversationName.includes('Github')
      ? 'Let me just look into this for you, Luis.'
      : 'Of course, how can I help you today?';

    return [
      {
        id: 1,
        content: userMessage,
        timestamp: '1min',
        sender: conversationName.split(' ')[0],
        isUser: false,
        avatarColor: 'bg-blue-100 text-blue-600',
      },
      {
        id: 2,
        content: userResponse,
        timestamp: '1min',
        sender: 'You',
        isUser: true,
        seen: true
      }
    ];
  };

  const handleSendMessage = (content) => {
    const newMessage = {
      id: Date.now(),
      content,
      timestamp: 'Just now',
      sender: 'You',
      isUser: true
    };
    
    setMessages([...messages, newMessage]);
    
    setTimeout(() => {
      const responseMessage = {
        id: Date.now() + 1,
        content: 'Thanks for your message! I\'ll get back to you shortly.',
        timestamp: 'Just now',
        sender: activeConversation?.name?.split(' ')[0] || 'User',
        isUser: false,
        avatarColor: 'bg-blue-100 text-blue-600'
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1500);
  };

  if (!activeConversation) {
    return (
      <div className="flex flex-col h-full justify-center items-center text-gray-500">
        <p>Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <ChatHeader conversation={activeConversation} />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message} 
            isUser={message.isUser} 
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;