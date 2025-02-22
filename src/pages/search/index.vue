<template>
  <div class="search">

    <div
        class="search__label"
        v-text="'Введите слово или фразу на Английском языке. Доступны только те, что добавлены в список слов'"
    />

    <a-input-search
        v-model:value="wordData"
        placeholder="Введите слово или фразу полностью"
        :loading="false"
        enter-button
        @search="searchWord"
    />

    <word-item
        v-if="foundWord && oldWordData"
        :word="foundWord"
        mode="column"
    />

    <a-empty
        v-else-if="isUseSearch"
        class="search__empty"
    >
      <template #description>
      <span>
        Такого слова пока-что нет в Базе Данных
      </span>
      </template>
    </a-empty>
  </div>
</template>

<script setup lang="ts">
import { Input, Empty as AEmpty } from "ant-design-vue"
import WordItem from "@components/wordsList/wordItem.vue"
const { Search: AInputSearch } = Input
import { useWordsStore } from "@pinia/words"

const wordsStore = useWordsStore()
const { foundWord } = storeToRefs(wordsStore)

const wordData = ref()
const oldWordData = ref()
const isUseSearch = ref(false)

function searchWord() {
  if(wordData.value && wordData.value?.trim() !== oldWordData.value?.trim()) {
    if (!isUseSearch.value) isUseSearch.value = true
    wordsStore.getWordToSearch(wordData.value)
    oldWordData.value = wordData.value
  }
}

onBeforeUnmount(() => {
  wordData.value = ""
  foundWord.value = {}
})
</script>

<style lang="scss" scoped>
.search {
  position: relative;
  top: $header-height;

  ::v-deep(.word-item) {
    padding: 2rem 0;
  }
}

.search__empty {
  margin-top: $header-height;
  color: $text-color;
}

.search__label {
  font-size: 1.6rem;
  margin-bottom: 2rem;
  color: $text-color;
}
</style>