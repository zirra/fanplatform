import { storage } from '@/utils/storage'

const state = {
  user: null
}

const mutations = {
  setUser (state, user) {
    if (state.user == null) {
      state.user = user
    } else {
      state.user = storage.getValue('user')
    }
  },
  killUser (state) {
    state.user = null
  }
}

const getters = {
  user (state) {
    if (state.user == null) {
      state.user = storage.getValue('user')
    }
    return state.user
  }
}

const actions = {
  setUser (context, data) {
    storage.storeValue('user', data)
    context.commit('setUser', {state, data})
  },
  killUser (context) {
    storage.clearValue('user')
    context.commit('killUser')
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
