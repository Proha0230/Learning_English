<template>
  <a-page-header
      class="header"
      :title="title"
      @back="onClick"
  >
    <template #tags>
      <div v-text="'Всего слов 0'"/>
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
        class="header__menu-icon"
      />
    </template>
  </a-page-header>
</template>

<script setup lang="ts">
import { MenuOutlined } from "@ant-design/icons-vue"
import dark from "@icons/dark.gif"
import light from "@icons/light.gif"
import { PageHeader as APageHeader } from "ant-design-vue"
import useApp from "@composable/useApp"

interface IEmits {
  (event: "on-click-menu"): void
}
const emit = defineEmits<IEmits>()

interface IProps {
  title: string
}
defineProps<IProps>()

const { isLightMode, onChangeMode } = useApp()

function onClick() {
  emit("on-click-menu")
}

</script>

<style scoped lang="scss">
.header {
  color: $text-color;
  padding: $padding;

  ::v-deep(.ant-page-header-heading-title) {
    color: $text-color;
  }
}

.header__menu-icon {
  color: $text-color;
}

.header__mode-img img {
  border-radius: 50%;
}

</style>