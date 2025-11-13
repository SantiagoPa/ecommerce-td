<script setup lang="ts">
import { ShoppingCart, Menu, X, Store } from 'lucide-vue-next'
import Badge from '../core/Badge.vue'
import { useNavbar } from '~/composable/useNavbar';
import { useStore } from '~/store/useStore';
import AuthDropdown from './AuthDropdown.vue';


const {
  isMenuOpen,
  toggleMenu,
} = useNavbar();

const { getUniqItems } = storeToRefs(useStore());


</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container mx-auto px-4">
      <nav class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <NuxtLink to="/" class="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity">
            <Store :size="24" />
            <span>Ecommerce TD</span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-6">
          <NuxtLink to="/" class="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors">
            Productos
          </NuxtLink>
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-4">
          <!-- Cart Button -->
          <button
            class="relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9">
            <ShoppingCart :size="20" />
            <span v-if="getUniqItems > 0"
              class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {{ getUniqItems }}
            </span>
          </button>

          <!-- Auth Button -->

          <Badge>
            Miembro
          </Badge>


          <ClientOnly fallback=" " fallback-tag="div">
            <AuthDropdown />
          </ClientOnly>

          <!-- Mobile Menu Button -->
          <button @click="toggleMenu"
            class="md:hidden inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9">
            <X v-if="isMenuOpen" :size="20" />
            <Menu v-else :size="20" />
          </button>
        </div>
      </nav>

      <!-- Mobile Menu -->
      <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
        <div v-if="isMenuOpen" class="md:hidden border-t border-border/40 py-4">
          <div class="flex flex-col gap-4">
            <NuxtLink to="/"
              class="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors px-2 py-1"
              @click="isMenuOpen = false">
              Productos
            </NuxtLink>

            <div class="border-t border-border/40 pt-4 mt-2">
              <Badge>
                Miembro
              </Badge>

              <!-- <AuthDropdown :status="status" :session="session" /> -->

            </div>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>

<style scoped>
/* Variables CSS para shadcn/ui - esto normalmente estaría en tu globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --border: 214.3 31.8% 91.4%;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --accent: 217.2 32.6% 17.5%;
  --accent-foreground: 210 40% 98%;
  --border: 217.2 32.6% 17.5%;
}
</style>