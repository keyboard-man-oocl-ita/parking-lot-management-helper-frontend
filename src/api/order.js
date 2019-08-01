import request from '@/utils/request'

export function fetchOrder(params) {
  return request({
    url: '/orders',
    method: 'get',
    params: params
  })
}

export function patchOrder(data) {
  return request({
    url: '/appointedOrders',
    method: 'put',
    data: data
  })
}
