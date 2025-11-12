<template>
    <div class="container mx-auto px-4 py-8">
        <div class="grid md:grid-cols-2 gap-8">
            <div class="space-y-4">
                <div class="aspect-square  bg-gray-200 rounded-lg animate-pulse" />
                <div class="grid grid-cols-4 gap-4">
                    <div v-for="i in 4" :key="i" class="aspect-square  bg-gray-200 rounded-md animate-pulse" />
                </div>
            </div>
            <div class="space-y-6">
                <div class="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div class="h-6  bg-gray-200 rounded w-1/4 animate-pulse" />
                <div class="space-y-2">
                    <div class="h-4  bg-gray-200 rounded animate-pulse" />
                    <div class="h-4  bg-gray-200 rounded animate-pulse" />
                    <div class="h-4  bg-gray-200 rounded w-5/6 animate-pulse" />
                </div>
            </div>
        </div>
    </div>
</template>