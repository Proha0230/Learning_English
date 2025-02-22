import path from "path"

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      API_URL_WORDS: process.env.API_URL_WORDS,
      API_URL_WORDS_COUNTER: process.env.API_URL_WORDS_COUNTER
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true
  },
  nitro: {
    preset: 'static'
  },
  app: {
    baseURL: "/",
    head: {
      meta: [
        // для отключения возможности зума на мобилке
        { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover, shrink-to-fit=no" }
      ]
    }
  },
  modules: ['@pinia/nuxt'],
  css: ["@styles/app.scss"],
  vite: {
    resolve: {
      alias: {
        '@icons': path.resolve(__dirname, "src/assets/icons"),
        '@images': path.resolve(__dirname, "src/assets/images"),
        '@styles': path.resolve(__dirname, "src/assets/stylesheets"),
        '@components': path.resolve(__dirname, "src/components"),
        '@pinia': path.resolve(__dirname, "src/pinia"),
        '@pages': path.resolve(__dirname, "src/pages"),
        '@composable': path.resolve(__dirname, "composable")
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@styles/colors.scss" as *;`
        }
      }
    }
  }
})
