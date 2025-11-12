
<template>
    <!-- Loading State -->
    <div  class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="i in 8" :key="i" class="rounded-lg border bg-card overflow-hidden animate-pulse">
            <div class="aspect-square bg-gray-200" />
            <div class="p-4 space-y-3">
                <div class="h-4 bg-gray-200 rounded w-3/4" />
                <div class="h-4 bg-gray-200 rounded w-1/2" />
                <div class="h-10 bg-gray-200 rounded" />
            </div>
        </div>
    </div>
</template>