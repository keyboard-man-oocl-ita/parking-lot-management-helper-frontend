import request from '@/utils/request'

export function loadParkingLots() {
  return request({
    url: '/admin/parkingLots',
    method: 'get'
  })
}

export function createParkingLot(data) {
  return request({
    url: '/parkingLots',
    method: 'post',
    data
  })
}

export function loadConditionalParkingLots(parkingLotName, lowerLimit, upperLimit) {
  return request({
    url: `/parkingLots?parkingLotName=${parkingLotName}&lowerLimit=${lowerLimit}&upperLimit=${upperLimit}`,
    method: 'get'
  })
}
