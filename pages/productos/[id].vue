<script setup lang="ts">
import ProductDetail from '@/components/products/ProductDetail.vue';
import { useProducts } from '@/composable/useProducts';
import type { Product } from '@/types/products';
import { useToast } from '@/composable/useToast';
import { useStore } from '~/store/useStore';
import { useProfile } from '~/composable/useProfile';


// Obtener el ID de la ruta
const route = useRoute()
const productId = route.params.id

// Composable de productos
const { getProductById } = useProducts();
const { onAddCart } = useStore();

// Obtener producto específico con SSR
const { data: product, error, pending } = await getProductById(productId as string)

// SEO dinámico basado en el producto
useHead({
    title: computed(() => product.value ? `${product.value.title}` : 'Producto - TiendaApp'),
    meta: [
        {
            name: 'description',
            content: computed(() => product.value?.description || 'Detalle del producto')
        },
        {
            property: 'og:title',
            content: computed(() => product.value?.title || 'Producto')
        },
        {
            property: 'og:description',
            content: computed(() => product.value?.description || '')
        },
        {
            property: 'og:image',
            content: computed(() => product.value?.images[0] || '')
        }
    ]
})
// Manejar agregar al carrito
const onAddToCart = (product: Product) => {
    const toast = useToast();
    onAddCart(product);
    toast.success('Producto agregado', 'El producto se agregó al carrito correctamente')
}

</script>

<template>
    <div>
         <ClientOnly fallback-tag="div">
             <ProductDetail :product="product" :is-loading="pending" @add-to-cart="onAddToCart" />
         </ClientOnly>
    </div>
</template>