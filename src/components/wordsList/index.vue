<template>
  <div class="words-list">
    <div class="words-list__header">
      <span v-text="'Слово'"/>
      <span v-text="'Произношение'"/>
      <span v-text="'Перевод'"/>
    </div>
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

<style scoped lang="scss">
.words-list__header {
  font-size: 1.6rem;
  display: flex;
  justify-content: space-around;
  color: $text-color;
}
</style>