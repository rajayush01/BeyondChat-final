import { BookOpen, BotMessageSquare, ChevronDown, CircleUser, FilePenLineIcon, Menu, MessageSquareTextIcon, MoveRight, PanelRight, SquareArrowOutUpRight } from 'lucide-react';
import React, { useState, useContext, useEffect, useRef } from 'react';
import CopilotDetails from './CopilotDetails';

export const ComposerContext = React.createContext({
  setComposerText: () => { },
});

const TypeAnimation = ({ text, delay = 30, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, delay);
    } else if (onComplete && currentIndex === text.length) {
      onComplete();
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, text, delay, onComplete]);

  return <>{displayedText}</>;
};

const CopilotPanel = () => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState({ id: null, index: null });
  const [activeTab, setActiveTab] = useState('copilot'); // 'copilot' or 'details'
  const { setComposerText } = useContext(ComposerContext);
  const [animatingMessages, setAnimatingMessages] = useState(new Set());
  const [showAdditionalText, setShowAdditionalText] = useState(new Set());
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    "👋 How do I get a refund?",
    "📝 What's the status of my order?",
    "🔄 Can I exchange this item?"
  ];

  const tooltipInfo = {
    1: "This is the initial response from our AI assistant based on your query.",
    2: "This provides additional detailed information to help resolve your issue."
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, animatingMessages, showAdditionalText]);

  const handleSubmit = () => {
    if (question.trim()) {
      const userMessage = {
        id: Date.now(),
        text: question,
        sender: 'user'
      };
      setMessages(prev => [...prev, userMessage]);

      setLoading(true);

      setTimeout(() => {
        let responseText;
        let additionalText;

        if (question.toLowerCase().includes('refund')) {
          responseText = "We understand that sometimes a purchase may not meet your expectations, and you may need to request a refund.";
          additionalText = "To assist you with your refund request, could you please provide your order ID and proof of purchase.\n\nPlease note: We can only refund orders placed within the last 60 days, and your item must meet our requirements for condition to be returned. Please check when you placed your order before proceeding.";
        } else if (question.toLowerCase().includes('status') || question.toLowerCase().includes('order')) {
          responseText = "I can help you check the status of your order.";
          additionalText = "To look up your order status, please provide your order number or the email address used for the purchase. I'll be able to give you the current status and estimated delivery date.";
        } else if (question.toLowerCase().includes('exchange')) {
          responseText = "We offer exchanges for items that don't fit or meet your needs.";
          additionalText = "To process an exchange, we'll need your order number and details about the item you'd like to exchange. Please note that exchanges must be initiated within 30 days of purchase, and the item must be in its original, unworn condition.";
        } else {
          responseText = "Thank you for reaching out to our support team.";
          additionalText = "To help you more effectively, could you please provide more details about your inquiry? This will allow me to direct you to the right resources or provide you with the specific information you need.";
        }

        const aiMessageId = Date.now() + 1;
        const aiMessage = {
          id: aiMessageId,
          text: responseText,
          additionalText: additionalText,
          sender: 'ai'
        };

        setMessages(prev => [...prev, aiMessage]);
        setLoading(false);
        
        setAnimatingMessages(prev => new Set(prev).add(aiMessageId));
      }, 1000);

      setQuestion('');
    }
  };

  const handleSelectPrompt = (prompt) => {
    const cleanPrompt = prompt.replace(/^[👋📝🔄]\s/, '');  
    setQuestion(cleanPrompt);

    setTimeout(() => {
      handleSubmit();
    }, 100);
  };

  const handleAddToComposer = (msg) => {
    const textToAdd = msg.text + (msg.additionalText ? "\n\n" + msg.additionalText : "");
    setComposerText(textToAdd);
  };

  const handleAnimationComplete = (messageId) => {
    const updatedAnimating = new Set(animatingMessages);
    updatedAnimating.delete(messageId);
    setAnimatingMessages(updatedAnimating);
    
    setShowAdditionalText(prev => new Set(prev).add(messageId));
  };

  return (
    <div className="flex flex-col h-full">
      <div className='flex items-center justify-between py-4'>
        <div className="flex bg-white py-3">
          <div 
            className={`flex items-center py-2 px-4 cursor-pointer ${activeTab === 'copilot' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'} font-medium text-sm`}
            onClick={() => setActiveTab('copilot')}
          >
            <BotMessageSquare className='w-5 h-5 bg-indigo-600 text-white rounded-md p-1 mr-1'/>
            AI Copilot
          </div>
          <div 
            className={`flex items-center py-2 px-4 cursor-pointer ${activeTab === 'details' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-600'} text-sm`}
            onClick={() => setActiveTab('details')}
          >
            Details
          </div>
        </div>
        <div className='flex flex-row gap-4 px-4'>
          <SquareArrowOutUpRight className='w-5 h-5 cursor-pointer'/>
          <PanelRight className='w-5 h-5 cursor-pointer'/>
        </div>
      </div>

      {activeTab === 'copilot' ? (
        <>
          <div className="flex-1 flex flex-col p-4 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                  </svg>
                </div>

                <h2 className="text-base font-medium mb-1">Hi, I'm Fin</h2>
                <p className="text-sm text-gray-600 mb-12">Ask me anything about your order.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'user' ? (
                      <div className="flex items-end space-x-2">
                        <div className="hidden sm:block text-sm text-gray-500">{/* space filler to align icons */}</div>
                        <div className="max-w-3/4 rounded-lg p-3 bg-indigo-600 text-white text-sm">
                          {msg.text}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-900 to-blue-500 flex items-center justify-center text-white font-bold">
                          <CircleUser />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start space-x-2">
                        <div className="w-8 h-8 rounded-md bg-black flex items-center justify-center text-white font-bold rotate-90">
                          <Menu />
                        </div>
                        <div className='flex flex-col'>
                        <div className="w-full text-sm max-w-md rounded-lg p-4 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 text-gray-800 space-y-4">
                          <div className="relative">
                            {animatingMessages.has(msg.id) ? (
                              <>
                                <TypeAnimation 
                                  text={msg.text} 
                                  delay={30} 
                                  onComplete={() => handleAnimationComplete(msg.id)} 
                                />
                                <span className="animate-pulse ml-1">|</span>
                              </>
                            ) : (
                              msg.text
                            )}
                            <span
                              className='relative h-1 w-1 text-xs font-bold rounded-full bg-blue-500 p-0 px-1 mx-1 cursor-help'
                              onMouseEnter={() => setShowTooltip({ id: msg.id, index: 1 })}
                              onMouseLeave={() => setShowTooltip({ id: null, index: null })}
                            >
                              1
                              {showTooltip.id === msg.id && showTooltip.index === 1 && (
                                <div className="absolute top-full left-0 -translate-x-1/2 mt-2 p-2 bg-black text-white text-xs rounded shadow-lg w-60 z-50">
                                  {tooltipInfo[1]}
                                </div>
                              )}
                            </span>
                          </div>

                          {msg.additionalText && showAdditionalText.has(msg.id) && (
                            <div className="relative">
                              <TypeAnimation text={msg.additionalText} delay={20} />
                              <span
                                className='relative h-1 w-1 text-xs font-bold rounded-full bg-blue-500 p-0 px-1 mx-1 cursor-help'
                                onMouseEnter={() => setShowTooltip({ id: msg.id, index: 2 })}
                                onMouseLeave={() => setShowTooltip({ id: null, index: null })}
                              >
                                2
                                {showTooltip.id === msg.id && showTooltip.index === 2 && (
                                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-2 bg-black text-white text-xs rounded shadow-lg w-60 z-50">
                                    {tooltipInfo[2]}
                                  </div>
                                )}
                              </span>
                            </div>
                          )}

                          {!animatingMessages.has(msg.id) && showAdditionalText.has(msg.id) && (
                            <div className='bg-white flex flex-row justify-center items-center py-1 rounded-lg cursor-pointer' onClick={() => handleAddToComposer(msg)}>
                              <button className="flex items-center px-4 py-2 bg-white space-x-2">
                                <FilePenLineIcon className="w-4 h-4" />
                                <span className="text-sm font-medium text-gray-800">Add to composer</span>
                                <ChevronDown className="w-3 h-3" />
                              </button>
                            </div>
                          )}

                        </div>
                          <div className='flex flex-col justify-start mt-2 gap-1 '>
                            <div className='text-sm text-gray-500'>15 relevant sources found</div>
                            <div className='text-sm flex flex-col ml-3'>
                              <span className='flex gap-1 cursor-pointer'><BookOpen className='w-5 h-5 bg-gray-200 rounded-full p-1'/>Getting a refund</span><br/>
                              <span className='flex gap-1 cursor-pointer'><MessageSquareTextIcon className='w-5 h-5 text-indigo-600 bg-gray-200 rounded-full p-1'/>Refund for an order by mistake</span><br/>
                              <span className='flex gap-1 cursor-pointer'><MessageSquareTextIcon className='w-5 h-5 text-indigo-600 bg-gray-200 rounded-full p-1'/>refund for an unwanted giftt</span>
                            </div>
                            <div className='text-sm gap-1 flex mx-3 flex-row items-center mt-1 font-bold cursor-pointer'>See all <MoveRight className='w-3 h-4'/></div>
                          </div>
                      </div>
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-200 rounded-lg p-3 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <div className="px-4 pb-4 bg-white">
            {messages.length === 0 && (
              <div className="mb-4">
                <div className="text-xs text-gray-600 mb-2">Suggested</div>
                {suggestedPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    className="w-full bg-gray-100 text-left rounded-lg p-2 text-sm mb-2 hover:bg-gray-200"
                    onClick={() => handleSelectPrompt(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            <div className="relative">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Ask a question..."
                className="w-full p-3 pl-4 pr-8 border border-gray-300 rounded-lg focus:outline-none"
              />
              <div
                onClick={handleSubmit}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-500">
                  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-.53 14.03a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V8.25a.75.75 0 00-1.5 0v5.69l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </>
      ) : (
        <CopilotDetails />
      )}
    </div>
  );
};

export default CopilotPanel;