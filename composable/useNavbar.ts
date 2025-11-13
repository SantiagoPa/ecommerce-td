
export const useNavbar = () => {

    const isMenuOpen = ref(false)

    const toggleMenu = () => {
        isMenuOpen.value = !isMenuOpen.value
    }


    return {
        isMenuOpen,
        toggleMenu,
    };
}
