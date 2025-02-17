<template>
  <div class="words-list">
    <div class="words-list__header">
      <span v-text="'Слово'"/>
      <span v-text="'Транскрипция'"/>
      <span v-text="'Перевод'"/>
    </div>
  <div
      v-for="(item, index) in wordsArray"
      :key="index"
  >
    <word-item :word="item" />
  </div>
  </div>
</template>

<script setup lang="ts">
import wordItem from './wordItem.vue'
import type { TWordForm } from "@components/Modal/addWordModal/addWordModal.types"

interface IProps {
  wordsArray?: Array<TWordForm>
}
withDefaults(defineProps<IProps>(), {
  wordsArray: () => ([{
    word: 'get up',
    pronunciation: '[ɡet][ʌp]',
    translation: "Вставать"
  }])
})

</script>

<style scoped lang="scss">
.words-list__header {
  font-size: 1.6rem;
  display: flex;
  justify-content: space-around;
  color: $text-color;
}
</style>