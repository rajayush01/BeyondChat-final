import React, { useState, useContext, useEffect, useRef } from 'react';
import { Zap,  Smile, MessageSquareTextIcon, ChevronDown, Bookmark } from 'lucide-react';
import { ComposerContext } from '../Copilot/CopilotPanel';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const { composerText, setComposerText } = useContext(ComposerContext);
  const textareaRef = useRef(null);

  useEffect(() => {
    if (composerText) {
      setMessage(composerText);
      setComposerText('');
    }
  }, [composerText, setComposerText]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; 
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 144)}px`; 
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; 
      }
    }
  };

  return (
    <div className="flex justify-end w-full px-4">
      <div className="border border-gray-200 rounded-lg p-2 bg-white w-[900px] shadow-lg mb-4">
        <div className="flex items-center">
          <div className="text-xs text-black flex gap-1 mr-2">
            <MessageSquareTextIcon className="h-4 w-4" />
            Chat
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-1">
          <textarea
            ref={textareaRef}
            rows={1}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Use ⌘K for shortcuts"
            className="w-full resize-none py-2 focus:outline-none text-sm text-gray-700 overflow-y-auto"
            style={{ maxHeight: '144px' }} // ~6 lines max
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />

          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center space-x-3">
              {[Zap, Bookmark, Smile].map((Icon, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="text-black hover:text-gray-700"
                  onClick={(e) => e.preventDefault()}
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>

            <div className="flex items-center">
              <button
                type="button"
                className={`text-sm flex gap-1 px-2 items-center font-medium ${message.trim() ? 'bg-black text-white hover:text-white p-1 rounded-lg' : 'text-gray-500 cursor-not-allowed'}`}
                disabled={!message.trim()}
                onClick={handleSubmit}
              >
                Send
              <ChevronDown className="h-4 w-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
