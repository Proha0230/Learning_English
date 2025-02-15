import { useAppStore } from "@pinia/app"
import { storeToRefs } from "pinia"

export default function useApp() {
    const appStore = useAppStore()
    const { mode } = storeToRefs(appStore)

    const isLightMode = computed(() => {
        return mode.value === "light"
    })

    const isDarkMode = computed(() => {
        return mode.value === "dark"
    })

    function onChangeMode(mode: "dark" | "light") {
        appStore.changeMode(mode)
    }

    return {
        isLightMode,
        isDarkMode,
        onChangeMode
    }
}