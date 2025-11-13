
export const useNavbar = () => {

    const isMenuOpen = ref(false)

    // Estado de autenticación (esto vendría de tu store de Pinia en producción)
    const isAuthenticated = ref(true)

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value
    }

    const toggleAuth = () => {
        isAuthenticated.value = !isAuthenticated.value
    }

    return {
        isMenuOpen,
        isAuthenticated,
        toggleMenu,
        toggleAuth,
    };
}
