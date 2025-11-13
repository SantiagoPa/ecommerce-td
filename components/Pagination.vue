<script setup lang="ts">
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-vue-next'
import { usePagination } from '~/composable/usePagination';
import { cn } from '~/lib/utils';

const props = withDefaults(defineProps<{
    currentPage: number
    totalPages: number
    hasProducts: boolean;
    siblingCount?: number
    showFirstLast?: boolean
}>(), {
    siblingCount: 1,
    showFirstLast: true
})

const emit = defineEmits<{
    pageChange: [page: number]
}>()

const currentPageRef = toRef(props, 'currentPage');
const hasProductsRef = toRef(props, 'hasProducts');

const {
    paginationRange,
    canGoNext,
    canGoPrevious,
    goToPrevious,
    goToNext,
    goToPage,
} = usePagination({ 
    siblingCount: props.siblingCount, 
    totalPages: props.totalPages, 
    currentPage: currentPageRef, 
    emit }
);

</script>

<template>
    <nav role="navigation" aria-label="Paginación" class="flex items-center justify-center">
        <ul class="flex items-center gap-1">
            <!-- Previous Button -->
            <li>
                <button @click="goToPrevious" :disabled="!canGoPrevious"
                    :aria-label="canGoPrevious ? 'Ir a página anterior' : 'No hay página anterior'"
                    :class="cn(
                        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9',
                        `${ !canGoPrevious ? 'text-gray-500 cursor-not-allowed' : ''}`
                    )">
                    <ChevronLeft :size="16" />
                </button>
            </li>

            <!-- Page Numbers -->
            <li v-for="(item, index) in paginationRange" :key="index">
                <!-- Dots -->
                <span v-if="item === 'dots'"
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium h-9 w-9"
                    aria-hidden="true">
                    <MoreHorizontal :size="16" class="text-muted-foreground" />
                </span>

                <!-- Page Number -->
                <button v-else @click="goToPage(item as number)" :aria-label="`Ir a página ${item}`"
                    :aria-current="item === currentPage ? 'page' : undefined" :class="[
                        'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 w-9',
                        item === currentPage
                            ? 'bg-gray-200 text-primary-foreground hover:bg-primary/90 shadow-sm'
                            : 'hover:bg-accent hover:text-accent-foreground'
                    ]">
                    {{ item }}
                </button>
            </li>

            <!-- Next Button -->
            <li>
                <button @click="goToNext" :disabled="!canGoNext || !hasProductsRef"
                    :aria-label="canGoNext ? 'Ir a página siguiente' : 'No hay página siguiente'"
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9">
                    <ChevronRight :size="16" />
                </button>
            </li>
        </ul>
    </nav>

    <!-- Mobile Info (opcional) -->
    <div class="flex justify-center mt-4 md:hidden">
        <p class="text-sm text-muted-foreground">
            Página {{ currentPage }} de {{ totalPages }}
        </p>
    </div>
</template>

<style scoped>
/* Variables CSS para shadcn/ui */
:root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --ring: 222.2 84% 4.9%;
}

.dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --muted-foreground: 215 20.2% 65.1%;
    --ring: 212.7 26.8% 83.9%;
}
</style>