<template>
  <div :class="['layout', {'light-mode': isLightMode, 'dark-mode': isDarkMode}]">
    <Header
      :title="getTitleWithCurrentRoute"
      @on-click-menu="changeVisibleMenu"
    />

    <Menubar
      :isVisibleMenu="isVisibleMenu"
      @on-click-menu="changeVisibleMenu"
    />

  <slot/>
  </div>
</template>

<script setup lang="ts">
import Menubar from "@components/menubar/index.vue"
import Header from "@components/header/index.vue"
import useGetPath from "@composable/useGetPath"
import useApp from "@composable/useApp"

const { getBasePath } = useGetPath()
const { isLightMode, isDarkMode } = useApp()

const isVisibleMenu = ref(false)

const getTitleWithCurrentRoute = computed(() => {
  switch (getBasePath.value) {
    case '/':
      return "Список слов"

    case '/info':
      return "О проекте"

    case '/auth':
      return "Авторизация"

    default:
      return ""
  }
})

function changeVisibleMenu() {
  isVisibleMenu.value = !isVisibleMenu.value
}

</script>

<style scoped lang="scss">
.layout {
  height: 100vh;
  width: 100vw;
  background-color: $background-color;
}

</style>