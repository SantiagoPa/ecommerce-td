export const getDiscountedPrice = (price: number, isAuthenticated: boolean): number => {
    return isAuthenticated ? price * 0.85 : price
}