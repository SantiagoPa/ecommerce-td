
import { defineStore } from 'pinia'
import type { ProductCart, StateStoreCart } from '~/types/cart'
import type { Product } from '~/types/products'

export const useStore = defineStore('cart', {
    state: (): StateStoreCart => ({
        productsCart: [],
    }),
    getters: {
        getProductsCart: (state): ProductCart[] => state.productsCart,
        getTotalItems: (state): number => {
            if (state.productsCart.length === 0) return 0;
            return state.productsCart.reduce((acc, el) => acc += el.quantity, 0);
        },
        getProductById: (state): ((productId: number) => ProductCart | undefined) => {
            return (productId: number) => state.productsCart.find((prod)=>prod.id === productId);
        }
    },
    actions: {
        onAddCart(product: Product){
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
            const newState = this.productsCart.map((prod)=>prod.id === findProdut.id ? {...findProdut, quantity: findProdut.quantity +=1 } : prod )
            // localStorage.setItem('cart', JSON.stringify(newState));
            this.productsCart = newState;
        },
        onMinusItemQuantity(product: Product){
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
    }
})