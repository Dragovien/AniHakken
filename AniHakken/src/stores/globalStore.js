import { defineStore } from "pinia"

export const useGlobalStore = defineStore("globalStore", {
  state: () => {
    return {
      selectedAnime: null,
      pages: []
    }
  },
  actions: {
  },
  persist: true,
})
