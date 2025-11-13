<script setup lang="ts">
import { ref, computed } from 'vue'
import ProductsGrid from '@/components/products/ProductsGrid.vue';
import { useProducts } from '@/composable/useProducts';
import type { Product } from '@/types/products';
import Pagination from '@/components/Pagination.vue';
import { useToast } from '@/composable/useToast';
import { useStore } from '~/store/useStore';

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

// Paginación
const currentPage = ref(1)
const itemsPerPage = ref(12)

//loader
const isLoading = ref(false);

// Composable de productos
const { getProducts } = useProducts();

const store = useStore();

// Obtener productos con SSR - esto se ejecuta en el servidor
isLoading.value = true;
const { data: products, error, pending, refresh } = await getProducts(
    currentPage.value,
    itemsPerPage.value
)
isLoading.value = false;
// Simular autenticación (esto vendría de tu auth store)
const isAuthenticated = ref(false)

// Manejar cambio de página
const handlePageChange = async (page: number) => {
    console.log({ currentPage: currentPage.value, page });
    currentPage.value = page
    console.log({ currentPage: currentPage.value, page });
    // Recargar productos con nueva página
    const { data: newProducts } = await getProducts(page, itemsPerPage.value)

    if (newProducts.value) {
        products.value = newProducts.value
    }

    // Scroll suave al top
    window.scrollTo({ top: 0, behavior: 'smooth' })
}


// Calcular total de páginas (la API no devuelve total, así que estimamos)
const totalPages = computed(() => {
    // La API de Platzi tiene aproximadamente 200 productos
    return Math.ceil(200 / itemsPerPage.value)
})

const addToCart = (product: Product) => {
    const toast = useToast();
    store.onAddCart(product);
    toast.success('Producto agregado', `El producto ${product.title} se agregó al carrito correctamente`)
}

</script>

<template>
    <div class="min-h-screen bg-background">
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
        <ProductsGrid v-else 
            :products="products || []" 
            :is-loading="isLoading" 
            :is-authenticated="isAuthenticated"
            @add-to-cart="addToCart" 
        />

        <!-- Pagination -->
        <div v-if="!pending && !error && products" class="container mx-auto px-4 pb-16">
            <Pagination 
                :current-page="currentPage" 
                :total-pages="6" 
                :sibling-count="1"
                :has-products="products?.length > 0"
                @page-change="handlePageChange" 
            />
        </div>
    </div>
</template>