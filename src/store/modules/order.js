import { fetchOrder } from '@/api/order'

const state = {
  orders: [],
  total: 0,
  currentPage: -1
}

const mutations = {
  LOAD_ORDERS: (state, orders) => {
    state.orders = orders
    state.total = orders.length
    state.currentPage = 1
  },
  SET_CURRENT_PAGE: (state, index) => {
    state.currentPage = index
  },
  SET_TOTAL: (state, total) => {
    state.total = total
  }
}

const actions = {
  async loadOrders({ commit }, params) {
    const result = await fetchOrder(params)
    commit('LOAD_ORDERS', result)
  },
  setCurrentPage({ commit }, index) {
    commit('SET_CURRENT_PAGE', index)
  },
  setTotal({ commit }, total) {
    commit('SET_TOTAL', total)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
