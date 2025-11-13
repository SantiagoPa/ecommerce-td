import { useStore } from "~/store/useStore";
import { useProducts } from "./useProducts";
import { useToast } from "./useToast";
import type { Product } from "~/types/products";


export const useProductPage = async () => {
    
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

// Manejar cambio de página
const handlePageChange = async (page: number) => {
    currentPage.value = page
    // Recargar productos con nueva página
    const { data: newProducts } = await getProducts(page, itemsPerPage.value)

    if (newProducts.value) {
        products.value = newProducts.value
    }

    // Scroll suave al top
    window.scrollTo({ top: 0, behavior: 'smooth' })
}


const addToCart = (product: Product) => {
    const toast = useToast();
    store.onAddCart(product);
    toast.success('Producto agregado', `El producto ${product.title} se agregó al carrito correctamente`)
}

    return {
        currentPage,
        itemsPerPage,
        isLoading,
        products,
        error,
        pending,
        refresh,
        handlePageChange,
        addToCart
    };
}
