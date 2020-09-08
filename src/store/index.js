import Vue from 'vue'
import Vuex from 'vuex'
import bird from '../store/modules/bird'
import game from '../store/modules/game'
import pipe from '../store/modules/pipe'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    bird,
    pipe,
    game
  }
})

export default store
