import React, { useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import ChatMessage from './ChatMessage';

const ChatWindow: React.FC = () => {
  const { messages, isLoading, error, sendMessage } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleChipClick = (text: string) => {
    sendMessage(text);
  };

  const suggestions = [
    { label: "Role Analysis", query: "Explain the role of a False 9 in a 4-3-3 system." },
    { label: "Tactical Counter", query: "How do you break down a 5-4-1 low block?" },
    { label: "Formation Guide", query: "What are the strengths and weaknesses of the 3-5-2?" },
    { label: "Pressing Systems", query: "Describe the triggers for a Klopp-style Gegenpress." }
  ];

  return (
    <div className="flex-1 overflow-y-auto w-full relative scroll-smooth custom-scrollbar">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-10 min-h-full flex flex-col">
        
        {/* Empty State */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center flex-1 my-12 animate-fade-in select-none">
            <div className="relative mb-8 group">
              <div className="absolute -inset-4 bg-chalk-green/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="w-20 h-20 bg-charcoal-800 rounded-2xl border border-charcoal-700 flex items-center justify-center shadow-2xl relative z-10">
                <svg className="w-10 h-10 text-chalk-green/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 01-2 2h2a2 2 0 012-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-light tracking-wide text-chalk-white mb-3 text-center">
              Awaiting Tactical Input
            </h2>
            <p className="text-chalk-gray text-sm md:text-base max-w-md text-center mb-10 leading-relaxed font-light">
              Connect to the neural engine. Select a preset parameter or initialize a custom query below.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
              {suggestions.map((s, i) => (
                <button 
                  key={i}
                  onClick={() => handleChipClick(s.query)}
                  className="group relative flex flex-col items-start p-4 bg-charcoal-800 border border-charcoal-700 rounded-xl hover:bg-charcoal-800/80 hover:border-chalk-green/30 transition-all duration-300 text-left overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-chalk-green/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="text-[10px] uppercase tracking-widest text-chalk-green/70 mb-1 font-bold">{s.label}</span>
                  <span className="text-sm text-chalk-white/80 group-hover:text-chalk-white transition-colors">{s.query}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Message List */}
        <div className="flex flex-col pt-4">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
        </div>

        {/* Loading Indicator - System Processing Look */}
        {isLoading && (
           <div className="flex flex-col w-full mb-10 pr-12 animate-fade-in">
              <div className="flex items-center gap-3 mb-2 ml-1">
                 <span className="text-xs font-bold tracking-widest text-chalk-gray uppercase animate-pulse">Processing Data</span>
              </div>
              <div className="bg-charcoal-800/30 border-l-2 border-charcoal-700/50 p-6 rounded-r-lg backdrop-blur-sm ml-1 flex items-center gap-4">
                  <div className="flex space-x-1">
                    <div className="w-1.5 h-6 bg-chalk-green/40 rounded-sm animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-1.5 h-6 bg-chalk-green/40 rounded-sm animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-1.5 h-6 bg-chalk-green/40 rounded-sm animate-[pulse_1s_ease-in-out_infinite]" style={{ animationDelay: '400ms' }}></div>
                  </div>
                  <span className="text-sm text-chalk-gray font-mono">Compiling tactical report...</span>
              </div>
           </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex justify-center my-6 animate-fade-in-up">
            <div className="bg-red-950/30 border border-red-900/50 text-red-200 px-6 py-3 rounded-lg text-sm flex items-center gap-3 backdrop-blur-md shadow-lg">
              <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="font-medium tracking-wide">SYSTEM ERROR: {error}</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} className="h-4" />
      </div>
    </div>
  );
};

export default ChatWindow;