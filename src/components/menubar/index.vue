<template>
  <a-menu
      v-show="isVisibleMenu"
      class="menubar"
      mode="inline"
      theme="light"
      :items="items"
      @click="onClickMenu"
  ></a-menu>
</template>

<script setup lang="ts">
import { Menu as AMenu } from "ant-design-vue"
import { EyeOutlined, LoginOutlined, ReadOutlined } from "@ant-design/icons-vue"
import type { MenuInfo } from "ant-design-vue/es/menu/src/interface"
import useApp from "@composable/useApp"

interface IEmits {
  (event: "on-click-menu"): void
}
const emit = defineEmits<IEmits>()

interface IProps {
  isVisibleMenu: boolean
}
defineProps<IProps>()

const router = useRouter()
const { changeStatusPageLoading } = useApp()

const items = ref([
  {
    key: 'auth',
    icon: () => h(LoginOutlined),
    label: 'Авторизация',
    title: 'Option 1',
  },
  {
    key: 'wordsList',
    icon: () => h(ReadOutlined),
    label: 'Список слов',
    title: 'Option 2',
  },
  {
    key: 'info',
    icon: () => h(EyeOutlined),
    label: 'О проекте',
    title: 'Option 3',
  }
])

function changeVisibleMenu(path: string) {
  changeStatusPageLoading(false)
  emit("on-click-menu")
  router.push(path)

  setTimeout(() => {
    changeStatusPageLoading(true)
  }, 200)
}

function onClickMenu(event: MenuInfo): void {
  switch (event.key) {
    case 'auth':
      changeVisibleMenu('/auth')
      break

    case 'wordsList':
      changeVisibleMenu('/')
      break

    case 'info':
      changeVisibleMenu('/info')
      break
  }
}

</script>

<style scoped lang="scss">
.menubar {
  background: $background-additional-color;
  position: absolute;
  z-index: 1;
  width: calc(100vw - 2rem);
  left: 1rem;
  border-radius: 0.8rem;
  color: $text-color;
  user-select: none;
  height: calc(100% - 12rem);

  ::v-deep(.ant-menu-item-selected) {
    background-color: $background-additional-color;
  }

  ::v-deep(.ant-menu-item:not(.ant-menu-item-selected):active) {
    background-color: $background-additional-color;

  }
}

</style>