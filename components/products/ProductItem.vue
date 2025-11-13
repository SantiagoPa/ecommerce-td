<script setup lang="ts">
import { ShoppingCart } from 'lucide-vue-next';
import { useProfile } from '~/composable/useProfile';
import { getDiscountedPrice } from '~/lib/discountedPrice';
import { formatPrice } from '~/lib/formatPrice';
import { useStore } from '~/store/useStore';
import type { Product } from '~/types/products';

const props = defineProps<{
    product: Product;
    addToCart: (product: Product) => void;
}>()

const { isAuthenticated } = useProfile();

const { productsCart } = storeToRefs(useStore());

const isProductInCart = computed(() => {
    return Boolean(productsCart.value.find((prod) => prod.id === props.product.id));
});

const discountMessage = computed(() => {
    return isAuthenticated.value ? '-15%' : '';
});

const formatPriceMessage = computed(() => {
    return isAuthenticated.value ? formatPrice(props.product.price) : '';
});

const formatPriceMessageDisccount = computed(() => {
    return isAuthenticated.value 
        ? formatPrice(getDiscountedPrice(props.product.price, isAuthenticated.value)) 
        : formatPrice(getDiscountedPrice(props.product.price, false))
});

// Calcular precio con descuento para miembros
</script>

<template>
    <NuxtLink :to="`/productos/${product.id}`" class="block relative aspect-square overflow-hidden bg-muted">
        <img :src="product.images[0]" :alt="product.title"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />

        <!-- Member Badge -->
        <ClientOnly fallback-tag="span">
            <span v-if="discountMessage" class="absolute top-2 right-2 bg-indigo-700/80 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                {{ discountMessage }}
            </span>
        </ClientOnly>
    </NuxtLink>

    <!-- Card Content -->
    <div class="p-4 space-y-3">
        <!-- Category -->
        <div class="flex items-center gap-2">
            <span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {{ product.category.name }}
            </span>
        </div>

        <!-- Title -->
        <NuxtLink :to="`/productos/${product.id}`">
            <h3 class="font-semibold text-base leading-tight line-clamp-2 hover:text-primary transition-colors">
                {{ product.title }}
            </h3>
        </NuxtLink>

        <!-- Price -->
        <div class="flex items-baseline gap-2">
            <ClientOnly fallback-tag="span">
                <span class="text-sm text-muted-foreground line-through">
                    {{ formatPriceMessage }}
                </span>
            </ClientOnly>
            <ClientOnly fallback-tag="span">
                <span class="text-xl font-bold text-foreground">
                    {{ formatPriceMessageDisccount }}
                </span>
            </ClientOnly>
        </div>

        <!-- Add to Cart Button -->
        <button @click="addToCart(product)" class="
                w-full inline-flex items-center justify-center gap-2 
                rounded-md text-sm font-medium transition-colors bg-primary 
                text-primary-foreground hover:bg-primary/90 h-10 px-4 shadow 
                hover:shadow-md active:scale-95 transition-transform
            " v-if="!isProductInCart">
            <ShoppingCart :size="18" />
            <span>Agregar al carrito</span>
        </button>

        <!-- product in Cart Button -->
        <button @click="addToCart(product)" class="
                w-full inline-flex items-center justify-center gap-2 
                rounded-md text-sm font-medium transition-colors
                bg-indigo-800
                text-white hover:bg-indigo-400/90 h-10 px-4 shadow 
                hover:shadow-md active:scale-95 transition-transform
            " v-else>
            <ShoppingCart :size="18" />
            <span>Producto en carrito</span>
        </button>
    </div>
</template>