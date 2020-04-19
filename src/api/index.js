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
  RoomList: '/room/list'
}
export default api