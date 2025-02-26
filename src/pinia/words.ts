import { defineStore } from "pinia"
import type { TWordForm, TWordObjList } from "@components/Modal/addWordModal/addWordModal.types"

export const useWordsStore = defineStore("wordsStore", {
    state: () => ({
        wordsArray: {} as TWordObjList | undefined, // объект (страница page) со словами
        wordsCounter: 0, // счётчик всех добавленных слов
        currentWordsPage: 1, // текущий объект со словами (страница page)
        allWordsPage: 0, // получаем число для записи слов в отдельные объекты разделенные по 50 слов
        foundWord: {} as TWordForm, // запрашиваемое слово в поиске
        duplicateFound: false // проверка на дубликат при добавлении слова
    }),

    actions: {
        // убираем пробелы и переводим в toLowerCase запрашиваемое слово/фразу в поиске
        // и для сохранения в БД.
        clearRegAndSpace(word: string) {
            return word.trim().toLowerCase().replace(/\s/g, "")
        },

        // получаем счётчик кол-ва слов добавленных в БД
        async getWordsCounter() {
            const config = useRuntimeConfig()
            try {
                return await fetch(`${config.public.API_URL_WORDS_COUNTER}.json`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(response => response.json())
                    .then((wordsCounter: { value: number }) => {
                        // получаем счётчик кол-ва слов загруженных
                        this.wordsCounter = wordsCounter?.value || 0
                        // получаем кол-во объектов (страниц pages) со словами (в каждой объекте по 50 слов)
                        this.allWordsPage = Math.floor(this.wordsCounter / 50) + 1
                    })
                    .catch((error) => console.log(error, "запрос не ушел"))
            } catch (e) {}
        },

        // обновляем счётчик кол-ва слов добавленных в БД
        async updateWordsCounter() {
            const config = useRuntimeConfig()
            try {
                return await fetch(`${config.public.API_URL_WORDS_COUNTER}.json`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ value: this.wordsCounter})
                })
            } catch (e) {}
        },

        // получаем список слов конкретной страницы с пагинации
        async getPartWordsList() {
            try {
                const config = useRuntimeConfig()
                return await fetch(`${config.public.API_URL_WORDS}/${this.currentWordsPage}.json`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(response => response.json())
                    .then((partWordsArray: TWordObjList) => {
                        this.wordsArray = partWordsArray
                    })
            } catch (e) {}
        },

        // загружаем новое слово в самый последний объект со словами если в нем < 50 слов
        // если больше то загрузим слово уже в следующий обьект. Таким образом на каждой странице по 50 слов.
        async uploadWord(dataWord: TWordForm) {
            const nameWord = this.clearRegAndSpace(dataWord.word)
            const config = useRuntimeConfig()

            return await fetch(`${config.public.API_URL_WORDS}/${this.allWordsPage}/${nameWord}.json`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataWord)
            })
                .then(async () => {
                    this.wordsCounter += 1
                    await this.uploadWordToSearch(dataWord)
                    await this.updateWordsCounter()
                })
        },

        // добавляем вместе с добавлением слова в объект (страницы page) - сюда
        // чтобы добавленное слово можно было найти в поиске слов
        async uploadWordToSearch(dataWord: TWordForm) {
            const nameWord = this.clearRegAndSpace(dataWord.word)
            const config = useRuntimeConfig()

            return await fetch(`${config.public.API_URL_WORDS_SEARCH}/${nameWord}.json`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataWord)
            })
                .then(response => response.json())
                .then((wordObj: TWordForm) => {
                    this.foundWord = wordObj
                })
        },

        // запрашиваем слово, которое хотим добавить в объект (страницы page)
        // если оно найдено, то это дубликат и его не пропускаем для добавления.
        async checkForDuplicates(dataWord: string) {
            const nameWord = this.clearRegAndSpace(dataWord)
            const config = useRuntimeConfig()

            return await fetch(`${config.public.API_URL_WORDS_SEARCH}/${nameWord}.json`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then((data) => {
                    if (data) {
                        this.duplicateFound = true
                    }
                })
        },

        // запрашиваем и получаем слово в поиске
        async getWordToSearch(dataWord: string) {
            const nameWord = this.clearRegAndSpace(dataWord)
            const config = useRuntimeConfig()

            return await fetch(`${config.public.API_URL_WORDS_SEARCH}/${nameWord}.json`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.json())
                .then((wordObj: TWordForm) => {
                    this.foundWord = wordObj
                })
        },

        // изменяем текущую объект со словами (страницу page) и сохраняем
        // в localStorage для сохранения состояния страницы у юзера.
        setCurrentWordsPage(value: number) {
            this.currentWordsPage = value
            localStorage.setItem("currentWordsPage", value.toString())
        },

        // запрашиваем localStorage ключ currentWordsPage для определения той страницы,
        // на которой был юзер перед выходом.
        getCurrentWordsPage() {
            const page = localStorage.getItem("currentWordsPage")

            if (page) {
                this.currentWordsPage = +page
            }
        },
    }
})