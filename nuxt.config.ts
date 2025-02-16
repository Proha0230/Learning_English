import path from "path"

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true
  },
  nitro: {
    preset: 'static' // Генерируем статические файлы
  },
  app: {
    baseURL: "/", // Убедитесь, что базовый путь корректен
    head: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" }
      ]
    }
  },
  modules: ['@pinia/nuxt'],
  css: ["@styles/app.scss"],
  vite: {
    resolve: {
      alias: {
        '@icons': path.resolve(__dirname, "src/assets/icons"),
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
