import { usePersisted } from "~/composable/usePersisted"
import { useStore } from "~/store/useStore"
// import type { ProductCart } from "~/types/cart";

// plugins/persist-cart.client.ts
export default defineNuxtPlugin(() => {
    const cartStore = useStore();
    const { saveToStorage } = usePersisted('cart-store');

    // const stored = loadFromStorage() as { productsCart: ProductCart[] } | null
    // console.log('📦 Datos cargados del localStorage:', stored)

    // if (stored && stored.productsCart) {
    //     cartStore.$patch(stored)
    //     console.log('✅ Estado restaurado:', cartStore.$state)
    // }

    // Auto-persistir cada vez que el estado cambie
    watch(
        () => cartStore.$state,
        (state) => {
            saveToStorage(state)
        },
        { deep: true }
    )
})