<script setup lang="ts">
import { UserLock, LogOut } from 'lucide-vue-next'
import Separator from '../core/Separator.vue'
import { useProfile } from '~/composable/useProfile';



const route = useRoute()
const { signIn, signOut } = useAuth();
const {  status, session } = useProfile();


const isOpen = ref(false)
const isLoading = ref(false)

const toggleDropdown = () => {
    isOpen.value = !isOpen.value
}

const closeDropdown = () => {
    isOpen.value = false
}

const handleSignIn = async (provider: 'google' | 'github') => {
    isLoading.value = true
    closeDropdown()
    
    try {
        await signIn(provider, {
            callbackUrl: route.fullPath, // Redirigir a la página actual
            redirect: true
        })
    } catch (error) {
        console.error('Error al iniciar sesión:', error)
    } finally {
        isLoading.value = false
    }
}

const handleSignOut = async () => {
    isLoading.value = true
    closeDropdown()    
    try {
        await signOut({
            callbackUrl: '/',
            redirect: true
        })
    } catch (error) {
        console.error('Error al cerrar sesión:', error)
    } finally {
        isLoading.value = false
    }
}

// Cerrar con tecla Escape
const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
        closeDropdown()
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
    <div class="relative inline-block text-left">
        <!-- Botón trigger -->
        <button 
            @click="toggleDropdown"
            :disabled="isLoading"
            class="w-full inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 disabled:opacity-50 disabled:cursor-not-allowed">
            <UserLock :class="{ 'animate-pulse': isLoading }" />
            <div v-if="status">
                <span v-if="status === 'authenticated' && session?.user">
                    {{ session.user.name || session.user.email }}
                </span>
            </div>
            <span v-else-if="isLoading">
                Cargando...
            </span>
            <span v-else>
                Iniciar Sesión
            </span>
        </button>

        <!-- Dropdown Menu -->
        <Transition 
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" 
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" 
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <div 
                v-if="isOpen"
                class="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md border border-border bg-popover shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1" role="menu">
                    
                    <!-- Usuario autenticado -->
                    <div v-if="status === 'authenticated' && session?.user" class="px-4 py-3">
                        <div class="flex items-center gap-3">
                            <img 
                                v-if="session.user.image" 
                                :src="session.user.image" 
                                :alt="session.user.name || 'Avatar'"
                                class="w-10 h-10 rounded-full"
                            />
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-foreground truncate">
                                    {{ session.user.name }}
                                </p>
                                <p class="text-xs text-muted-foreground truncate">
                                    {{ session.user.email }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Separador si está autenticado -->
                    <Separator v-if="status === 'authenticated'" />

                    <!-- Opciones de inicio de sesión -->
                    <div v-if="status !== 'authenticated'">
                        <!-- Google -->
                        <button
                            @click="handleSignIn('google')"
                            :disabled="isLoading"
                            class="group flex w-full items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            <svg class="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            Continuar con Google
                        </button>

                        <!-- GitHub -->
                        <button
                            @click="handleSignIn('github')"
                            :disabled="isLoading"
                            class="group flex w-full items-center gap-3 px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            Continuar con GitHub
                        </button>

                        <Separator />
                    </div>

                    <!-- Cerrar Sesión -->
                    <button
                        v-if="status === 'authenticated'"
                        @click="handleSignOut"
                        :disabled="isLoading"
                        class="group flex w-full items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 hover:text-destructive transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <LogOut class="w-4 h-4" />
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </Transition>

        <!-- Overlay para cerrar al hacer click afuera -->
        <div v-if="isOpen" @click="closeDropdown" class="fixed inset-0 z-40"></div>
    </div>
</template>
