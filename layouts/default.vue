<template>
  <div :class="['layout', getClassForMode]">
    <div v-if="isInitialLoading">
      <Header
        :title="getTitleWithCurrentRoute"
        :menuOpen="isVisibleMenu"
        @on-click-menu="changeVisibleMenu"
      />

      <Menubar
        :isVisibleMenu="isVisibleMenu"
        @on-click-menu="changeVisibleMenu"
      />

      <slot
        v-if="isLoadingPage"
      />

      <Preloader
          v-else
      />
    </div>

    <Preloader
      v-else
    />
  </div>
</template>

<script setup lang="ts">
import Preloader from "@components/preloader/index.vue"
import Menubar from "@components/menubar/index.vue"
import Header from "@components/header/index.vue"
import useGetPath from "@composable/useGetPath"
import useApp from "@composable/useApp"
import { useWordsStore } from "@pinia/words"

const wordsStore = useWordsStore()

const { getBasePath } = useGetPath()
const { isLightMode, isLoadingPage, isInitialLoading, checkLocalStorage } = useApp()

const isVisibleMenu = ref(false)

const getTitleWithCurrentRoute = computed(() => {
  switch (getBasePath.value) {
    case '/':
      return "Список слов"

    case '/info':
      return "О проекте"

    case '/auth':
      return "Авторизация"

    case '/search':
      return "Поиск слов"

    default:
      return ""
  }
})

const getClassForMode = computed(() => {
  return isLightMode.value ? "light-mode" : "dark-mode"
})

function changeVisibleMenu() {
  isVisibleMenu.value = !isVisibleMenu.value
}

onMounted( async () => {
  checkLocalStorage()
  await wordsStore.getPartWordsList(1)
  await wordsStore.getWordsCounter()

  if(document) {
    // для отключения возможности зума на мобилке
    document.addEventListener("touchmove", function (event) {
      if (event.scale !== 1) {
        event.preventDefault()
      }
    }, { passive: false })
  }
})
</script>

<style scoped lang="scss">
.layout {
  background-color: $background-color;
  padding: $padding;
  height: $height-layout;
}
</style>