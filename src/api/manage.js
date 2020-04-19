import {
  axios
} from '@/utils/request'
import api from './index'

export function getUserList(parameter) {
  return axios({
    url: api.UserList,
    method: 'get',
    params: parameter
  })
}

export function getRecord(parameter) {
  return axios({
    url: api.Record,
    method: 'get',
    params: parameter
  })
}

export function getRoomList(parameter) {
  return axios({
    url: api.RoomList,
    method: 'get',
    params: parameter
  })
}

// export function getRoleList(parameter) {
//   return axios({
//     url: api.role,
//     method: 'get',
//     params: parameter
//   })
// }

export function getOrderList(parameter) {
  return axios({
    url: api.LiveOrder,
    method: 'get',
    params: parameter
  })
}

export function getFoodList(parameter) {
  return axios({
    url: api.CanteenOrder,
    method: 'get',
    params: parameter
  })
}

// export function getPermissions(parameter) {
//   return axios({
//     url: api.permissionNoPager,
//     method: 'get',
//     params: parameter
//   })
// }

// export function getOrgTree(parameter) {
//   return axios({
//     url: api.orgTree,
//     method: 'get',
//     params: parameter
//   })
// }

// id == 0 add     post
// id != 0 update  put
// export function saveService(parameter) {
//   return axios({
//     url: api.service,
//     method: parameter.id === 0 ? 'post' : 'put',
//     data: parameter
//   })
// }

export function test(params) {
  console.log('test export')
}