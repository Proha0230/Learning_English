<template>
  <div class="words-list">
  <div
      v-for="(item, index) in itemList"
      :key="index"
  >
    <word-item :word="item" />
  </div>
  </div>
</template>

<script setup lang="ts">
import wordItem from './wordItem.vue'

const itemList = ref([{
  word: 'get up',
  pronunciation: '(Гет Ап)',
  translation: "Вставать"
}])

</script>

<style scoped>

</style>