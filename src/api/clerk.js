import request from '@/utils/request'

export function fetchClerk() {
  return request({
    url: '/managers',
    method: 'get'
  })
}

export function fetchClerkForAdmin(params) {
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

export function modifyPermission(data) {
  return request({
    url: `/admin/clerks/${data.clerkId}`,
    method: 'patch',
    data: data.clerk
  })
}

export function patchClerkStatus(id) {
  return request({
    url: `/clerks/${id}`,
    method: 'patch'
  })
}

export function fetchClerkById(id) {
  return request({
    url: `/clerks/${id}`,
    method: 'get'
  })
}

export function loadAllManager() {
  return request({
    url: '/clerks/managers',
    method: 'get'
  })
}

export function loadAllFreeClerk() {
  return request({
    url: '/clerks/unassignedParkingBoys',
    method: 'get'
  })
}

export function dispatchClerk(clerks) {
  return request({
    url: '/clerks',
    method: 'patch',
    data: clerks
  })
}

export function findClerkByManagedBy() {
  return request({
    url: '/managers',
    method: 'get'
  })
}

export function findClerkByCondition(data) {
  if (data.userName && data.phoneNumber) {
    return request({
      url: `/managers?name=${data.userName}&phoneNumber=${data.phoneNumber}`,
      method: 'get'
    })
  } else if (data.userName) {
    return request({
      url: `/managers?name=${data.userName}`,
      method: 'get'
    })
  } else if (data.phoneNumber) {
    return request({
      url: `/managers?phoneNumber=${data.phoneNumber}`,
      method: 'get'
    })
  } else {
    return request({
      url: '/managers',
      method: 'get'
    })
  }
}

export function findClerkByManagerId(params) {
  return request({
    url: `/clerks`,
    method: 'get',
    params: params
  })
}
