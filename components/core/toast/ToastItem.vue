<script setup lang="ts">
import { X } from 'lucide-vue-next'
import type { Toast } from '@/composable/useToast';
import { useToastItem } from '@/composable/useToastItem';

const props = defineProps<{ toast: Toast }>()
const emit = defineEmits<{ close: [id: string] }>()

const {
    isVisible,
    handleClose,
    getColorClasses,
    getIcon,
    getIconColorClasses,
    getTitleColorClasses,
    getDescriptionColorClasses
} = useToastItem({  emit: emit, toast: props.toast });

</script>

<template>
    <div :class="[
        'pointer-events-auto w-full max-w-sm rounded-lg border shadow-lg transition-all duration-200',
        getColorClasses(),
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
    ]" role="alert" :aria-live="toast.type === 'error' ? 'assertive' : 'polite'">
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
            <button @click="handleClose" :class="[
                'flex-shrink-0 rounded-md p-1 transition-colors hover:bg-black/5 dark:hover:bg-white/10',
                getTitleColorClasses()
            ]" aria-label="Cerrar notificación">
                <X :size="16" />
            </button>
        </div>
    </div>
</template>