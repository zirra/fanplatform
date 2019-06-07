import { storage } from '@/utils/storage'

const state = {
  user: {
    username: null,
    socketId: null
  }
}

const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

const getters = {
  user (state) {
    if (state.user == null) {
      return storage.getValue('user')
    } else {
      return state.user
    }
  },
  username (state) {
    console.log(state.user)
    if (state.user.username == null) {
      let t = storage.getValue('user')
      return t.username
    } else {
      return state.user.username
    }
  }
}

const actions = {
  setUser (context, data) {
    console.log(data)
    context.commit('setUser', data)
    storage.storeValue('user', data)
  },
  killUser (context) {
    storage.clearValue('user')
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
