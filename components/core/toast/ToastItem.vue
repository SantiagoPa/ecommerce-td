<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-vue-next'
import type { Toast } from '@/composable/useToast';

const props = defineProps<{ toast: Toast }>()
const emit = defineEmits<{ close: [id: string] }>()

const isVisible = ref(false)

onMounted(() => {
    setTimeout(() => {
        isVisible.value = true
    }, 10)
})

const handleClose = () => {
    isVisible.value = false
    setTimeout(() => {
        emit('close', props.toast.id)
    }, 200)
}

const getIcon = () => {
    switch (props.toast.type) {
        case 'success': return CheckCircle2
        case 'error': return AlertCircle
        case 'warning': return AlertTriangle
        case 'info': return Info
        default: return Info
    }
}

const getColorClasses = () => {
    switch (props.toast.type) {
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

const getIconColorClasses = () => {
    switch (props.toast.type) {
        case 'success': return 'text-green-600 dark:text-green-400'
        case 'error': return 'text-red-600 dark:text-red-400'
        case 'warning': return 'text-yellow-600 dark:text-yellow-400'
        case 'info': return 'text-blue-600 dark:text-blue-400'
        default: return 'text-foreground'
    }
}

const getTitleColorClasses = () => {
    switch (props.toast.type) {
        case 'success': return 'text-green-900 dark:text-green-100'
        case 'error': return 'text-red-900 dark:text-red-100'
        case 'warning': return 'text-yellow-900 dark:text-yellow-100'
        case 'info': return 'text-blue-900 dark:text-blue-100'
        default: return 'text-foreground'
    }
}

const getDescriptionColorClasses = () => {
    switch (props.toast.type) {
        case 'success': return 'text-green-700 dark:text-green-300'
        case 'error': return 'text-red-700 dark:text-red-300'
        case 'warning': return 'text-yellow-700 dark:text-yellow-300'
        case 'info': return 'text-blue-700 dark:text-blue-300'
        default: return 'text-muted-foreground'
    }
}
</script>

<template>
    <div 
        :class="[
            'pointer-events-auto w-full max-w-sm rounded-lg border shadow-lg transition-all duration-200',
            getColorClasses(),
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
        ]" 
        role="alert" 
        :aria-live="toast.type === 'error' ? 'assertive' : 'polite'"
    >
        <div class="flex items-start gap-3 p-4">
            <!-- Icon -->
            <div :class="['flex-shrink-0 mt-0.5', getIconColorClasses()]">
                <component :is="getIcon()" :size="20" />
            </div>

            <!-- Content -->
            <div class="flex-1 space-y-1">
                <p :class="['text-sm font-semibold leading-tight', getTitleColorClasses()]">
                    {{ toast.title }}
                </p>
                <p v-if="toast.description" :class="['text-sm leading-tight', getDescriptionColorClasses()]">
                    {{ toast.description }}
                </p>
            </div>

            <!-- Close Button -->
            <button 
                @click="handleClose" 
                :class="[
                    'flex-shrink-0 rounded-md p-1 transition-colors hover:bg-black/5 dark:hover:bg-white/10',
                    getTitleColorClasses()
                ]" 
                aria-label="Cerrar notificación"
            >
                <X :size="16" />
            </button>
        </div>
    </div>
</template>