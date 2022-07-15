import { createStore } from 'vuex'

export default createStore({
  state: {
    image:{src:'', type:'', width:0, height:0},
  },
  getters: {
    getImage: state => state.image,
  },
  mutations: {
    setImage(state, payload) {
      state.image = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
