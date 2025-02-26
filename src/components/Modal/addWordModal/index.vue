<template>
  <a-modal
      :class="['add-word-modal', getClassForMode]"
      :open="isVisible"
      title="Добавление слова"
      @ok="onClick"
      @cancel="onCancel"
      centered
  >
    <div class="add-word-modal-form">
      <a-form
        ref="addWordModalForm"
        :model="newWordData"
        :rules="rules"
      >
        <a-form-item
        name="word"
        >
          <a-input
            v-model:value="newWordData.word"
            placeholder="Введите слово"
            autocomplete="off"
          />
        </a-form-item>

        <a-form-item
        name="pronunciation"
        >
          <a-input
            v-model:value="newWordData.pronunciation"
            placeholder="Введите транскрипцию"
            autocomplete="off"
          />
        </a-form-item>

        <a-form-item
        name="translation"
        >
          <a-input
            v-model:value="newWordData.translation"
            placeholder="Введите перевод"
            autocomplete="off"
          />
        </a-form-item>
      </a-form>

      <contextHolder />
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { Modal as AModal, Input as AInput, Form as AForm } from "ant-design-vue"
import type { RuleObject } from "ant-design-vue/es/form"
import type { TWordForm } from "./addWordModal.types"
import useNotification from "@composable/useNotification"
import useApp from "@composable/useApp"
const { Item: AFormItem } = AForm

interface IEmits {
  (event: "on-click", formValue: TWordForm): void
  (event: "on-cancel"): void
}
const emit = defineEmits<IEmits>()

interface IProps {
  isVisible?: boolean
}
withDefaults(defineProps<IProps>(), {
  isVisible: false
})

const { isLightMode } = useApp()
const { contextHolder, openNotificationError } = useNotification()

const addWordModalForm = ref()

const newWordData = ref<TWordForm>({
  word: "",
  pronunciation: "",
  translation: ""
})

const rules: Record<string, RuleObject[]> = {
  word: [{ required: true, message: "Слово обязательно", trigger: "blur", min: 1, max: 40 }],
  pronunciation: [{ required: true, message: "Транскрипция обязательна", trigger: "blur", min: 1, max: 40 }],
  translation: [{ required: true, message: "Перевод обязателен", trigger: "blur", min: 1, max: 40 }]
}

const getClassForMode = computed(() => {
  return isLightMode.value ? "light-mode" : "dark-mode"
})

function onClick () {
  addWordModalForm.value.validateFields()
  .then(() => {
    emit('on-click', newWordData.value)
    clearForm()
  })
  .catch(() => {
    openNotificationError("Заполните необходимые поля")
  })
}

function onCancel () {
  emit('on-cancel')
  clearForm()
}

function clearForm() {
  addWordModalForm.value.clearValidate()

  newWordData.value = {
    word: "",
    pronunciation: "",
    translation: ""
  }
}

</script>

<style scoped lang="scss">

.add-word-modal {
  ::v-deep(.ant-modal-content) {
    background-color: $background-modal-color !important;
  }
  ::v-deep(.ant-modal-header) {
    background-color: $background-modal-color !important;
  }
}

.add-word-modal-form {
  margin-top: 2rem;
}

</style>