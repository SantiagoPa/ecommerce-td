import type { Product } from "./products";

export interface ProductCart extends Product {
    quantity: number;
}

export interface StateStoreCart {
    productsCart: ProductCart[];
}