import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-vue-next"
import type { Toast } from "./useToast"

interface Props {
    emit: (evt: "close", id: string) => void;
    toast: Toast;
}

export const useToastItem = ({ emit, toast }: Props) => {


    const isVisible = ref(false)


    onMounted(() => {
        setTimeout(() => {
            isVisible.value = true
        }, 10)
    })

    const handleClose = () => {
        isVisible.value = false
        setTimeout(() => {
            // emit('close', toast.id);
        }, 200)
    }

    const getIcon = () => {
        switch (toast.type) {
            case 'success': return CheckCircle2
            case 'error': return AlertCircle
            case 'warning': return AlertTriangle
            case 'info': return Info
            default: return Info
        }
    }

    const getIconColorClasses = () => {
        switch (toast.type) {
            case 'success': return 'text-green-600 dark:text-green-400'
            case 'error': return 'text-red-600 dark:text-red-400'
            case 'warning': return 'text-yellow-600 dark:text-yellow-400'
            case 'info': return 'text-blue-600 dark:text-blue-400'
            default: return 'text-foreground'
        }
    }

    const getColorClasses = () => {
        switch (toast.type) {
            case 'success':
                return 'bg-green-50 border-green-200 bg-green-200 dark:bg-green-950 dark:border-green-800'
            case 'error':
                return 'bg-red-50 border-red-200 bg-red-200 dark:bg-red-950 dark:border-red-800'
            case 'warning':
                return 'bg-yellow-50 border-yellow-200 bg-yellow-200  dark:bg-yellow-950 dark:border-yellow-800'
            case 'info':
                return 'bg-blue-50 border-blue-200 bg-blue-200 dark:bg-blue-950 dark:border-blue-800'
            default:
                return 'bg-background border-border'
        }
    }

    const getTitleColorClasses = () => {
        switch (toast.type) {
            case 'success': return 'text-green-900 dark:text-green-100'
            case 'error': return 'text-red-900 dark:text-red-100'
            case 'warning': return 'text-yellow-900 dark:text-yellow-100'
            case 'info': return 'text-blue-900 dark:text-blue-100'
            default: return 'text-foreground'
        }
    }

    const getDescriptionColorClasses = () => {
        switch (toast.type) {
            case 'success': return 'text-green-700 dark:text-green-300'
            case 'error': return 'text-red-700 dark:text-red-300'
            case 'warning': return 'text-yellow-700 dark:text-yellow-300'
            case 'info': return 'text-blue-700 dark:text-blue-300'
            default: return 'text-muted-foreground'
        }
    }

    return {
        isVisible,
        handleClose,
        getIcon,
        getColorClasses, 
        getIconColorClasses,
        getTitleColorClasses,
        getDescriptionColorClasses
    };
}
