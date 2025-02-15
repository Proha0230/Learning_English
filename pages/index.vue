<template>
  <div class="main-page">
    <Header />

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
import WordsList from "../src/components/wordsList/index.vue"
import Header from "../src/components/header/index.vue"
import ButtonAdd from "../src/components/buttonAdd/index.vue"
import addWordModal from "../src/components/addWordModal/index.vue"
import type { TWordForm } from "~/src/components/addWordModal/addWordModal.types"

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