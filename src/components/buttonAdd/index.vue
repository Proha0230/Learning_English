<template>
  <a-button
      type="primary"
      class="button-add"
      @click="onClick"
  >
    <template #icon>
      <DownloadOutlined />
    </template>
  </a-button>
</template>

<script setup lang="ts">
import { Button as AButton } from "ant-design-vue"
import { DownloadOutlined } from "@ant-design/icons-vue"

interface IEmits {
  (event: "on-click"): void
}
const emit = defineEmits<IEmits>()

function onClick() {
  emit("on-click")
}

</script>

<style scoped>

.button-add {
  position: fixed;
  bottom: 11rem;
  right: 4rem;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

</style>