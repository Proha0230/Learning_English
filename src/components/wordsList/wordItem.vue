<template>
  <div class="word-item">
    <div
        class="word-item-value"
        v-text="word.word"
    />

    <div
        class="word-item-value"
        v-text="word.pronunciation"
    />

    <div
        :class="['word-item-value', {'word-item-value_translation': isHiddenTranslation}]"
        v-text="word.translation"
        @click="changeVisible"
    />
  </div>
</template>

<script setup lang="ts">
import { Input as AInput } from "ant-design-vue"
const {Password: AInputPassword} = AInput

interface IProps {
  word?: {
    word: string
    pronunciation: string
    translation: string
  }
}
withDefaults(defineProps<IProps>(), {
  word: () => ({
    word: "",
    pronunciation: "",
    translation: "",
  })
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

.word-item-value {
  font-size: 1.4rem;
  padding: 0.5rem;
  border: 0.1rem solid grey;
  border-radius: 0.8rem;
  width: 33%;
  user-select: none;
  color: $text-color;
}

.word-item-value_translation {
  content-visibility: hidden;
  cursor: pointer;
}
</style>