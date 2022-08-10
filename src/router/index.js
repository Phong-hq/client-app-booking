import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'login',
      component: () => import('../views/LayoutLogin.vue'),
      children: [
        {
         path: '/login',
         name: 'login',
         component: () => import('../views/login/Login.vue')
       },
       {
        path: '/login/confirm',
        name: 'login-confirm',
        component: () => import('../views/login/LoginConfirm.vue')
        },
      ]

    },
    {
      path: "/home",
      redirect: "home",
      // redirect: "/dashboard",
      component: () => import('../views/Layout.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/Home.vue'),
        },
        {
          path: '/new-appointment',
          name: 'new-appointment',
          component: () => import('../views/new-appointment/NewAppointment.vue'),
        },
        {
          path: '/new-appointment/date-time',
          name: 'date-time',
          component: () => import('../views/new-appointment/DateTime.vue'),
        },
        {
          path: '/new-appointment/customer',
          name: 'customer',
          component: () => import('../views/new-appointment/Customer.vue'),
        },
      ]
    },
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
