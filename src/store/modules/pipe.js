const defaultState = () => {
  return {
    left: 400,
    pipes: []
  }
}

const state = defaultState()

const mutations = {
  generatePipe (state, { topHeight }) {
    state.pipes.push({ topHeight: topHeight })
  },
  movePipe (state) {
    state.left -= 10
  },
  reset (state) {
    Object.assign(state, defaultState())
  }
}

const actions = {
  generatePipe (state) {
    const topHeight = -Math.floor((Math.random() * 200) + 50)
    state.commit('generatePipe', { topHeight })
  },
  movePipe (state) {
    state.commit('movePipe')
  },
  reset (state) {
    state.commit('reset')
  }
}

const getters = {
  getPipesList (state) {
    return state.pipes
  },
  getLeftPosition (state) {
    return state.left
  },
  getPipeStyle (state) {
    return {
      position: 'absolute',
      width: '52px',
      height: '300px',
      transition: 'left 200ms'
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
