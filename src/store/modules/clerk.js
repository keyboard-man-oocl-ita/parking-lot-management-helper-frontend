import { fetchClerk, fetchClerkById } from '@/api/clerk'

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
  },
  async loadClerkById({ commit }, id) {
    const result = await fetchClerkById(id)
    return result
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
