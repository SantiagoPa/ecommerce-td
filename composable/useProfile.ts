// http://localhost:3000/api/auth/callback/github

export const useProfile = () => {
    const { loggedIn, user, session, clear, fetch } = useUserSession()
    
    const signIn = (provider: 'google' | 'github', { callbackUrl, redirect }: {
            callbackUrl: string;
            redirect: boolean
    }) => {
        return navigateTo(`/api/auth/${provider}`, { external: true })
    }
    
    const signOut = async ({ callbackUrl, redirect }: {
            callbackUrl: string;
            redirect: boolean
    }) => {
        try {
            await $fetch('/api/auth/logout', { method: 'POST' })
            await clear()
            if(redirect) await navigateTo(callbackUrl)
        } catch (error) {
            console.error('Error signing out:', error)
        }
    }

    return {
        isAuthenticated: computed(() => loggedIn.value),
        status: computed(() => loggedIn.value ? 'authenticated' : 'unauthenticated'),
        session: computed(() => session.value),
        user: computed(() => user.value),
        signIn,
        signOut,
        refresh: fetch,
    }
}