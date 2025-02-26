<template>
  <a-page-header
      class="header"
      :title="title"
      @back="onClick"
  >
    <template #tags>
      <div
          v-if="isWordsListPage || isSearchPage"
          class="header__counter-words"
          v-text="`Всего слов ${wordsCounter}`"
      />
    </template>

    <template #extra>
      <div class="header__mode-img">
        <img
            v-if="isLightMode"
            :src="dark"
            alt=""
            @click="onChangeMode('dark')"
        />
        <img
            v-else
            :src="light"
            alt=""
            @click="onChangeMode('light')"
        />
      </div>
    </template>

    <template #backIcon>
      <MenuOutlined
        :class="['header__menu-icon', { 'header__menu-icon_blue': menuOpen }]"
      />
    </template>
  </a-page-header>
</template>

<script setup lang="ts">
import { MenuOutlined } from "@ant-design/icons-vue"
import dark from "@icons/dark.png"
import light from "@icons/light.png"
import { PageHeader as APageHeader } from "ant-design-vue"
import useApp from "@composable/useApp"
import useGetPath from "@composable/useGetPath"
import { useWordsStore } from "@pinia/words"
import { storeToRefs } from "pinia"

interface IEmits {
  (event: "on-click-menu"): void
}
const emit = defineEmits<IEmits>()

interface IProps {
  title: string
  menuOpen: boolean
}
defineProps<IProps>()

const wordsStore = useWordsStore()
const { wordsCounter } = storeToRefs(wordsStore)

const { isWordsListPage, isSearchPage } = useGetPath()
const { isLightMode, onChangeMode } = useApp()

function onClick() {
  emit("on-click-menu")
}

</script>

<style scoped lang="scss">
.header {
  color: $text-color;
  height: $header-height;
  position: absolute;
  width: calc(100vw);
  top: 0;
  left: 0;
  padding: 3rem $padding;
  align-items: center;
  display: flex;
  background-color: $background-color;
  z-index: 2;

  ::v-deep(.ant-page-header-heading-title) {
    color: $text-color;
  }

  ::v-deep(.ant-page-header-heading) {
    width: 100%;
  }
}

.header__counter-words {
  font-size: 1.2rem;
}

.header__menu-icon {
  color: $text-color;
}

.header__menu-icon_blue {
  color: #1677ff;
}

.header__mode-img img {
  width: 5rem;
  height: 5rem;
}

</style>