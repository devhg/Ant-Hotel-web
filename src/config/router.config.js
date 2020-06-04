// eslint-disable-next-line
import {
  UserLayout,
  BasicLayout,
  RouteView,
  BlankLayout,
  PageView
} from '@/layouts'
import {
  bxAnaalyse
} from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: {
      title: '首页'
    },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/workplace',
        component: RouteView,
        meta: {
          title: '数据分析',
          keepAlive: true,
          icon: bxAnaalyse,
          permission: ['dashboard']
        },
        children: [{
            path: '/dashboard/analysis',
            name: 'Analysis',
            component: () => import('@/views/dashboard/Analysis'),
            meta: {
              title: '分析页',
              keepAlive: false,
              permission: ['dashboard']
            }
          },
          // 外部链接
          {
            path: '/oth',
            redirect: '/404',
            name: 'Monitor',
            meta: {
              title: '监控页（外部）',
              target: '_blank'
            }
          },
          {
            path: '/dashboard/workplace',
            name: 'Workplace',
            component: () => import('@/views/dashboard/Workplace'),
            meta: {
              title: '工作台',
              keepAlive: true,
              permission: ['dashboard']
            }
          }
        ]
      },

      // forms
      // {
      //   path: '/form',
      //   redirect: '/form/base-form',
      //   component: PageView,
      //   meta: {
      //     title: '表单页',
      //     icon: 'form',
      //     permission: ['form']
      //   },
      //   children: [{
      //       path: '/form/base-form',
      //       name: 'BaseForm',
      //       component: () => import('@/views/form/BasicForm'),
      //       meta: {
      //         title: '基础表单',
      //         keepAlive: true,
      //         permission: ['form']
      //       }
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'StepForm',
      //       component: () => import('@/views/form/stepForm/StepForm'),
      //       meta: {
      //         title: '分步表单',
      //         keepAlive: true,
      //         permission: ['form']
      //       }
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'AdvanceForm',
      //       component: () => import('@/views/form/advancedForm/AdvancedForm'),
      //       meta: {
      //         title: '高级表单',
      //         keepAlive: true,
      //         permission: ['form']
      //       }
      //     }
      //   ]
      // },
      // room list
      {
        path: '/room',
        name: 'room',
        component: PageView,
        redirect: '/room/list',
        meta: {
          title: '房间管理',
          icon: 'home',
          permission: ['table']
        },
        children: [{
          path: '/room/list',
          name: 'CardList',
          component: () => import('@/views/room/CardList'),
          meta: {
            title: '房间信息',
            keepAlive: true,
            permission: ['table']
          }
        }]
      },
      // list
      {
        path: '/consumer',
        name: 'list',
        component: PageView,
        redirect: '/consumer/userList',
        meta: {
          title: '客户管理',
          icon: 'table',
          permission: ['table']
        },
        children: [{
            path: '/consumer/userList/:pageNo([1-9]\\d*)?',
            name: 'UserListWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/consumer/UserList'),
            meta: {
              title: '用户列表',
              keepAlive: true,
              permission: ['table']
            }
          },
          {
            path: '/consumer/record',
            name: 'InWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/consumer/Record'),
            meta: {
              title: '进出记录',
              keepAlive: true,
              permission: ['table']
            },
          },
          {
            path: '/consumer/fitness',
            name: 'FitnessWrapper',
            hideChildrenInMenu: true, // 强制显示 MenuItem 而不是 SubMenu
            component: () => import('@/views/consumer/FitnessRecord'),
            meta: {
              title: '健身记录',
              keepAlive: true,
              permission: ['table']
            },
          },
        ]
      },

      // profile
      {
        path: '/order',
        name: 'profile',
        component: RouteView,
        redirect: '/order/basic',
        meta: {
          title: '订单管理',
          icon: 'profile',
          permission: ['profile']
        },
        children: [{
            path: '/order/liveList',
            name: 'OrderList',
            component: () => import('@/views/order/LiveList'),
            meta: {
              title: '住宿订单',
              keepAlive: false,
              permission: ['profile']
            }
          },
          {
            path: '/order/foodList',
            name: 'FoodList',
            component: () => import('@/views/order/FoodList'),
            meta: {
              title: '餐饮订单',
              permission: ['profile']
            }
          },
          {
            path: '/order/liveDetail',
            name: 'LiveAdvanced',
            hidden: true,
            component: () => import('@/views/order/advanced/LiveAdvanced'),
            meta: {
              keepAlive: false,
              title: '住宿详情'
            }
          },
          {
            path: '/order/FoodDetail',
            name: 'LiveAdvanced',
            hidden: true,
            component: () => import('@/views/order/advanced/FoodAdvanced'),
            meta: {
              keepAlive: false,
              title: '餐饮详情'
            }
          },
          {
            path: '/consumer/UserDetail',
            name: 'UserAdvanced',
            hidden: true,
            component: () => import('@/views/consumer/advanced/UserAdvanced'),
            meta: {
              keepAlive: false,
              title: '用户详情'
            }
          },
        ]
      },

      // result
      // {
      //   path: '/result',
      //   name: 'result',
      //   component: PageView,
      //   redirect: '/result/success',
      //   meta: {
      //     title: '结果页',
      //     icon: 'check-circle-o',
      //     permission: ['result']
      //   },
      //   children: [{
      //       path: '/result/success',
      //       name: 'ResultSuccess',
      //       component: () => import( /* webpackChunkName: "result" */ '@/views/result/Success'),
      //       meta: {
      //         title: '成功',
      //         keepAlive: false,
      //         hiddenHeaderContent: true,
      //         permission: ['result']
      //       }
      //     },
      //     {
      //       path: '/result/fail',
      //       name: 'ResultFail',
      //       component: () => import( /* webpackChunkName: "result" */ '@/views/result/Error'),
      //       meta: {
      //         title: '失败',
      //         keepAlive: false,
      //         hiddenHeaderContent: true,
      //         permission: ['result']
      //       }
      //     }
      //   ]
      // },

      // Exception
      {
        path: '/exception',
        name: 'exception',
        component: RouteView,
        redirect: '/exception/403',
        meta: { title: '人员管理', icon: 'warning', permission: [ 'exception' ] },
        children: [
          {
            path: '/exception/403',
            name: 'Exception403',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
            meta: { title: '403', permission: [ 'exception' ] }
          },
          {
            path: '/exception/404',
            name: 'Exception404',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
            meta: { title: '404', permission: [ 'exception' ] }
          },
          {
            path: '/exception/500',
            name: 'Exception500',
            component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),
            meta: { title: '500', permission: [ 'exception' ] }
          }
        ]
      },

      // other
      {
        path: '/other',
        name: 'otherPage',
        component: PageView,
        meta: {
          title: '关于酒店',
          icon: 'slack',
          permission: ['dashboard']
        },
        redirect: '/other/icon-selector',
        children: [{
            path: '/other/icon-selector',
            name: 'TestIconSelect',
            component: () => import('@/views/other/IconSelectorView'),
            meta: {
              title: 'IconSelector',
              icon: 'tool',
              keepAlive: true,
              permission: ['dashboard']
            }
          },
          {
            path: '/other/list',
            component: RouteView,
            meta: {
              title: '业务布局',
              icon: 'layout',
              permission: ['support']
            },
            redirect: '/other/list/tree-list',
            children: [{
                path: '/other/list/tree-list',
                name: 'TreeList',
                component: () => import('@/views/other/TreeList'),
                meta: {
                  title: '树目录表格',
                  keepAlive: true
                }
              },
              {
                path: '/other/list/edit-table',
                name: 'EditList',
                component: () => import('@/views/other/TableInnerEditList'),
                meta: {
                  title: '内联编辑表格',
                  keepAlive: true
                }
              },
              {
                path: '/other/list/user-list',
                name: 'UserList',
                component: () => import('@/views/other/UserList'),
                meta: {
                  title: '用户列表',
                  keepAlive: true
                }
              },
              {
                path: '/other/list/role-list',
                name: 'RoleList',
                component: () => import('@/views/other/RoleList'),
                meta: {
                  title: '角色列表',
                  keepAlive: true
                }
              },
              {
                path: '/other/list/system-role',
                name: 'SystemRole',
                component: () => import('@/views/role/RoleList'),
                meta: {
                  title: '角色列表2',
                  keepAlive: true
                }
              },
              {
                path: '/other/list/permission-list',
                name: 'PermissionList',
                component: () => import('@/views/other/PermissionList'),
                meta: {
                  title: '权限列表',
                  keepAlive: true
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [{
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [{
        path: 'login',
        name: 'login',
        component: () => import( /* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import( /* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import( /* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },

  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [{
      path: 'home',
      name: 'TestHome',
      component: () => import('@/views/Home')
    }]
  },

  {
    path: '/404',
    component: () => import( /* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]