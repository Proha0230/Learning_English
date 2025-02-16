<template>
  <div
      class="loader"
  >
    <video
        v-if="isDarkMode"
        autoplay
        loop
        muted
        playsinline
    >
      <source
          :src="loaderDark"
          type="video/webm"
      >
    </video>

    <video
        v-else
        autoplay
        loop
        muted
        playsinline
    >
      <source
          :src="loaderLight"
          type="video/webm"
      >
    </video>
  </div>
</template>

<script setup lang="ts">
import loaderLight from "@icons/loader-light.webm"
import loaderDark from "@icons/loader-dark.webm"
import useApp from "@composable/useApp"

const { isDarkMode } = useApp()

</script>

<style scoped lang="scss">
.loader {
  width: 100vw;
  height: 80vh;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>