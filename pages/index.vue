<template>
  <div class="main-page">
    <WordsList />

    <ButtonAdd
    @on-click="changeVisibleModal"
    />

    <addWordModal
      :isVisible="isVisibleModalAdd"
      @on-cancel="changeVisibleModal"
      @onClick="uploadWord"
    />
  </div>
</template>

<script setup lang="ts">
import WordsList from "@components/wordsList/index.vue"
import ButtonAdd from "@components/buttonAdd/index.vue"
import addWordModal from "@components/Modal/addWordModal/index.vue"
import type { TWordForm } from "@components/Modal/addWordModal/addWordModal.types"

const isVisibleModalAdd = ref(false)

function changeVisibleModal() {
  isVisibleModalAdd.value = !isVisibleModalAdd.value
}

function uploadWord(data: TWordForm) {
  console.log(data, "data")
  changeVisibleModal()
}

</script>

<style scoped>

.main-page {
  height: 100%;
  width: 100%;
}

</style>