<template>
  <div class="search">
    <a-input-search
        v-model:value="wordData"
        placeholder="Введите слово или фразу полностью"
        :loading="false"
        enter-button
    />
  </div>
</template>

<script setup lang="ts">
import { Input } from "ant-design-vue"
const { Search: AInputSearch } = Input

const wordData = ref()
</script>