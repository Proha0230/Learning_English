<template>
  <div
      :class="['word-item', { 'word-item-column': mode === 'column'}]"
  >
    <div
        class="word-item-value"
        v-text="word.word"
    />

    <div
        class="word-item-value"
        v-text="word.pronunciation"
    />

    <div
        :class="['word-item-value', {'word-item-value_translation': isHiddenTranslation && mode === 'inline'}]"
        v-text="word.translation"
        @click="changeVisible"
    />
  </div>
</template>

<script setup lang="ts">
interface IProps {
  word?: {
    word: string
    pronunciation: string
    translation: string
  }
  mode?: "inline" | "column"
}
withDefaults(defineProps<IProps>(), {
  word: () => ({
    word: "",
    pronunciation: "",
    translation: "",
  }),
  mode: "inline"
})

const isHiddenTranslation = ref(true)

function changeVisible() {
  isHiddenTranslation.value = !isHiddenTranslation.value
}
</script>

<style scoped lang="scss">

.word-item {
  padding: 1rem;
  gap: 0.5rem;
  display: flex;
}

.word-item-column {
  flex-direction: column;
  gap: 1rem;

  .word-item-value {
    width: calc(100% - 1rem);
    height: 2rem;
  }
}

.word-item-value {
  font-size: 1.4rem;
  padding: 0.5rem;
  border: 0.1rem solid $border-color;
  border-radius: 0.8rem;
  width: 33%;
  overflow: auto;
  text-wrap: nowrap;
  user-select: none;
  color: $text-color;
}

.word-item-value_translation {
  content-visibility: hidden;
  cursor: pointer;
}
</style>