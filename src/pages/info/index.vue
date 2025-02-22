<template>
  <div class="info">
    <div> Здравствуй дорогой гость !</div>

    <div v-text="'Это приложение для изучения Английского Языка'"/>

    <div v-text="'Здесь будет большой список слов с их переводом и произношением'"/>

    <div v-text="'Возможность добавления/редактирования/удаления дубликатов только у Администратора'"/>

    <div>
      <span v-text="'Все слова доступны в разделе '"/>
      <NuxtLink
          class="info__link"
          to="/"
      >
        Список слов
      </NuxtLink>
    </div>

    <div class="info__page">
      <div v-text="'Слова расположены в трех колонках где:'"/>

      <img
        :src="wordHidden"
        alt="wordHidden"
      />

      <div v-text="'Перевод можно увидеть тапнув/кликнув на пустое поле третьего столбца'"/>

      <img
          :src="wordVisible"
          alt="wordVisible"
      />

      <div v-text="'Таким образом можно вспомнить/узнать перевод конкретного слова и проверить себя'"/>
    </div>

    <div class="info__page">
      <div v-text="'В приложении есть светлая и темная тема'"/>

      <img
          :src="modeLight"
          alt="modeLight"
      />

      <div v-text="'Поменять тему можно нажав на значок солнца'"/>

      <img
          :src="modeDark"
          alt="modeDark"
      />
    </div>

    <div class="info__page">
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
  </div>
</template>

<script setup lang="ts">
import modeDark from "@images/modeDark.png"
import modeLight from "@images/modeLight.png"
import wordHidden from "@images/wordHidden.png"
import wordVisible from "@images/wordVisible.png"
import Telegram from "@icons/telegram.vue"
import { GithubOutlined } from "@ant-design/icons-vue"

</script>

<style scoped lang="scss">
.info {
  height: $height-page-padding-on;
  overflow-y: scroll;
  font-size: 1.6rem;
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

.info__page img {
  width: 100%;
}

.info__page {
  border: 0.1rem solid $border-color;
  border-radius: 0.8rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 1rem;
}
</style>