<template>
  <div class="auth">
    <a-form
        ref="authModalForm"
        :model="userData"
        :rules="rules"
    >
      <a-form-item
          name="login"
      >
        <a-input
            v-model:value="userData.login"
            placeholder="Введите логин"
            autocomplete="off"
        />
      </a-form-item>

      <a-form-item
          name="password"
      >
        <a-input
            v-model:value="userData.password"
            placeholder="Введите пароль"
            autocomplete="off"
        />
      </a-form-item>
    </a-form>

    <a-button
        type="primary"
        class="auth__button"
        @click="onClickAuth"
    >
      <template #icon>
        <LoginOutlined />
      </template>

      Авторизоваться
    </a-button>

    <contextHolder/>
  </div>
</template>

<script setup lang="ts">
import { Form as AForm, Input as AInput, Button as AButton } from "ant-design-vue"
import type { RuleObject } from "ant-design-vue/es/form"
import { LoginOutlined } from "@ant-design/icons-vue"
import useNotification from "@composable/useNotification"
const { Item: AFormItem } = AForm

const { contextHolder, openNotificationError, openNotificationSuccess } = useNotification()

const authModalForm = ref()

const userData = ref({
  login: "",
  password: ""
})

const rules: Record<string, RuleObject[]> = {
  login: [{ required: true, message: "Логин обязателен", trigger: "blur", min: 1, max: 20 }],
  password: [{ required: true, message: "Пароль обязателен", trigger: "blur", min: 1, max: 20 }]
}

function onClickAuth() {
  authModalForm.value.validateFields()
      .then(() => {
        openNotificationSuccess("Добро пожаловать Администратор!")
        authModalForm.value.clearValidate()
        clearForm()
      })
      .catch(() => {
        openNotificationError("Заполните необходимые поля")
      })
}

function clearForm() {
  userData.value = {
    login: "",
    password: ""
  }
}
</script>

<style scoped lang="scss">
.auth {
  display: flex;
  flex-direction: column;
}

.auth__button {
  margin-top: 1rem;
}

</style>