import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Message, ChatContextType, Role, AnalysisMode } from '../types';
import { fetchAIResponse } from '../services/ai';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mode, setMode] = useState<AnalysisMode>('tactical'); // NEW: Default mode

  const addMessage = (role: Role, content: string) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      role,
      content,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  };

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    setError(null);
    const userMsg = addMessage('user', content);
    
    setIsLoading(true);

    try {
      const currentHistory = [...messages, userMsg];
      
      // NEW: Pass the 'mode' to the API
      const responseContent = await fetchAIResponse(currentHistory, mode);
      
      addMessage('assistant', responseContent);
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve tactical analysis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [messages, mode]); // NEW: Add 'mode' to dependencies

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return (
    <ChatContext.Provider value={{ messages, isLoading, error, mode, sendMessage, clearChat, setMode }}>
      {children}
    </ChatContext.Provider>
  );
};