// composables/usePersistedCart.ts
export const usePersisted = (keyStorage: string) => {
    const STORAGE_KEY = keyStorage;
    
    const saveToStorage = (data: any) => {
        if (process.client) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
            } catch (error) {
                console.error('Error saving to localStorage:', error)
            }
        }
    }
    
    const loadFromStorage = () => {
        if (process.client) {
            try {
                const data = localStorage.getItem(STORAGE_KEY)
                return data ? JSON.parse(data) : null
            } catch (error) {
                console.error('Error loading from localStorage:', error)
                return null
            }
        }
        return null
    }
    
    return {
        saveToStorage,
        loadFromStorage
    }
}