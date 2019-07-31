import request from '@/utils/request'

export function fetchClerk(params) {
  return request({
    url: '/admin/clerks',
    method: 'get',
    params: params
  })
}

export function addNewClerk(data) {
  return request({
    url: '/clerks',
    method: 'post',
    data
  })
}

export function patchClerkStatus(id) {
  return request({
    url: `/clerks/${id}`,
    method: 'patch'
  })
}
