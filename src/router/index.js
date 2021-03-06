import { createRouter, createWebHistory } from 'vue-router'
import { storage } from '@/utils'
import NProgress from 'nprogress' // 引入nprogress插件


const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    name: 'Main',
    redirect: '/windowInfoInput',
    component: () => import('@/views/Main'),
    children: [
      {
        path: 'windowInfoInput',
        name: 'WindowInfoInput',
        meta: {
          title: '窗口服务人员录入'
        },
        component: () => import('@/views/Main/WindowInfoInput'),
      },
      {
        path: 'attendance',
        name: 'Attendance',
        meta: {
          title: '考勤情况录入'
        },
        component: () => import('@/views/Main/Attendance'),
      },
      {
        path: 'star',
        name: 'MonthStar',
        meta: {
          title: '月度服务之星录入'
        },
        component: () => import('@/views/Main/MonthStar'),
      },
      {
        path: 'rate',
        name: 'Rate',
        meta: {
          title: '政务服务质量录入'
        },
        component: () => import('@/views/Main/Rate'),
      },
      {
        path: 'hallDevice',
        name: 'HallDevice',
        meta: {
          title: '大厅设施情况录入'
        },
        component: () => import('@/views/Main/HallDevice'),
      },
      {
        path: 'governmentEntry',
        name: 'governmentEntry',
        meta: {
          title: '政务服务事项录入'
        },
        component: () => import('@/views/Main/GovernmentEntry'),
      },
      {
        path: '/admin',
        name: 'Admin',
        redirect: '/admin/organization',
        meta: {
          title: '系统管理'
        },
        component: () => import('@/views/Main/Admin'),
        children: [
          {
            path: 'organization',
            name: 'Organization',
            meta: {
              title: '系统管理/部门管理'
            },
            component: () => import('@/views/Main/Admin/Organization')
          },
          {
            path: 'roles',
            name: 'Roles',
            meta: {
              title: '系统管理/角色管理'
            },
            component: () => import('@/views/Main/Admin/Roles')
          },
          {
            path: 'users',
            name: 'Users',
            meta: {
              title: '系统管理/用户管理'
            },
            component: () => import('@/views/Main/Admin/Users')
          }
        ]
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: () => import('@/views/NotFound')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from) => {
  NProgress.start()
  from.meta.isOverflow = false
  const token = storage('localStorage', 'zwjd-token');
  if (to.path !== '/login') {
    if (!token) {
      return '/login'
    }
  } else {
    if (token) {
      return '/windowInfoInput'
    }
  }
})

router.afterEach((to) => {
  to.meta.isOverflow = true
  NProgress.done()
})

export default router