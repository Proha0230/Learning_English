export default function useGetPath() {
    const router = useRouter()

    const getBasePath = computed(() => {
        return router.currentRoute.value.path
    })

    const isAuthPage = computed(() => {
        return router.currentRoute.value.path === '/auth'
    })

    const isWordsListPage = computed(() => {
        return router.currentRoute.value.path === '/'
    })

    const isInfoPage = computed(() => {
        return router.currentRoute.value.path === '/info'
    })

    const isSearchPage = computed(() => {
        return router.currentRoute.value.path === '/search'
    })

    return {
        getBasePath,
        isAuthPage,
        isWordsListPage,
        isInfoPage,
        isSearchPage
    }
}