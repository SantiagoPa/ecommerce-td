<script setup lang="ts">
import { ShoppingCart } from 'lucide-vue-next'
import SkeletonProducts from './SkeletonProducts.vue'
import ProductsHeader from './ProductsHeader.vue'
import type { Product } from '@/types/products';
import ProductItem from './ProductItem.vue';


const props = withDefaults(defineProps<{
    products: Product[]
    isLoading?: boolean
    isAuthenticated?: boolean
}>(), {
    isLoading: false,
    isAuthenticated: false,
})

// Emits
const emit = defineEmits<{
    addToCart: [product: Product]
}>()

// Métodos
const addToCart = (product: Product) => {
    emit('addToCart', product);
}

</script>

<template>
    <section class="w-full py-8 md:py-12 lg:py-16">
        <div class="container mx-auto px-4">

            <ProductsHeader :is-authenticated="isAuthenticated" />

            <!-- Loading State -->
            <SkeletonProducts v-if="isLoading" />


            <!-- Products Grid -->
            <div v-else-if="products.length > 0"
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <article v-for="product in products" :key="product.id"
                    class="group rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden transition-all hover:shadow-lg hover:border-primary/50">
                    <!-- Image Container -->
                    <ProductItem
                        :product="product"
                        :is-authenticated="isAuthenticated"
                        :add-to-cart="addToCart"
                    />
                </article>
            </div>

            <!-- Empty State -->
            <div v-else class="flex flex-col items-center justify-center py-16 text-center text-red-500 bg-red-100 rounded-sm">
                <div class="rounded-full bg-muted p-6 mb-4">
                    <ShoppingCart :size="48" class="text-muted-foreground" />
                </div>
                <h3 class="text-xl font-semibold mb-2">No hay productos disponibles</h3>
                <p class="text-muted-foreground max-w-md">
                    Lo sentimos, no se pudo encontrar productos
                </p>
            </div>

        </div>
    </section>
</template>

<style scoped>
/* Variables CSS para shadcn/ui */
:root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --border: 214.3 31.8% 91.4%;
}

.dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --border: 217.2 32.6% 17.5%;
}

/* Utilidad para truncar texto */
.line-clamp-2 {
    display: -webkit-box;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>