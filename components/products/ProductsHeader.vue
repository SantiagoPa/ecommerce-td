<script setup lang="ts">
import { useProfile } from '~/composable/useProfile';

const { isAuthenticated } = useProfile();

// Computed para el mensaje del descuento
const discountMessage = computed(() => {
    return isAuthenticated.value ? '15% OFF para miembros' : '';
});

</script>

<template>
    <!-- Header -->
    <div class="flex flex-col gap-2 mb-8">
        <h2 class="text-3xl font-bold tracking-tight md:text-4xl">
            Nuestros Productos
        </h2>
        <p class="text-muted-foreground text-base md:text-lg">
            Descubre nuestra colección exclusiva
            <ClientOnly fallback-tag="span">
                <span class="text-sm px-2 py-0.5 rounded-full text-indigo-800">
                    {{ discountMessage }}
                </span>
            </ClientOnly>
        </p>
    </div>
</template>