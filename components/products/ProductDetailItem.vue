<script setup lang="ts">
import { getDiscountedPrice } from '~/lib/discountedPrice';
import { formatPrice } from '~/lib/formatPrice';
import type { ProductCart } from '~/types/cart';


const props = defineProps<{
    product: ProductCart;
    goBack: () => void;
    isAuthenticated: boolean;
    currentImageIndex: number;
    currentImage: string;
    savings: number;
    nextImage: () => void;
    prevImage: () => void;
    selectImage: (index: number) => void;
    increaseQuantity: () => void;
    decreaseQuantity: () => void;
    addToCart: () => void;
    isProductInCart: boolean;
}>();

</script>

<template>
  
</template>