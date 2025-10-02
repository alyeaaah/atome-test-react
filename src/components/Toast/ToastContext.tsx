
import { createContext, ReactNode, useContext } from 'react';

export interface ToastContentInterface {
  icon?: ReactNode;
  variant?: "danger" | "success" | "warning" | "info";
  duration: number;
  title?: string;
  text: string;
  action?: {
    onClick: () => void;
    text: string;
  };
}

interface ToastContextType {
  showNotification: (content: ToastContentInterface) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};