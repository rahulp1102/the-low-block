export type Role = 'user' | 'assistant';

// NEW: Define the available modes
export type AnalysisMode = 'tactical' | 'scout' | 'pundit';

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  mode: AnalysisMode; // NEW: Track current mode
}

export interface ChatContextType extends ChatState {
  sendMessage: (content: string) => Promise<void>;
  clearChat: () => void;
  setMode: (mode: AnalysisMode) => void; // NEW: Function to change mode
}