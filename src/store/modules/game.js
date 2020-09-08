const defaultState = {
  status: 'START'
}

const mutations = {
  changeState (state, payload) {
    state.status = payload
  }
}

const actions = {
  changeState (state, payload) {
    state.commit('changeState', payload)
  }
}

const getters = {
  getStatus (state) {
    return state.status
  }
}

export default {
  namespaced: true,
  state: defaultState,
  mutations,
  actions,
  getters
}
