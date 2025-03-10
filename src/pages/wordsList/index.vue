<template>
  <div class="main-page">
    <WordsList
      :words-array="wordsArray"
      :currentWordsPage="currentWordsPage"
      :allPagesWords="allWordsPage"
      @on-update-pagination="onChangePagination"
    />

    <ButtonAdd
        @on-click="changeVisibleModal"
    />

    <addWordModal
        :isVisible="isVisibleModalAdd"
        @on-cancel="changeVisibleModal"
        @onClick="uploadWord"
    />

    <contextHolder />
  </div>
</template>

<script setup lang="ts">
import WordsList from "@components/wordsList/index.vue"
import ButtonAdd from "@components/buttonAdd/index.vue"
import addWordModal from "@components/Modal/addWordModal/index.vue"
import type { TWordForm } from "@components/Modal/addWordModal/addWordModal.types"
import { useWordsStore } from "@pinia/words"
import useNotification from "@composable/useNotification"

const { contextHolder, openNotificationError, openNotificationSuccess } = useNotification()
const wordsStore = useWordsStore()
const { wordsArray, duplicateFound, currentWordsPage, allWordsPage } = storeToRefs(wordsStore)

const isVisibleModalAdd = ref(false)

function changeVisibleModal() {
  isVisibleModalAdd.value = !isVisibleModalAdd.value
}

async function onChangePagination(value: number) {
  wordsStore.setCurrentWordsPage(value)
  await wordsStore.getPartWordsList()

  const layout = document.querySelector(".layout")
  layout?.scrollTo({
    top: 0,
    behavior: "smooth" // Плавная прокрутка
  })
}

async function uploadWord(data: TWordForm) {
  try {
    await wordsStore.checkForDuplicates(data.word)
    if (!duplicateFound.value) {
      await wordsStore.uploadWord(data)
      await wordsStore.getPartWordsList()
      openNotificationSuccess("Новое слово добавлено")
    } else {
      openNotificationError("Такое слово уже есть в списке")
      duplicateFound.value = false
    }
  } catch (e) {
    openNotificationError("Ошибка, повторите снова")
  }

  changeVisibleModal()
}
</script>

<style lang="scss" scoped>
.main-page {
  margin: 0 -2rem;
  position: relative;
  top: $header-height;
}
</style>