const state = {
  parkingLotsInDashboard: [
    {
      name: '停车场A',
      clerk: 'jimmy',
      data: [
        { value: 10, name: '剩余' },
        { value: 11, name: '已占用' }
      ]
    },
    {
      name: '停车场B',
      clerk: 'gukson',
      data: [
        { value: 10, name: '剩余' },
        { value: 12, name: '已占用' }
      ]
    },
    {
      name: '停车场C',
      clerk: 'vincent',
      data: [
        { value: 10, name: '剩余' },
        { value: 13, name: '已占用' }
      ]
    }
  ],
  totalOfParkingLotInDashboard: 3,
  currentPageOfParkingLotInDashboard: 1
}

const mutations = {
  LOAD_PARKING_LOT: (state, parkingLots) => {
    state.parkingLotsInDashboard = parkingLots
  }
}

const actions = {
  async loadParkingLot({ commit }) {
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
