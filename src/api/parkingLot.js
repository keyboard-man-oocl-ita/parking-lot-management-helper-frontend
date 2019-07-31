import request from '@/utils/request'

export function loadParkingLots() {
  return request({
    url: '/parkingLots',
    method: 'get'
  })
}
