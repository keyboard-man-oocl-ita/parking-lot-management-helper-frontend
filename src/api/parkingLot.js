import request from '@/utils/request'

export function loadParkingLots() {
  return request({
    url: '/parkingLots',
    method: 'get'
  })
}

export function loadParkingLotDashboard() {
  return request({
    url: '/parkingLotDashboard',
    method: 'get'
  })
}
