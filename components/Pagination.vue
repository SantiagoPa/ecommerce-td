<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
    currentPage: number
    totalPages: number
    siblingCount?: number
    showFirstLast?: boolean
}>(), {
    siblingCount: 1,
    showFirstLast: true
})

const emit = defineEmits<{
    pageChange: [page: number]
}>()

// Generar rango de números
const range = (start: number, end: number): number[] => {
    const length = end - start + 1
    return Array.from({ length }, (_, i) => start + i)
}

// Calcular items de paginación
const paginationRange = computed(() => {
    const totalPageNumbers = props.siblingCount + 5 // siblingCount + firstPage + lastPage + currentPage + 2*DOTS

    // Si el total de páginas es menor que los números que queremos mostrar
    if (totalPageNumbers >= props.totalPages) {
        return range(1, props.totalPages)
    }

    const leftSiblingIndex = Math.max(props.currentPage - props.siblingCount, 1)
    const rightSiblingIndex = Math.min(props.currentPage + props.siblingCount, props.totalPages)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < props.totalPages - 2

    const firstPageIndex = 1
    const lastPageIndex = props.totalPages

    // No hay dots a la izquierda, pero sí a la derecha
    if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3 + 2 * props.siblingCount
        const leftRange = range(1, leftItemCount)
        return [...leftRange, 'dots', props.totalPages]
    }

    // Hay dots a la izquierda, pero no a la derecha
    if (shouldShowLeftDots && !shouldShowRightDots) {
        const rightItemCount = 3 + 2 * props.siblingCount
        const rightRange = range(props.totalPages - rightItemCount + 1, props.totalPages)
        return [firstPageIndex, 'dots', ...rightRange]
    }

    // Hay dots en ambos lados
    if (shouldShowLeftDots && shouldShowRightDots) {
        const middleRange = range(leftSiblingIndex, rightSiblingIndex)
        return [firstPageIndex, 'dots', ...middleRange, 'dots', lastPageIndex]
    }

    return []
})

const canGoPrevious = computed(() => props.currentPage > 1)
const canGoNext = computed(() => props.currentPage < props.totalPages)

const goToPage = (page: number) => {
    if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
        emit('pageChange', page)
    }
}

const goToPrevious = () => {
    if (canGoPrevious.value) {
        goToPage(props.currentPage - 1)
    }
}

const goToNext = () => {
    if (canGoNext.value) {
        goToPage(props.currentPage + 1)
    }
}

</script>

<template>
    <nav role="navigation" aria-label="Paginación" class="flex items-center justify-center">
        <ul class="flex items-center gap-1">
            <!-- Previous Button -->
            <li>
                <button @click="goToPrevious" :disabled="!canGoPrevious"
                    :aria-label="canGoPrevious ? 'Ir a página anterior' : 'No hay página anterior'"
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9">
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
                <button @click="goToNext" :disabled="!canGoNext"
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