<template>
  <div
      class="loader"
  >
    <img
        :src="loaderLight"
        alt="loading..."
    />
  </div>
</template>

<script setup lang="ts">
import loaderLight from "@icons/loading.gif"

</script>

<style scoped lang="scss">
.loader {
  width: 100vw;
  height: 80vh;
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader img {
  width: 5rem;
  height: 5rem;
}

</style>