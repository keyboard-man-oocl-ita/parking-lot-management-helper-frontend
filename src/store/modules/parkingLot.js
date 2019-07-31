import { loadParkingLots } from '../../api/parkingLot'

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
  }
}

const actions = {
  async loadParkingLotAct({ commit }) {
    const result = await loadParkingLots()
    commit('LOAD_PARKING_LOT', result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
