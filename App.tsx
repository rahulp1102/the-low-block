import React from 'react';
import { ChatProvider } from './context/ChatContext';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

function App() {
  return (
    <ChatProvider>
      <div className="flex flex-col h-screen bg-charcoal-950 text-chalk-white font-sans">
        
        {/* Header - Authoritative & Structural */}
        <header className="flex-shrink-0 h-20 border-b border-charcoal-700 bg-charcoal-900/90 backdrop-blur-md flex items-center justify-between px-6 z-20 relative">
          <div className="flex items-center gap-4">
            {/* Logo Mark */}
            <div className="w-10 h-10 bg-charcoal-800 rounded-xl border border-charcoal-700 flex items-center justify-center shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-chalk-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <svg className="w-5 h-5 text-chalk-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-lg tracking-[0.15em] text-chalk-white leading-none uppercase font-mono">The Low Block</h1>
              <span className="text-[10px] text-chalk-green/80 font-medium tracking-widest uppercase mt-1">Tactical Analysis Engine</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="hidden md:flex flex-col items-end">
                <span className="text-[10px] text-charcoal-700 font-mono tracking-widest">STATUS</span>
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-chalk-green shadow-[0_0_8px_rgba(129,199,132,0.4)] animate-pulse"></div>
                   <span className="text-xs text-chalk-gray font-medium tracking-wide">ONLINE</span>
                </div>
             </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative overflow-hidden">
          {/* Background Layer 1: Base Texture */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 z-0"></div>
          
          {/* Background Layer 2: Radial Focus Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0e1012_100%)] pointer-events-none z-0"></div>
          
          <div className="relative z-10 flex-1 flex flex-col h-full max-w-5xl mx-auto w-full shadow-2xl shadow-black/50 border-x border-charcoal-700/50 bg-charcoal-900/20">
            <ChatWindow />
            <ChatInput />
          </div>
        </main>

      </div>
    </ChatProvider>
  );
}

export default App;