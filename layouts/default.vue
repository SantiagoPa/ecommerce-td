<script setup lang="ts">
import Navbar from '@/components/navbar/Navbar.vue';
import ToastContainer from '@/components/core/toast/ToastContainer.vue';
import Separator from '@/components/core/Separator.vue';

</script>

<template>
    <Head>
        <Title>Ecommerce TD</Title>
    </Head>
    <Navbar />
    <main>
        <Separator class="my-3 w-[90%] text-center" />
        <slot />
        <ToastContainer />
    </main>
</template>