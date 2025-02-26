export type TWordForm = {
    word: string,
    pronunciation: string,
    translation: string
}

export type TWordObjList = {
    [key: string]: TWordForm
}