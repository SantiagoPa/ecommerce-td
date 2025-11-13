import { useStore } from "~/store/useStore";
import type { Product } from "~/types/products"

interface Props {
    product: Product | null;
    isAuthenticated:boolean;
    emit: (evt: "addToCart", product: Product) => void;
}

export const useProductDetail = ({ product, isAuthenticated, emit }: Props) => {

    const { onMinusItemQuantity, onPlusItemQuantity } = useStore();

    // Estado local
    const currentImageIndex = ref(0)

    // Computed
    const currentImage = computed(() =>
        product?.images[currentImageIndex.value] || ''
    )

    const discountedPrice = computed(() => {
        if (!product) return 0
        return isAuthenticated ? product.price * 0.85 : product.price
    })

    const savings = computed(() => {
        if (!product || !isAuthenticated) return 0
        return product.price - discountedPrice.value
    })

    // Métodos
    const nextImage = () => {
        if (product && currentImageIndex.value < product.images.length - 1) {
            currentImageIndex.value++
        }
    }

    const prevImage = () => {
        if (currentImageIndex.value > 0) {
            currentImageIndex.value--
        }
    }

    const selectImage = (index: number) => {
        currentImageIndex.value = index
    }

    const increaseQuantity = () => {
        onPlusItemQuantity(product!)
    }

    const decreaseQuantity = () => {
        onMinusItemQuantity(product!);
    }

    const addToCart = () => {
        if (product) {
            emit('addToCart', product);
        }
    }

    const goBack = () => {
        navigateTo('/')

    }

    return {
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
    };
}
