<template>
  <div>
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

  <div class="words-list__pagination">
    <a-pagination
        :current="currentWordsPage"
        :total="allPagesWords * 10"
        :showSizeChanger="false"
        @update:current="onPageChange"
    />
  </div>
  </div>
</template>

<script setup lang="ts">
import { Pagination as APagination } from "ant-design-vue"
import wordItem from './wordItem.vue'
import type { TWordObjList } from "@components/Modal/addWordModal/addWordModal.types"

interface IEmits {
  (event: "on-update-pagination", value: number): void
}
const emit = defineEmits<IEmits>()

interface IProps {
  wordsArray?: TWordObjList,
  currentWordsPage?: number,
  allPagesWords?: number
}
withDefaults(defineProps<IProps>(), {
  wordsArray: () => ({
    0: {
      word: 'get up',
      pronunciation: '[ɡet][ʌp]',
      translation: "Вставать"
    }
  }),
  currentWordsPage: 1,
  allPagesWords: 1
})

function onPageChange(value: number) {
  emit("on-update-pagination", value)
}

</script>

<style scoped lang="scss">
.words-list {
  margin-bottom: 14rem;
}

.words-list__header {
  font-size: 1.6rem;
  display: flex;
  justify-content: space-around;
  color: $text-color;
}

.words-list__pagination {
  display: flex;
  justify-content: center;
  background-color: $background-color;
  padding: 2rem 0 3rem;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;

  ::v-deep(.ant-pagination .ant-pagination-item a) {
    color: $text-color;
    background-color: $background-additional-color;
    border-radius: 0.8rem;
  }

  ::v-deep(.ant-pagination button) {
    color: $text-color
  }

  ::v-deep(.ant-pagination .ant-pagination-item-ellipsis) {
    color: $text-color
  }
}
</style>