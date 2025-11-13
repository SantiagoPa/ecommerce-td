// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: [
        '@nuxt/image', 
        '@nuxtjs/tailwindcss', 
        '@pinia/nuxt', 
        '@sidebase/nuxt-auth'
    ],
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
    },

    auth: {
        provider: {
            type: 'authjs',
        }
    },

    runtimeConfig: {
        // Variables privadas (solo servidor)
        authSecret: process.env.AUTH_SECRET,
        googleClientId: process.env.GOOGLE_CLIENT_ID,
        googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
        githubClientId: process.env.GITHUB_CLIENT_ID,
        githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    },


})