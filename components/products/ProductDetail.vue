<script setup lang="ts">
import { computed } from 'vue'
import { ShoppingCart, ArrowLeft, ChevronLeft, ChevronRight, Tag } from 'lucide-vue-next'
import type { Product } from '@/types/products'
import SkeletonProductDetail from './SkeletonProductDetail.vue';
import Separator from '../core/Separator.vue';
import { formatPrice } from '~/lib/formatPrice';
import { getDiscountedPrice } from '~/lib/discountedPrice';
import { useProductDetail } from '~/composable/useProductDetail';
import { useStore } from '~/store/useStore';
import { useProfile } from '~/composable/useProfile';


const props = withDefaults(defineProps<{
    product: Product | null
    isLoading?: boolean
    isAuthenticated: boolean
}>(), {
    isLoading: false,
})

// Emits
const emit = defineEmits<{
    addToCart: [product: Product]
}>();


const {
    currentImageIndex,
    currentImage,
    savings,
    nextImage,
    prevImage,
    selectImage,
    increaseQuantity,
    decreaseQuantity,
    addToCart,
    goBack,
} = useProductDetail({ product: props.product, isAuthenticated: props.isAuthenticated , emit });

const { productsCart } = storeToRefs(useStore());

const oProductCart = computed(() => {
    if (!props.product) return undefined;
    return productsCart.value.find((prod) => prod.id === props.product?.id);
});

</script>

<template>
    <div class="min-h-screen bg-background">
        <!-- Loading State -->
        <SkeletonProductDetail v-if="isLoading" />


        <!-- Product Cart Content -->
        <div v-else-if="oProductCart" class="container mx-auto px-4 py-8">
            <!-- Back Button -->
            <button @click="goBack"
                class="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6">
                <ArrowLeft :size="16" />
                <span>Volver a productos</span>
            </button>

            <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
                <!-- Image Gallery -->
                <div class="space-y-4">
                    <!-- Main Image -->
                    <div class="relative aspect-square rounded-lg overflow-hidden bg-muted border">
                        <img :src="currentImage" :alt="oProductCart.title" class="w-full h-full object-cover" />

                        <!-- Member Badge -->
                        <div v-if="isAuthenticated"
                            class="absolute top-4 right-4 bg-indigo-700/90 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                            <Tag :size="14" />
                            <span>-15%</span>
                        </div>

                        <!-- Navigation Arrows -->
                        <button v-if="currentImageIndex > 0" @click="prevImage"
                            class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors shadow-lg">
                            <ChevronLeft :size="20" />
                        </button>
                        <button
                            v-if="oProductCart.images.length > 1 && currentImageIndex < oProductCart.images.length - 1"
                            @click="nextImage"
                            class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors shadow-lg">
                            <ChevronRight :size="20" />
                        </button>

                        <!-- Image Counter -->
                        <div
                            class="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                            {{ currentImageIndex + 1 }} / {{ oProductCart.images.length }}
                        </div>
                    </div>

                    <!-- Thumbnails -->
                    <div class="grid grid-cols-4 gap-4">
                        <button v-for="(image, index) in oProductCart.images" :key="index" @click="selectImage(index)"
                            :class="[
                                'aspect-square rounded-md overflow-hidden border-2 transition-all',
                                currentImageIndex === index
                                    ? 'border-primary ring-2 ring-primary/20'
                                    : 'border-transparent hover:border-muted-foreground/30'
                            ]">
                            <img :src="image" :alt="`${oProductCart.title} - imagen ${index + 1}`"
                                class="w-full h-full object-cover" />
                        </button>
                    </div>
                </div>

                <!-- Product Info -->
                <div class="space-y-6">
                    <!-- Category Badge -->
                    <div>
                        <span
                            class="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full uppercase tracking-wide">
                            {{ oProductCart.category.name }}
                        </span>
                    </div>

                    <!-- Title -->
                    <h1 class="text-3xl md:text-4xl font-bold tracking-tight">
                        {{ oProductCart.title }}
                    </h1>

                    <!-- Member Benefit Message -->
                    <div v-if="isAuthenticated"
                        class="p-4 rounded-lg bg-indigo-700/90 text-white  border border-indigo-700/20">
                        <p class="text-sm font-medium text-primary flex items-center gap-2 ">
                            <Tag :size="16" />
                            <span>Como miembro, ahorras {{ formatPrice(savings) }} en este producto</span>
                        </p>
                    </div>

                    <!-- Price -->
                    <div class="space-y-2">
                        <div class="flex items-baseline gap-3">
                            <span v-if="isAuthenticated" class="text-xl text-muted-foreground line-through">
                                {{ formatPrice(oProductCart.price) }}
                            </span>
                            <span class="text-4xl font-bold text-foreground">
                                {{ formatPrice(getDiscountedPrice(oProductCart.price, isAuthenticated)) }}
                            </span>
                        </div>
                        <p v-if="isAuthenticated" class="text-sm text-muted-foreground fond-bold">
                            Precio exclusivo para miembros
                        </p>
                    </div>

                    <Separator class="my-6" />

                    <!-- Description -->
                    <div class="space-y-3">
                        <h2 class="text-lg font-semibold">Descripción</h2>
                        <p class="text-muted-foreground leading-relaxed">
                            {{ oProductCart.description }}
                        </p>
                    </div>

                    <Separator class="my-6" />

                    <!-- Quantity Selector -->
                    <div class="space-y-3">
                        <label class="text-sm font-semibold">Cantidad</label>
                        <div class="flex items-center gap-4">
                            <div class="flex items-center border rounded-md">
                                <button @click="decreaseQuantity"
                                    class="px-4 py-2 hover:bg-accent transition-colors disabled:opacity-50">
                                    -
                                </button>
                                <span class="px-6 py-2 border-x font-medium min-w-[60px] text-center">
                                    {{ oProductCart.quantity }}
                                </span>
                                <button @click="increaseQuantity" class="px-4 py-2 hover:bg-accent transition-colors">
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex gap-3 pt-4">
                        <button @click="addToCart" class="
                                flex-1 inline-flex items-center justify-center gap-2 rounded-md 
                                text-sm font-medium transition-colors 
                                bg-indigo-800 text-white hover:bg-indigo-400/90
                                h-12 px-6 shadow-lg hover:shadow-xl active:scale-95 transition-transform">
                            <ShoppingCart :size="20" />
                            <span>Producto en carrito</span>
                        </button>
                    </div>

                    <!-- Additional Info -->
                    <div class="space-y-3 pt-6 border-t">
                        <div class="flex justify-between text-sm">
                            <span class="text-muted-foreground">SKU:</span>
                            <span class="font-medium">{{ oProductCart.id }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-muted-foreground">Categoría:</span>
                            <span class="font-medium">{{ oProductCart.category.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Product Content -->
        <div v-else-if="product" class="container mx-auto px-4 py-8">
            <!-- Back Button -->
            <button @click="goBack"
                class="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-6">
                <ArrowLeft :size="16" />
                <span>Volver a productos</span>
            </button>

            <div class="grid md:grid-cols-2 gap-8 lg:gap-12">
                <!-- Image Gallery -->
                <div class="space-y-4">
                    <!-- Main Image -->
                    <div class="relative aspect-square rounded-lg overflow-hidden bg-muted border">
                        <img :src="currentImage" :alt="product.title" class="w-full h-full object-cover" />

                        <!-- Member Badge -->
                        <div v-if="isAuthenticated"
                            class="absolute top-4 right-4  bg-indigo-700/90 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                            <Tag :size="14" />
                            <span>-15%</span>
                        </div>

                        <!-- Navigation Arrows -->
                        <button v-if="currentImageIndex > 0" @click="prevImage"
                            class="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors shadow-lg">
                            <ChevronLeft :size="20" />
                        </button>
                        <button v-if="product.images.length > 1 && currentImageIndex < product.images.length - 1"
                            @click="nextImage"
                            class="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors shadow-lg">
                            <ChevronRight :size="20" />
                        </button>

                        <!-- Image Counter -->
                        <div
                            class="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                            {{ currentImageIndex + 1 }} / {{ product.images.length }}
                        </div>
                    </div>

                    <!-- Thumbnails -->
                    <div class="grid grid-cols-4 gap-4">
                        <button v-for="(image, index) in product.images" :key="index" @click="selectImage(index)"
                            :class="[
                                'aspect-square rounded-md overflow-hidden border-2 transition-all',
                                currentImageIndex === index
                                    ? 'border-primary ring-2 ring-primary/20'
                                    : 'border-transparent hover:border-muted-foreground/30'
                            ]">
                            <img :src="image" :alt="`${product.title} - imagen ${index + 1}`"
                                class="w-full h-full object-cover" />
                        </button>
                    </div>
                </div>

                <!-- Product Info -->
                <div class="space-y-6">
                    <!-- Category Badge -->
                    <div>
                        <span
                            class="inline-block px-3 py-1 text-xs font-semibold text-primary bg-primary/10 rounded-full uppercase tracking-wide">
                            {{ product.category.name }}
                        </span>
                    </div>

                    <!-- Title -->
                    <h1 class="text-3xl md:text-4xl font-bold tracking-tight">
                        {{ product.title }}
                    </h1>

                    <!-- Member Benefit Message -->
                    <div v-if="isAuthenticated"
                        class="p-4 rounded-lg bg-indigo-700/90 text-white border border-indigo-700/20">
                        <p class="text-sm font-medium text-primary flex items-center gap-2 ">
                            <Tag :size="16" />
                            <span>Como miembro, ahorras {{ formatPrice(savings) }} en este producto</span>
                        </p>
                    </div>

                    <!-- Price -->
                    <div class="space-y-2">
                        <div class="flex items-baseline gap-3">
                            <span v-if="isAuthenticated" class="text-xl text-muted-foreground line-through">
                                {{ formatPrice(product.price) }}
                            </span>
                            <span class="text-4xl font-bold text-foreground">
                                {{ formatPrice(getDiscountedPrice(product.price, isAuthenticated)) }}
                            </span>
                        </div>
                        <p v-if="isAuthenticated" class="text-sm text-muted-foreground fond-bold">
                            Precio exclusivo para miembros
                        </p>
                    </div>

                    <Separator class="my-6" />

                    <!-- Description -->
                    <div class="space-y-3">
                        <h2 class="text-lg font-semibold">Descripción</h2>
                        <p class="text-muted-foreground leading-relaxed">
                            {{ product.description }}
                        </p>
                    </div>

                    <Separator class="my-6" />

                    <!-- Quantity Selector -->
                    <div class="space-y-3">
                        <label class="text-sm font-semibold">Cantidad</label>
                        <div class="flex items-center gap-4">
                            <div class="flex items-center border rounded-md">
                                <button @click="decreaseQuantity" :disabled="true"
                                    class="px-4 py-2 hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                    -
                                </button>
                                <span class="px-6 py-2 border-x font-medium min-w-[60px] text-center">
                                    0
                                </span>
                                <button @click="addToCart" class="px-4 py-2 hover:bg-accent transition-colors">
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Actions -->
                    <div class="flex gap-3 pt-4">
                        <button @click="addToCart" class="
                                flex-1 inline-flex items-center justify-center gap-2 rounded-md 
                                text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 
                                h-12 px-6 shadow-lg hover:shadow-xl active:scale-95 transition-transform">
                            <ShoppingCart :size="20" />
                            <span>Agregar al carrito</span>
                        </button>
                    </div>


                    <!-- Additional Info -->
                    <div class="space-y-3 pt-6 border-t">
                        <div class="flex justify-between text-sm">
                            <span class="text-muted-foreground">SKU:</span>
                            <span class="font-medium">{{ product.id }}</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-muted-foreground">Categoría:</span>
                            <span class="font-medium">{{ product.category.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Error State -->
        <div v-else class="container mx-auto px-4 py-16 text-center">
            <div class="max-w-md mx-auto space-y-4">
                <div class="rounded-full bg-muted p-6 w-fit mx-auto">
                    <ShoppingCart :size="48" class="text-muted-foreground" />
                </div>
                <h2 class="text-2xl font-bold">Producto no encontrado</h2>
                <p class="text-muted-foreground">
                    Lo sentimos, no pudimos encontrar el producto que buscas.
                </p>
                <button @click="goBack"
                    class="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6">
                    <ArrowLeft :size="16" />
                    <span>Volver a la tienda</span>
                </button>
            </div>
        </div>
    </div>
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
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
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
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
}
</style>