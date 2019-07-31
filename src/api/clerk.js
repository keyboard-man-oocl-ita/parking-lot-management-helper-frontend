import request from '@/utils/request'

export function fetchClerk() {
  return request({
    url: '/clerks/managers',
    method: 'get'
  })
}

export function fetchClerkById(id) {
  return request({
    url: `/clerks/${id}`,
    method: 'get'
  })
}
