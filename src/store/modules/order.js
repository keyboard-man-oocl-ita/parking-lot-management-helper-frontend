import { fetchOrder, patchOrder } from '@/api/order'

const state = {
  orders: [],
  total: 0,
  currentPage: -1,
  orderSelected: ''
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
  },
  SET_ORDER_SELECTED: (state, order) => {
    state.orderSelected = order
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
  },
  setOrderSelected({ commit }, order) {
    commit('SET_ORDER_SELECTED', order)
  },
  async updateOrder({ commit }, order) {
    await patchOrder(order)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
