import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Message, ChatContextType, Role } from '../types';
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
  // Start empty to show the introductory empty state
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    // Add user message immediately
    const userMsg = addMessage('user', content);
    
    setIsLoading(true);

    try {
      // Pass the updated history (including the new user message) to the service
      // We reconstruct the array here because 'setMessages' is async
      const currentHistory = [...messages, userMsg];
      
      const responseContent = await fetchAIResponse(currentHistory);
      
      addMessage('assistant', responseContent);
    } catch (err) {
      console.error(err);
      setError("Failed to retrieve tactical analysis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return (
    <ChatContext.Provider value={{ messages, isLoading, error, sendMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
};