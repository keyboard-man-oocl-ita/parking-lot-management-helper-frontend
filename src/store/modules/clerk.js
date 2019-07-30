import { fetchClerk } from '@/api/clerk'

const state = {
  clerks: []
}

const mutations = {
  LOAD_CLERKS: (state, clerks) => {
    state.clerks = clerks
  }
}

const actions = {
  async loadClerks({ commit }) {
    const result = await fetchClerk()
    commit('LOAD_CLERKS', result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
