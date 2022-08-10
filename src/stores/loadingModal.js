import { defineStore } from 'pinia'

export const useStore = defineStore({
  id: 'loadingStore',
  state: () => {
    return {
      loadingValue : false,
      loadingkey : 0,
    }
  },
  
  getters: {
    getLoadingValue: (state) => state.loadingValue,
    getLoadingkey: (state) => state.loadingkey,
  },
  actions: {

    openLoading(){
      this.loadingValue = true
    },
    closeLoading(){
      this.loadingValue = false
    }
  }
})
