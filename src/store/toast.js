import { create } from 'zustand'

export const useToastStore = create((set, get) => ({
  toasts: [],
  
  addToast: (message, type = 'info', duration = 5000) => {
    const id = Date.now().toString()
    const toast = {
      id,
      message,
      type, // 'success', 'error', 'info', 'warning'
      duration,
      timestamp: new Date().toISOString()
    }
    
    set({ toasts: [...get().toasts, toast] })
    
    // Auto remove toast after duration
    setTimeout(() => {
      get().removeToast(id)
    }, duration)
    
    return id
  },
  
  removeToast: (id) => {
    set({ toasts: get().toasts.filter(toast => toast.id !== id) })
  },
  
  clearAllToasts: () => {
    set({ toasts: [] })
  }
}))

// Convenience functions for different toast types
export const toast = {
  success: (message, duration) => useToastStore.getState().addToast(message, 'success', duration),
  error: (message, duration) => useToastStore.getState().addToast(message, 'error', duration),
  info: (message, duration) => useToastStore.getState().addToast(message, 'info', duration),
  warning: (message, duration) => useToastStore.getState().addToast(message, 'warning', duration)
} 