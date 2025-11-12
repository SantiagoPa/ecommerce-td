// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxt/image', '@nuxtjs/tailwindcss', '@pinia/nuxt'],
    // Configuración de SSR
    // ssr: true,
    pinia: {
        /**
         * Automatically add stores dirs to the auto imports. This is the same as
         * directly adding the dirs to the `imports.dirs` option. If you want to
         * also import nested stores, you can use the glob pattern `./stores/**`
         * (on Nuxt 3) or `app/stores/**` (on Nuxt 4+)
         *
         * @default `['stores']`
         */
        storesDirs: [`./stores/**`]
    },
    // Runtime config
    runtimeConfig: {
        public: {
            apiBase: 'https://api.escuelajs.co/api/v1'
        }
    },
    // Optimizaciones
    nitro: {
        compressPublicAssets: true,
    },
    // App config
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'E-commerce TP',
            meta: [
                { name: 'description', content: 'Tienda online con los mejores productos' }
            ]
        }
    }
})