import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
}

// Estado global reactivo
const toasts = ref<Toast[]>([])
let toastIdCounter = 0

export const useToast = () => {
  
  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = `toast-${++toastIdCounter}-${Date.now()}`
    const newToast: Toast = {
      id,
      duration: 4000,
      ...toast
    }
    toasts.value.push(newToast)
    // Auto remove después de la duración
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }

    return id
  }

  const removeToast = (id: string) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (title: string, description?: string, duration = 4000) => {
    return addToast({ type: 'success', title, description, duration })
  }

  const error = (title: string, description?: string, duration = 4000) => {
    return addToast({ type: 'error', title, description, duration })
  }

  const info = (title: string, description?: string, duration = 4000) => {
    return addToast({ type: 'info', title, description, duration })
  }

  const warning = (title: string, description?: string, duration = 4000) => {
    return addToast({ type: 'warning', title, description, duration })
  }

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
    warning
  }
}