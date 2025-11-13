
import { defineStore } from 'pinia'
import type { ProductCart, StateStoreCart } from '~/types/cart'
import type { Product } from '~/types/products'

export const useStore = defineStore('cart', {
    state: (): StateStoreCart => ({
        productsCart: []
    }),
    getters: {
        getProductsCart: (state): ProductCart[] => state.productsCart,
        getTotalItems: (state): number => {
            if (state.productsCart.length === 0) return 0;
            return state.productsCart.reduce((acc, el) => acc += el.quantity, 0);
        },
        getUniqItems: (state): number => {
            if (state.productsCart.length === 0) return 0;
            return state.productsCart.length;
        },
        getTotalPrices: (state) => {
            if (state.productsCart.length === 0) return 0;
            return state.productsCart.reduce((acc, el) => {
                acc += el.price * el.quantity;
                return acc;
            }, 0);
        }
    },
    actions: {
        onAddCart(product: Product) {
            const findProdut = this.productsCart.find((prod) => prod.id === product.id);
            if (findProdut) {
                const newState = this.productsCart.map((prod) => prod.id === findProdut.id ? { ...findProdut, quantity: findProdut.quantity += 1 } : prod)
                // localStorage.setItem('cart', JSON.stringify(newState));
                this.productsCart = newState;
            } else {
                const newState = [...this.productsCart, { ...product, quantity: 1 }]
                // localStorage.setItem('cart', JSON.stringify(newState));
                this.productsCart = newState;
            }
        },
        onPlusItemQuantity(product: Product) {
            const findProdut = this.productsCart.find((prod) => prod.id === product.id);
            if (!findProdut) return;
            const newState = this.productsCart.map((prod) => prod.id === findProdut.id ? { ...findProdut, quantity: findProdut.quantity += 1 } : prod)
            // localStorage.setItem('cart', JSON.stringify(newState));
            this.productsCart = newState;
        },
        onMinusItemQuantity(product: Product) {
            const findProdut = this.productsCart.find((prod) => prod.id === product.id);
            if (!findProdut) return;

            if (findProdut.quantity > 1) {
                const newState = this.productsCart.map((prod) => prod.id === findProdut.id ? { ...findProdut, quantity: findProdut.quantity -= 1 } : prod)
                // localStorage.setItem('cart', JSON.stringify(newState));
                this.productsCart = newState;
            } else {
                // se elimina el prodcuto del carrito si tiene Quantity: 1
                const newState = this.productsCart.filter(prod => prod.id !== product.id)
                // localStorage.setItem('cart', JSON.stringify(newState));
                this.productsCart = newState;
            }
        }
    },
    // persist: {
    //     key: 'cart-store',
    //     storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    // },
})