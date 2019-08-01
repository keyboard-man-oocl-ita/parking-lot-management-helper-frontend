import { loadAllManager, loadAllFreeClerk, dispatchClerk, findClerkByManagerId } from '@/api/clerk'

const state = {
  managers: [],
  totalOfManager: 0,
  currentPageOfManager: 1
}

const mutations = {
  LOAD_MANAGER: (state, managers) => {
    state.managers = managers
    state.totalOfManager = managers.length
    state.currentPageOfManager = 1
  },
  SET_CURRENT_PAGE: (state, index) => {
    state.currentPageOfManager = index
  },
  SET_TOTAL: (state, total) => {
    state.totalOfManager = total
  }
}

const actions = {
  async loadManager({ commit }) {
    const result = await loadAllManager()
    commit('LOAD_MANAGER', result)
  },
  setCurrentPage({ commit }, index) {
    commit('SET_CURRENT_PAGE', index)
  },
  setTotal({ commit }, total) {
    commit('SET_TOTAL', total)
  },
  async loadFreeClerks({ commit }) {
    const result = await loadAllFreeClerk()
    return result
  },
  async loadClerksOf({ coomit }, id) {
    const result = await findClerkByManagerId({
      managedBy: id
    })
    return result
  },
  async batchUpdateClerk({ commit }, clerks) {
    await dispatchClerk(clerks)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
