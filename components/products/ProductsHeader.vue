<script setup lang="ts">
import { useProfile } from '~/composable/useProfile';

const { isAuthenticated } = useProfile();
</script>

<template>
    <!-- Header -->
    <div class="flex flex-col gap-2 mb-8">
        <h2 class="text-3xl font-bold tracking-tight md:text-4xl">
            Nuestros Productos
        </h2>
        <p class="text-muted-foreground text-base md:text-lg">
            Descubre nuestra colección exclusiva
            <span v-if="isAuthenticated" class="inline-flex items-center gap-1 ml-2 text-primary font-medium">
                <span class="text-sm px-2 py-0.5 rounded-full text-indigo-800">15% OFF para miembros</span>
            </span>
        </p>
    </div>
</template>