<script setup lang="ts">
import { BanknoteArrowUp, PackagePlus, StoreIcon } from 'lucide-vue-next';
import { useProfile } from '~/composable/useProfile';
import { getDiscountedPrice } from '~/lib/discountedPrice';
import { formatPrice } from '~/lib/formatPrice';
import { useStore } from '~/store/useStore';
import type { Product } from '~/types/products';


const { isAuthenticated } = useProfile();
const { getTotalItems, getProductsCart } = storeToRefs(useStore());
const { onPlusItemQuantity, onMinusItemQuantity } = useStore();

const formatPriceMessageDisccount = computed(() => {
    return (product: Product) => isAuthenticated.value
        ? formatPrice(getDiscountedPrice(product.price, isAuthenticated.value))
        : formatPrice(getDiscountedPrice(product.price, false))
});

const priceMessageDisccount = computed(()=>{
    return (product: Product) => isAuthenticated.value
    ? getDiscountedPrice(product.price, isAuthenticated.value)
    : getDiscountedPrice(product.price, false)
})

</script>

<template>
    <div class="w-full mt-8 md:mt-8 lg:mt-16 bg-white mx-1 border-2 border-gray-200 rounded-md">

        <h1
            class="flex flex-row gap-2 text-center justify-center text-lg bg-gray-50 rounded-lg p-2 text-indigo-950 font-bold">
            <StoreIcon />
            <span>
                Mi Carrito ({{ getTotalItems }})
            </span>
        </h1>

        <article class="h-[80vh] overflow-y-auto flex flex-col gap-5 mt-5">
            <div v-for="product in getProductsCart" :key="product.id"
                class=" bg-gray-50 mx-2 flex flex-col text-center">
                <span class="text-indigo-700 font-bold">
                    {{ product.title }}
                </span>
                <span class="flex flex-row justify-center text-center gap-2">
                    <span>
                        {{ product.quantity }}
                    </span>
                    <PackagePlus />
                </span>
                <span class="">{{ formatPriceMessageDisccount(product) }} x {{ product.quantity }}</span>
                <span class="flex flex-row font-bold justify-center text-center gap-2">
                    <BanknoteArrowUp />
                    <span>
                        {{ formatPrice(priceMessageDisccount(product) * product.quantity) }}
                    </span>
                </span>
                <div class="flex  justify-center items-center gap-4 mb-2 mt-2">
                    <div class="flex items-center border rounded-md">
                        <button @click="onMinusItemQuantity(product)"
                            class="px-2 py-1 hover:bg-accent transition-colors rounded-l-md">
                            -
                        </button>
                        <span class="px-2 py-1 border-x font-medium min-w-[30px] text-center">
                            {{ product.quantity }}
                        </span>
                        <button @click="onPlusItemQuantity(product)"
                            class="px-2 py-1 hover:bg-accent transition-colors rounded-r-md">
                            +
                        </button>
                    </div>
                </div>
            </div>
        </article>
    </div>
</template>