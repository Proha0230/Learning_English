<template>
  <div class="main-page">
    <WordsList
      :words-array="wordsArray"
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
const { wordsArray } = storeToRefs(wordsStore)

const isVisibleModalAdd = ref(false)

function changeVisibleModal() {
  isVisibleModalAdd.value = !isVisibleModalAdd.value
}

async function uploadWord(data: TWordForm) {
  try {
    await wordsStore.uploadWord(data)
    await wordsStore.getPartWordsList(1)
    openNotificationSuccess("Новое слово добавлено")
  } catch (e) {
    openNotificationError("Ошибка, повторите снова")
  }

  changeVisibleModal()
}
</script>