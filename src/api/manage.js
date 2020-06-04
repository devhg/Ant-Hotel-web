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
export function addRoom(parmeter) {
  return axios({
    url:api.AddRoom,
    method:'post',
    params:parmeter
  })
}
export function deleteRoom(parmeter) {
  return axios({
    url:api.DeleteRoom,
    method:'get',
    params:parmeter
  })
}
export function updateRoom(parmeter) {
  return axios({
    url:api.UpdateRoom,
    method:'get',
    params:parmeter
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
export function getUser(parameter) {
  return axios({
    url: api.getUser,
    method: 'get',
    params: parameter
  })
}
export function userSearch(parameter) {
  return axios({
    url:api.UserSearch,
    method:'get',
    params:parameter
  })
}
export function inoutSearch(parameter) {
  return axios({
    url:api.InOutSearch,
    method:'get',
    params:parameter
  })
}
export function liveSearch(parameter) {
  return axios({
    url:api.liveSearch,
    method:'get',
    params:parameter
  })
}
export function foodSearch(parameter) {
  return axios({
    url:api.foodSearch,
    method:'get',
    params:parameter
  })
}
export function UserListInsert(parameter) {
  return axios({
    url:api.UserListInsert,
    method:'get',
    params:parameter
  })
}
export function getFitness(parameter) {
  return axios({
    url:api.FitnessRecord,
    method:'get',
    params:parameter
  })
}
export function searchFitness(parameter) {
  return axios({
    url:api.SearchFitness,
    method:'get',
    params:parameter
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