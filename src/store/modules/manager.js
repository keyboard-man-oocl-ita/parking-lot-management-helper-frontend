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
  loadManager({ commit }) {
    const result = [
      {
        clerkId: '2c9a97f36c4250a8016c42b06ffc0004',
        phoneNumber: '13212311231',
        name: 'Liu',
        email: '54321',
        role: 'Parking Boy',
        status: '已激活',
        managedBy: ''
      },
      {
        clerkId: '2c9a97f36c4250a8016c42b06ffc0021',
        phoneNumber: '13212311231',
        name: 'Liu',
        email: '54321',
        role: 'Parking Boy',
        status: '已激活',
        managedBy: ''
      },
      {
        clerkId: '2c9a97f36c4250a8016c42b06ffc211',
        phoneNumber: '13212311231',
        name: 'Liu',
        email: '54321',
        role: 'Parking Boy',
        status: '已激活',
        managedBy: ''
      },
      {
        clerkId: '2c9a97f36c4250a8016c42b06ff333',
        phoneNumber: '13212311231',
        name: 'Liu',
        email: '54321',
        role: 'Parking Boy',
        status: '已激活',
        managedBy: ''
      },
      {
        clerkId: '2c9a97f36c4250a8016c42b06ff331',
        phoneNumber: '13212311231',
        name: 'Liu',
        email: '54321',
        role: 'Parking Boy',
        status: '已激活',
        managedBy: ''
      },
      {
        clerkId: '2c9a97f36c4250a8016c42b06f22c0021',
        phoneNumber: '13212311231',
        name: 'Liu',
        email: '54321',
        role: 'Parking Boy',
        status: '已激活',
        managedBy: ''
      },
      {
        clerkId: '2c9a97f36c4250a801633232c42b06ffc0021',
        phoneNumber: '13212311231',
        name: 'Liu',
        email: '54321',
        role: 'Parking Boy',
        status: '已激活',
        managedBy: ''
      },
      {
        clerkId: '2c9a97f36c42501a80163332c42b06ffc0021',
        phoneNumber: '13212311231',
        name: 'Liu',
        email: '54321',
        role: 'Parking Boy',
        status: '已激活',
        managedBy: ''
      },
      {
        clerkId: '2c9a97f363c4250a80163332c42b06ffc0021',
        phoneNumber: '13212311231',
        name: 'Liu',
        email: '54321',
        role: 'Parking Boy',
        status: '已激活',
        managedBy: ''
      },
      {
        clerkId: '2c9a97f364c4250a80163332c42b06ffc0021',
        phoneNumber: '13212311231',
        name: 'Liu',
        email: '54321',
        role: 'Parking Boy',
        status: '已激活',
        managedBy: ''
      },
      {
        clerkId: '2c95a97f36c4250a80163332c42b06ffc0021',
        phoneNumber: '13212311231',
        name: 'Liu',
        email: '54321',
        role: 'Parking Boy',
        status: '已激活',
        managedBy: ''
      }
    ]
    commit('LOAD_MANAGER', result)
  },
  setCurrentPage({ commit }, index) {
    commit('SET_CURRENT_PAGE', index)
  },
  setTotal({ commit }, total) {
    commit('SET_TOTAL', total)
  },
  async loadFreeClerks({ commit }) {
    const result = [{
      clerkId: '2c9a97f36c42150a8016c42b06ffc0004',
      phoneNumber: '13212311231',
      name: 'c',
      email: '54321',
      role: 'Parking Boy',
      status: '已激活',
      managedBy: ''
    },
    {
      clerkId: '2c9a97f36c42502a8016c42b06ffc0021',
      phoneNumber: '13212311231',
      name: 'b',
      email: '54321',
      role: 'Parking Boy',
      status: '已激活',
      managedBy: ''
    },
    {
      clerkId: '2c9a97f336c4250a8016c42b06ffc211',
      phoneNumber: '13212311231',
      name: 'a',
      email: '54321',
      role: 'Parking Boy',
      status: '已激活',
      managedBy: ''
    }]
    return new Promise((resolve, reject) => {
      resolve(result)
    })
  },
  async loadClerksOf({ coomit }, id) {
    const result = [
      {
        clerkId: '2c9a97f36c42150a8fc0004',
        phoneNumber: '13212311231',
        name: 'e',
        email: '54321',
        role: 'Parking Boy',
        status: '已激活',
        managedBy: ''
      },
      {
        clerkId: '2c9a97f342b06ffc0021',
        phoneNumber: '13212311231',
        name: 'f',
        email: '54321',
        role: 'Parking Boy',
        status: '已激活',
        managedBy: ''
      }
    ]
    return new Promise((resolve, reject) => {
      resolve(result)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
