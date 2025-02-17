import { defineStore } from "pinia"
import type { TWordForm } from "@components/Modal/addWordModal/addWordModal.types"

export const useWordsStore = defineStore("wordsStore", {
    state: () => ({
        wordsArray: [] as Array<TWordForm> | undefined,
        wordsCounter: 0,
    }),

    actions: {
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
                        this.wordsCounter = wordsCounter?.value || 0
                    })
                    .catch((error) => console.log(error, "запрос не ушел"))
            } catch (e) {}
        },

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

        async getPartWordsList(number: number) {
            try {
                const config = useRuntimeConfig()
                return await fetch(`${config.public.API_URL_WORDS}/${number}.json`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                    .then(response => response.json())
                    .then((partWordsArray: Array<TWordForm>) => {
                        this.wordsArray = partWordsArray
                    })
            } catch (e) {}
        },

        async uploadWord(dataWord: TWordForm) {
            const nameWord = dataWord.word
            const config = useRuntimeConfig()

            return await fetch(`${config.public.API_URL_WORDS}/1/${nameWord}.json`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataWord)
            })
                .then(async () => {
                    this.wordsCounter += 1
                    await this.updateWordsCounter()
                })
        }

    }
})