import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect:"/home/record",
  },

  {
    path: '/home',
    name: 'home',
    redirect:"/home/record",
    component: () => import('../views/home.vue'),
    children:[
      {
        path: '/home/record',
        name: 'record',
        component: () => import('../views/record/index.vue'),
      },
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
