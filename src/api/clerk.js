import request from '@/utils/request'

export function fetchClerk() {
  return request({
    url: '/clerks/managers',
    method: 'get'
  })
}
