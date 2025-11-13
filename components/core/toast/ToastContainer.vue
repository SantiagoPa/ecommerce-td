<script setup lang="ts">
import { useToast } from '@/composable/useToast';
import ToastItem from './ToastItem.vue';

const { toasts, removeToast } = useToast();

</script>

<template>
    <Teleport to="body">
        <div 
            class="fixed top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 p-4 pointer-events-none w-full max-w-md"
            style="z-index: 9999;"
            aria-live="polite" 
            aria-atomic="true"
        >
            <TransitionGroup name="toast" tag="div" class="flex flex-col items-center gap-2 w-full">
                <ToastItem 
                    v-for="toast in toasts" 
                    :key="toast.id" 
                    :toast="toast" 
                    @close="removeToast" 
                />
            </TransitionGroup>
        </div>
    </Teleport>
</template>

<style scoped>
.toast-enter-active {
    transition: all 0.3s ease-out;
}

.toast-leave-active {
    transition: all 0.2s ease-in;
}

.toast-enter-from {
    opacity: 0;
    transform: translateY(-2rem);
}

.toast-leave-to {
    opacity: 0;
    transform: translateX(2rem) scale(0.95);
}

.toast-move {
    transition: transform 0.3s ease;
}
</style>