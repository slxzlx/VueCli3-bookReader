import Vue from 'vue'
import Vuex from 'vuex'
import book from './modules/book/index'
import getters from './getters'
import mutations from './mutations'
import state from './state'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    book
  },
  state,
  getters,
  mutations
})
export default store
