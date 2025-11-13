import { computed, type Ref } from 'vue'

interface Props {
    siblingCount: number;
    totalPages: number;
    currentPage: Ref<number>;
    emit: (evt: "pageChange", page: number) => void
}

export const usePagination = ({ siblingCount, totalPages, currentPage, emit }: Props) => {


    // Generar rango de números
    const range = (start: number, end: number): number[] => {
        const length = end - start + 1
        return Array.from({ length }, (_, i) => start + i)
    }

    // Calcular items de paginación
    const paginationRange = computed(() => {
        // Usar unref para obtener el valor, funciona con ref o valor directo

        const totalPageNumbers = siblingCount + 5 // siblingCount + firstPage + lastPage + currentPage + 2*DOTS

        // Si el total de páginas es menor que los números que queremos mostrar
        if (totalPageNumbers >= totalPages) {
            return range(1, totalPages)
        }

        const leftSiblingIndex = Math.max(currentPage.value - siblingCount, 1)
        const rightSiblingIndex = Math.min(currentPage.value + siblingCount, totalPages)

        const shouldShowLeftDots = leftSiblingIndex > 2
        const shouldShowRightDots = rightSiblingIndex < totalPages - 2

        const firstPageIndex = 1
        const lastPageIndex = totalPages

        // No hay dots a la izquierda, pero sí a la derecha
        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount
            const leftRange = range(1, leftItemCount)
            return [...leftRange, 'dots', totalPages]
        }

        // Hay dots a la izquierda, pero no a la derecha
        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount
            const rightRange = range(totalPages - rightItemCount + 1, totalPages)
            return [firstPageIndex, 'dots', ...rightRange]
        }

        // Hay dots en ambos lados
        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex)
            return [firstPageIndex, 'dots', ...middleRange, 'dots', lastPageIndex]
        }

        return []
    })

    const canGoPrevious = computed(() => currentPage.value > 1)
    const canGoNext = computed(() => currentPage.value < totalPages)

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages && page !== currentPage.value) {
            emit('pageChange', page)
        }
    }

    const goToPrevious = () => {
        if (canGoPrevious.value) {
            goToPage(currentPage.value - 1)
        }
    }

    const goToNext = () => {
        if (canGoNext.value) {
            goToPage(currentPage.value + 1)
        }
    }

    return {
        paginationRange,
        canGoPrevious,
        canGoNext,
        goToPage,
        goToPrevious,
        goToNext,
    }
}
