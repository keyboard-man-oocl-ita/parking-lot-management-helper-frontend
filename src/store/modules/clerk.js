import { fetchClerk, fetchClerkById } from '@/api/clerk'
import { addNewClerk, modifyPermission, patchClerkStatus } from '../../api/clerk'

const state = {
  clerks: [],
  totalOfClerk: 0,
  currentPage: -1
}

const mutations = {
  LOAD_CLERKS: (state, clerks) => {
    state.clerks = clerks
    state.totalOfClerk = clerks.length
    state.currentPage = 1
  },
  SET_CURRENT_PAGE: (state, index) => {
    state.currentPage = index
  },
  SET_TOTAL: (state, total) => {
    state.totalOfClerk = total
  }
}

const actions = {
  async loadClerks({ commit }, params) {
    const result = await fetchClerk(params)
    commit('LOAD_CLERKS', result)
  },
  setCurrentPage({ commit }, index) {
    commit('SET_CURRENT_PAGE', index)
  },
  async loadClerkById({ commit }, id) {
    const result = await fetchClerkById(id)
    return result
  },
  setTotal({ commit }, total) {
    commit('SET_TOTAL', total)
  },
  async updateClerkStatus({ dispatch }, clerkId) {
    await patchClerkStatus(clerkId)
    dispatch('loadClerks', { name: '', role: 0 })
  },
  async modifyPermission({ dispatch }, data) {
    await modifyPermission(data)
    dispatch('loadClerks', { name: '', role: 0 })
  },
  async addNewClerk({ dispatch }, data) {
    await addNewClerk(data)
    dispatch('loadClerks', { name: '', role: 0 })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
