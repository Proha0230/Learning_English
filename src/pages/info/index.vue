<template>
  <div class="info">
    <div> Здравствуй дорогой гость !</div>

    <div v-text="'Если ты сейчас здесь то у тебя скорее всего проблемы с Английским Языком'"/>

    <div v-text="'Здесь будет большой список слов с их переводом и произношением'"/>

    <div v-text="'Во избежания флуда и прочего возможность добавления/редактирования/удаления дубликатов только у Админа'"/>

    <div>
      <span v-text="'Для тебя доступны все слова в разделе '"/>
      <NuxtLink
          class="info__link"
          to="/"
      >
        Список слов
      </NuxtLink>
    </div>

    <div v-text="'Слова расположены в трех колонках где:'"/>

    <div>
      <div v-text="'1) Само слово на Английском Языке'"/>
      <div v-text="'2) Произношение слова по Русски'"/>
      <div v-text="'3) Перевод слова на Русский язык - его можно увидеть тапнув/кликнув на пустое поле третьего столбца'"/>
    </div>

    <div v-text="'Таким образом ты сможешь сам вспомнить/узнать перевод конкретного слова и проверить себя'"/>

    <div v-text="'Разработал приложение Proha0230'"/>

    <div class="info__social">
      <a
          class="info__social-item"
          href="https://t.me/Proha0230"
          target="_blank"
          rel="noopener noreferrer"
      >
        <Telegram />
        <span
            class="info__social-item-text"
            v-text="'@Proha0230'"
        />
      </a>

      <a
          class="info__social-item"
          href="https://github.com/Proha0230/Learning_English"
          target="_blank"
          rel="noopener noreferrer"
      >
        <GithubOutlined
            class="info__social-item-github"
        />
        <span
            class="info__social-item-text"
            v-text="'@Proha0230'"
        />
      </a>

    </div>
  </div>
</template>

<script setup lang="ts">
import Telegram from "@icons/telegram.vue"
import { GithubOutlined } from "@ant-design/icons-vue"

</script>

<style scoped lang="scss">

.info {
  font-size: 1.6rem;
  padding: $padding;
  gap: 1rem;
  display: flex;
  flex-direction: column;
  color: $text-color;
  user-select: none;
}

.info__link {
  color: dodgerblue;
}

.info__social {
  display: flex;
  justify-content: space-around;
  margin-top: 1rem;
}

.info__social-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border: 0.1rem solid grey;
  border-radius: 1.2rem;
  text-decoration: none;
  color: $text-color;
}

.info__social-item svg {
  fill: $text-color;
}

.info__social-item-text {
  margin-left: 1rem;
}

.info__social-item-github {

  ::v-deep(svg) {
    width: 3.2rem !important;
    height: 3.2rem !important;
  }
}

</style>