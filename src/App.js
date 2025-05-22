import React, { useState, useEffect } from "react";
import ConversationList from "./components/Sidebar/ConversationList";
import ChatWindow from "./components/Chat/ChatWindow";
import CopilotPanel, { ComposerContext } from "./components/Copilot/CopilotPanel";
import { AlignLeft, LayoutPanelLeft, Menu, X } from "lucide-react";

export default function App() {
  const [showCopilot, setShowCopilot] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeConversation, setActiveConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [composerText, setComposerText] = useState('');
  const [conversations, setConversations] = useState([
    {
      id: 1,
      name: 'Luis - Github',
      message: 'Hey! I have a question about my repo...',
      time: '45m',
      unread: 0,
      icon: 'L',
      iconColor: 'bg-blue-400 text-white',
    },
    {
      id: 2,
      name: 'Ivan - Nike',
      message: 'Hi there, I have a question about my order...',
      time: '30m',
      badge: '3min',
      unread: 1,
      icon: 'I',
      iconColor: 'bg-red-400 text-white',
    },
    {
      id: 3,
      name: 'Lead from New York',
      message: 'Good morning, let me know when we can chat.',
      time: '40m',
      unread: 1,
      icon: 'L',
      iconColor: 'bg-blue-400 text-white',
    },
    {
      id: 4,
      name: 'Booking API problems',
      message: 'Bug report',
      subtext: 'Luis - Small Crafts',
      time: '45m',
      unread: 0,
      icon: 'B',
      iconColor: 'bg-gray-800 text-white',
    },
    {
      id: 5,
      name: 'Miracle - Exemplary Bank',
      message: "Hey there, I'm here to assist with your query...",
      time: '45m',
      unread: 0,
      icon: 'M',
      iconColor: 'bg-gray-100 text-gray-500',
    },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (conversations.length > 0 && !activeConversation) {
      setActiveConversation(conversations[0]);
    }
  }, [conversations, activeConversation]);

  const handleConversationClick = (conversation) => {
    setActiveConversation(conversation);

    if (conversation.unread > 0) {
      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv.id === conversation.id ? { ...conv, unread: 0 } : conv
        )
      );
    }

    if (window.innerWidth < 768) {
      setShowSidebar(false);
    }
  };

  const handleCopilotPrompt = (prompt) => {
    console.log("Copilot received prompt:", prompt);
  };

  const composerContextValue = {
    composerText,
    setComposerText
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-ping mx-auto opacity-20"></div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 animate-pulse">BeyondChat</h2>
          <p className="text-gray-600 animate-fade-in">Loading your conversations...</p>
        </div>
      </div>
    );
  }

  return (
    <ComposerContext.Provider value={composerContextValue}>
      <div className="h-screen flex flex-col md:flex-row overflow-hidden">
        <div className="md:hidden flex justify-between items-center p-3 bg-white shadow-sm z-20">
          <button
            className="text-gray-600 p-1"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <AlignLeft size={24} />
          </button>
          <span className="text-lg font-semibold">
            {activeConversation ? 'BeyondChat' : 'BeyondChat'}
          </span>
          <button
            className="text-sm text-blue-600 font-medium py-1 px-2"
            onClick={() => setShowCopilot(!showCopilot)}
          >
            {showCopilot ? "Back to Chat" : "AI Copilot"}
          </button>
        </div>

        <aside
          className={`fixed md:static top-0 left-0 h-full md:h-screen flex-shrink-0 md:w-64 w-72 bg-white z-30 transform transition-transform duration-300 ease-in-out ${showSidebar ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 md:col-span-1 flex flex-col`}
        >

          <div className="md:hidden flex justify-end p-2">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowSidebar(false)}
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="overflow-y-auto flex-1">
              <ConversationList
                conversations={conversations}
                activeConversation={activeConversation}
                onConversationClick={handleConversationClick}
              />
            </div>

            <div className="flex flex-row p-7 items-start">
              <div className="flex flex-row border-2 p-1 rounded-lg shadow-md shadow-gray-400">
              <span className="hover:bg-gray-300 hover:scale-110 bg-gray-200 rounded-lg p-1 cursor-pointer"><LayoutPanelLeft className="h-5 w-5"/></span>
              <span className="hover:bg-gray-200 hover:scale-110 rounded-lg p-1 cursor-pointer"><Menu className="h-5 w-5"/></span>
              </div>
            </div>
          </div>

        </aside>

        {showSidebar && (
          <div
            className="fixed inset-0 bg-black/30 z-20 md:hidden"
            onClick={() => setShowSidebar(false)}
          ></div>
        )}

        <main
          className={`flex-1 flex flex-col overflow-hidden h-[calc(100vh-56px)] md:h-screen ${showCopilot ? "hidden" : "block"
            } md:block border-r border-gray-200`}
        >
          <ChatWindow activeConversation={activeConversation} />
        </main>

        <aside
          className={`fixed md:static top-0 right-0 h-full md:h-screen w-full md:w-[300px] lg:w-[360px] flex-shrink-0 bg-white z-30 transform transition-transform duration-300 ease-in-out ${showCopilot ? "translate-x-0" : "translate-x-full"
            } md:translate-x-0 md:col-span-1 overflow-y-auto`}
        >
          <div className="md:hidden flex justify-between items-center p-4 mb-2">
            <span className="font-bold">AI Copilot</span>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setShowCopilot(false)}
            >
              <X size={24} />
            </button>
          </div>

          <CopilotPanel onSelectPrompt={handleCopilotPrompt} />
        </aside>

        {showCopilot && (
          <div
            className="fixed inset-0 bg-black/30 z-20 md:hidden"
            onClick={() => setShowCopilot(false)}
          ></div>
        )}
      </div>
    </ComposerContext.Provider>
  );
}