import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const time = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  if (isUser) {
    return (
      <div className="flex justify-end w-full mb-8 pl-12 animate-fade-in-up">
        <div className="flex flex-col items-end max-w-xl group">
          <div className="bg-charcoal-800 border border-charcoal-700 rounded-2xl rounded-tr-sm px-5 py-3 text-chalk-white text-sm leading-relaxed shadow-sm transition-all duration-300 group-hover:border-chalk-green/30">
             {message.content}
          </div>
          <div className="flex items-center gap-2 mt-2 mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <span className="text-[10px] text-chalk-gray font-mono tracking-wider">USER INPUT</span>
             <span className="text-[10px] text-chalk-gray font-mono">• {time}</span>
          </div>
        </div>
      </div>
    );
  }

  // Assistant Design (Analyst Note)
  return (
    <div className="flex flex-col w-full mb-10 pr-4 md:pr-12 animate-fade-in-up">
      {/* Analyst Header */}
      <div className="flex items-center gap-3 mb-3 ml-1">
        <div className="w-6 h-6 bg-charcoal-800 rounded flex items-center justify-center border border-charcoal-700 shadow-sm">
           <svg className="w-3 h-3 text-chalk-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" />
           </svg>
        </div>
        <span className="text-xs font-bold tracking-widest text-chalk-gray uppercase">Analyst Report</span>
        <div className="h-px flex-1 bg-charcoal-700/50 ml-2"></div>
        <span className="text-[10px] text-charcoal-700 font-mono">{time}</span>
      </div>

      {/* Analyst Card */}
      <div className="relative group">
        {/* Decorative left accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-chalk-green to-charcoal-700 rounded-l-md opacity-80"></div>
        
        <div className="bg-charcoal-900/60 border-y border-r border-charcoal-700 rounded-r-lg p-6 md:p-7 shadow-xl shadow-black/20 ml-1 transition-all duration-300 hover:bg-charcoal-800/60">
          <div className="prose prose-invert max-w-none">
             {/* Replaced raw content with ReactMarkdown */}
             <ReactMarkdown 
               remarkPlugins={[remarkGfm]}
               components={{
                 // Custom styling to match "The Low Block" aesthetic
                 p: ({node, ...props}) => <p className="mb-4 leading-relaxed font-light tracking-wide text-chalk-white/90" {...props} />,
                 strong: ({node, ...props}) => <strong className="font-bold text-chalk-white" {...props} />,
                 ul: ({node, ...props}) => <ul className="list-disc list-outside ml-4 mb-4 space-y-2 marker:text-chalk-green" {...props} />,
                 ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-4 mb-4 space-y-2 marker:text-chalk-green" {...props} />,
                 li: ({node, ...props}) => <li className="text-chalk-gray/90 leading-relaxed pl-1" {...props} />,
                 h1: ({node, ...props}) => <h1 className="text-xl font-bold uppercase tracking-widest text-chalk-green mt-6 mb-4 border-b border-charcoal-700 pb-2" {...props} />,
                 h2: ({node, ...props}) => <h2 className="text-lg font-bold uppercase tracking-widest text-chalk-green mt-6 mb-3 border-b border-charcoal-700 pb-2" {...props} />,
                 h3: ({node, ...props}) => <h3 className="text-base font-bold text-chalk-white mt-4 mb-2" {...props} />,
                 blockquote: ({node, ...props}) => <blockquote className="border-l-2 border-chalk-green/50 pl-4 italic text-chalk-gray my-4" {...props} />,
               }}
             >
               {message.content}
             </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;