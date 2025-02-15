<template>
  <a-modal
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
            placeholder="Введите как оно произносится"
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
import { Modal as AModal, Input as AInput, Form as AForm, notification} from "ant-design-vue"
import { CloseCircleFilled, CheckCircleFilled } from "@ant-design/icons-vue"
import type { RuleObject } from "ant-design-vue/es/form"
import type { TWordForm } from "./addWordModal.types"
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

// вынести
const [api, contextHolder] = notification.useNotification()

const addWordModalForm = ref()

const rules: Record<string, RuleObject[]> = {
  word: [{ required: true, message: "Слово обязательно", trigger: "blur", min: 1, max: 20 }],
  pronunciation: [{ required: true, message: "Произношение обязательно", trigger: "blur", min: 1, max: 20 }],
  translation: [{ required: true, message: "Перевод обязателен", trigger: "blur", min: 1, max: 20 }]
}

const newWordData = ref<TWordForm>({
  word: "",
  pronunciation: "",
  translation: ""
})

// вынести
function openNotificationError() {
  api.info({
    message: "Заполните необходимые поля",
    placement: "topRight",
    icon: () => h(CloseCircleFilled, { style: 'color: red' })
  })
}

// вынести
function openNotificationUpload() {
  api.info({
    message: "Новое слово добавлено",
    placement: "topRight",
    icon: () => h(CheckCircleFilled, { style: 'color: green' })
  })
}

function onClick () {
  addWordModalForm.value.validateFields()
  .then(() => {
    openNotificationUpload()
    emit('on-click', newWordData.value)
  })
  .catch(() => {
    openNotificationError()
  })
}

function onCancel () {
  emit('on-cancel')
  console.log('cancel')
}

</script>

<style scoped>
.add-word-modal-form {
  margin-top: 2rem;
}

</style>