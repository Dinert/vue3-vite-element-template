import { defineStore } from "pinia";

export const useGlobalStore = defineStore('global', {
  state: () => ({
    counter: 111
  }),
  getters: {
    counter: (state) => state.counter * 2
  },
  actions: {
    getCounter() {
      
    }
  }
})