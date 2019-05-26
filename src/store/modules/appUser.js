import { storage } from '@/utils/storage'

const state = {
}

const mutations = {
}

const getters = {
  user (state) {
    state.user = storage.getValue('user')
    return state.user
  }
}

const actions = {
  setUser (context, data) {
    console.log(data)
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
