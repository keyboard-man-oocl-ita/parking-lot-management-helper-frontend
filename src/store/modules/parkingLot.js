import { loadParkingLots, createParkingLot, loadConditionalParkingLots } from '../../api/parkingLot'

const state = {
  parkingLots: [],
  totalOfParkingLot: 0,
  currentPageOfParkingLot: 1
}

const mutations = {
  LOAD_PARKING_LOT: (state, parkingLots) => {
    state.parkingLots = parkingLots
    state.totalOfParkingLot = parkingLots.length
    state.currentPageOfParkingLot = 1
  },
  SET_CURRENT_PAGE: (state, index) => {
    state.currentPageOfParkingLot = index
  },
  SET_TOTAL: (state, total) => {
    state.totalOfParkingLot = total
  }
}

const actions = {
  async loadParkingLots({ commit }) {
    const result = await loadParkingLots()
    commit('LOAD_PARKING_LOT', result)
  },
  setCurrentPage({ commit }, index) {
    commit('SET_CURRENT_PAGE', index)
  },
  setTotal({ commit }, total) {
    commit('SET_TOTAL', total)
  },
  async createParkingLot({ commit }, parkingLot) {
    await createParkingLot(parkingLot)
  },
  async loadConditionalParkingLots({ commit }, parkingLotName, lowerLimit, upperLimit) {
    const result = await loadConditionalParkingLots(parkingLotName, lowerLimit, upperLimit)
    commit('LOAD_PARKING_LOT', result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
