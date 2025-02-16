import { defineStore } from "pinia"

export const useAppStore = defineStore("appStore", {
    state: () => ({
        mode: "light" as string,
        isAuth: false,
        isLoading: true,
        isInitialLoading: false
    }),

    actions: {
        changeMode(mode: "dark" | "light") {
            this.mode = mode
            localStorage.setItem("mode", mode)
        },

        changeStatusPageLoading(value: boolean) {
            this.isLoading = value
        },

        checkLocalStorage() {
            const mode = localStorage.getItem("mode")
            const isAuth = localStorage.getItem("isAuth")

            if (isAuth) {
                this.isAuth = true
            }

            if (mode) {
                this.mode = mode
            }

            this.isInitialLoading = true
        }
    }
})
