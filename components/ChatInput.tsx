import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';

const ChatInput: React.FC = () => {
  const { sendMessage, isLoading } = useChat();
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const messageToSend = input;
    setInput('');
    
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    await sendMessage(messageToSend);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [input]);

  return (
    <div className="w-full bg-charcoal-900/90 backdrop-blur-xl border-t border-charcoal-700 p-6 z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="relative group">
            {/* Ambient Glow */}
            <div className="absolute -inset-1 bg-chalk-green/5 rounded-2xl blur-lg opacity-0 group-focus-within:opacity-100 transition duration-1000"></div>
            
            <div className="relative flex items-end gap-3 bg-charcoal-800 border border-charcoal-700 rounded-2xl p-2 shadow-inner transition-all duration-300 focus-within:bg-charcoal-800 focus-within:border-chalk-green/40 focus-within:ring-1 focus-within:ring-chalk-green/20">
              
              <div className="pl-3 py-3 text-charcoal-700">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>

              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isLoading ? "System analyzing..." : "Enter tactical command..."}
                disabled={isLoading}
                className="w-full bg-transparent text-chalk-white placeholder-charcoal-700 text-base py-3 resize-none focus:outline-none max-h-[200px] overflow-y-auto disabled:opacity-50 font-light tracking-wide"
                rows={1}
              />
              
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={`p-3 rounded-xl flex-shrink-0 transition-all duration-300 ${
                  !input.trim() || isLoading
                    ? 'bg-charcoal-700 text-charcoal-900 cursor-not-allowed'
                    : 'bg-chalk-green text-charcoal-950 hover:bg-chalk-green/90 shadow-lg shadow-chalk-green/10 active:translate-y-0.5'
                }`}
                aria-label="Execute"
              >
                {isLoading ? (
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="h-5 w-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
        </form>
        
        <div className="flex justify-between items-center mt-4 px-1">
           <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-chalk-green rounded-full animate-pulse"></span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-chalk-green/60 font-medium">Gemini Link Active</span>
           </div>
           <span className="text-[10px] text-charcoal-700 font-mono">v1.0.4-BETA</span>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;