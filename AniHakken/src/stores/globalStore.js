import { defineStore } from "pinia"

export const useGlobalStore = defineStore("globalStore", {
  state: () => {
    return {
      selectedAnime: null,
    }
  },
  actions: {
  },
  persist: true,
})
