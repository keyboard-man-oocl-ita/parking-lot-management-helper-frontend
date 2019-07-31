import { loadParkingLotDashboard } from '@/api/parkingLot'

const state = {
  parkingLotsInDashboard: [],
  totalOfParkingLotInDashboard: 0,
  currentPageOfParkingLotInDashboard: 1
}

const mutations = {
  LOAD_PARKING_LOT: (state, parkingLots) => {
    state.parkingLotsInDashboard = parkingLots
  }
}

const actions = {
  async loadParkingLot({ commit }) {
    const result = await loadParkingLotDashboard()
    console.log(result)
    commit('LOAD_PARKING_LOT', result)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
