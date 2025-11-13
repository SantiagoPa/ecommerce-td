<script setup lang="ts">
import ProductsGrid from '@/components/products/ProductsGrid.vue';
import Pagination from '@/components/Pagination.vue';
import { useProductPage } from '~/composable/useProductPage';
import CartSummary from '~/components/products/CartSummary.vue';
import { useProfile } from '~/composable/useProfile';

// SEO Meta tags
useHead({
    title: 'Productos TD',
    meta: [
        {
            name: 'Tienda de productos',
            content: 'Descubre nuestra colección exclusiva de productos'
        }
    ]
});

const {
    currentPage,
    isLoading,
    products,
    error,
    pending,
    refresh,
    handlePageChange,
    addToCart
} = await useProductPage();

</script>

<template>
    <div class="min-h-screen bg-background grid grid-cols-1 lg:grid-cols-5 mx-3">
        <!-- Error State -->
        <div v-if="error" class="container mx-auto px-4 py-16 text-center">
            <div class="max-w-md mx-auto space-y-4">
                <div class="rounded-full bg-red-100 dark:bg-red-900/20 p-6 w-fit mx-auto">
                    <svg class="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-foreground">Error al cargar productos</h2>
                <p class="text-muted-foreground">{{ error.message }}</p>
                <button @click="() => refresh()"
                    class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6">
                    Intentar de nuevo
                </button>
            </div>
        </div>

        <!-- Products Section -->
        <div v-else class="col-span-1 lg:col-span-4">
            <ProductsGrid :products="products || []" :is-loading="isLoading" @add-to-cart="addToCart" />

            <!-- Pagination -->
            <div v-if="!pending && !error && products" class="container mx-auto px-4 pb-16">
                <Pagination :current-page="currentPage" :total-pages="6" :sibling-count="1"
                    :has-products="products?.length > 0" @page-change="handlePageChange" />
            </div>
        </div>

        <div class="col-span-1 lg:col-span-1">
            <CartSummary />
        </div>
    </div>
</template>