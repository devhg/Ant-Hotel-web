const api = {
  Login: '/auth/login',
  Logout: '/auth/logout',
  ForgePassword: '/auth/forge-password',
  Register: '/auth/register',
  twoStepCode: '/auth/2step-code',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/user/info',
  LiveOrder: '/order/live',
  CanteenOrder: '/order/food',
  UserList: '/user/list',
  Record: '/user/inout',
  RoomList: '/room/list',
  AddRoom: '/room/add',
  DeleteRoom:'/room/delete',
  UpdateRoom:'/room/update',
  UserSearch:'/user/userSearch',
  InOutSearch:'/user/inoutSearch',
  liveSearch:'/order/liveSearch',
  foodSearch:'/order/foodSearch',
  UserListInsert:'/user/insert',
  getUser:'/user/one',
  FitnessRecord:'/fitness/list',
  SearchFitness:'/fitness/search'
}
export default api