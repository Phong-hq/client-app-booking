import { defineStore } from 'pinia'

export const useHeaderStore = defineStore({
  id: 'header',
  state: () => ({
    requestOptions: {
        method: 'GET',
        headers: { 
        'Content-Type': 'application/json',
        "G-ClientID":   localStorage.getItem('access-token'),
        },
    }
  }),
  getters: {
    getRequestOptions: (state) => state.requestOptions
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})
