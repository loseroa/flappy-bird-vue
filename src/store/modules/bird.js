import yellowBirdUpFlap from '../../assets/sprites/yellowbird-upflap.png'
import yellowBirdMidFlap from '../../assets/sprites/yellowbird-midflap.png'
import yellowBirdDownFlap from '../../assets/sprites/yellowbird-downflap.png'

const defaultState = () => {
  return {
    location: {
      top: 250,
      left: 50,
      rotate: 0,
      width: 34,
      height: 24
    },
    actions: [
      yellowBirdUpFlap,
      yellowBirdMidFlap,
      yellowBirdDownFlap
    ],
    actionIndex: 0
  }
}

const state = defaultState()

const mutations = {
  decreaseTop (state) {
    state.location.top -= 50
  },
  increaseTop (state) {
    state.location.top += 30
  },
  rotate (state, degree) {
    state.location.rotate = degree
  },
  changeAction (state) {
    if (state.actionIndex >= state.actions.length - 1) {
      state.actionIndex = 0
    } else {
      state.actionIndex++
    }
  },
  reset (state) {
    Object.assign(state, defaultState())
  }
}

const actions = {
  fly (state) {
    state.commit('rotate', -30)
    state.commit('decreaseTop')
  },
  fall (state) {
    state.commit('rotate', 0)
    state.commit('increaseTop')
  },
  changeAction (state) {
    state.commit('changeAction')
  },
  reset (state) {
    state.commit('reset')
  }
}

const getters = {
  getLocation (state) {
    return state.location
  },
  getAppearance (state) {
    return {
      position: 'absolute',
      top: state.location.top + 'px',
      left: state.location.left + 'px',
      width: state.location.width + 'px',
      height: state.location.height + 'px',
      transform: `rotate(${state.location.rotate}deg)`,
      background: `url(${state.actions[state.actionIndex]})`,
      transition: 'transform 200ms, top 200ms'
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
