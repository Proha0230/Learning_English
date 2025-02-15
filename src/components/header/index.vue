<template>
  <a-page-header
      class="header"
      title="English Learning"
      @back="() => null"
  >
    <template #tags>
      <div v-text="'Всего слов 0'"/>
    </template>

    <template #backIcon>
      <MenuOutlined />
    </template>
  </a-page-header>
</template>

<script setup lang="ts">
import { MenuOutlined } from "@ant-design/icons-vue"
import { PageHeader as APageHeader } from "ant-design-vue"

</script>

<style scoped>

</style>