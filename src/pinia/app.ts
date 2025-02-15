import { defineStore } from "pinia"

export const useAppStore = defineStore("appStore", {
    state: () => ({
        mode: "light" as string
    }),

    actions: {
        changeMode(mode: "dark" | "light") {
            this.mode = mode
        }
    }
})
