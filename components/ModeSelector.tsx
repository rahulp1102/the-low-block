import React from 'react';
import { useChat } from '../context/ChatContext';
import { AnalysisMode } from '../types';

const ModeSelector: React.FC = () => {
  const { mode, setMode } = useChat();

  const modes: { id: AnalysisMode; label: string; icon: string }[] = [
    { id: 'tactical', label: 'Tactical', icon: '🛡️' },
    { id: 'scout', label: 'Scout', icon: '💎' },
    { id: 'pundit', label: 'Pundit', icon: '🔥' },
  ];

  return (
    <div className="flex items-center gap-1 bg-charcoal-800 p-1 rounded-lg border border-charcoal-700/50">
      {modes.map((m) => (
        <button
          key={m.id}
          onClick={() => setMode(m.id)}
          className={`
            px-3 py-1.5 rounded-md text-xs font-medium tracking-wide transition-all duration-300 flex items-center gap-2
            ${mode === m.id 
              ? 'bg-charcoal-700 text-chalk-white shadow-sm border border-charcoal-600' 
              : 'text-chalk-gray hover:text-chalk-white hover:bg-charcoal-700/50'}
          `}
        >
          <span className="opacity-80">{m.icon}</span>
          <span className="hidden md:inline">{m.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;