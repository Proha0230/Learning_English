import { useAppStore } from "@pinia/app"
import { storeToRefs } from "pinia"

export default function useApp() {
    const appStore = useAppStore()
    const { mode, isLoading, isInitialLoading} = storeToRefs(appStore)

    const isLightMode = computed(() => {
        return mode.value === "light"
    })

    const isDarkMode = computed(() => {
        return mode.value === "dark"
    })

    const isLoadingPage = computed(() => {
        return isLoading.value
    })

    function onChangeMode(mode: "dark" | "light") {
        appStore.changeMode(mode)
    }

    function changeStatusPageLoading(value: boolean) {
        appStore.changeStatusPageLoading(value)
    }

    function checkLocalStorage() {
        appStore.checkLocalStorage()
    }

    return {
        isLightMode,
        isDarkMode,
        isLoadingPage,
        isInitialLoading,
        onChangeMode,
        changeStatusPageLoading,
        checkLocalStorage
    }
}