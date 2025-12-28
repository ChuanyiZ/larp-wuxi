import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/cover',
      component: () => import('../views/BaseView.vue'),
      children: [
        {
          path: 'cover',
          name: 'cover',
          component: () => import('../views/CoverView.vue'),
        },
        {
          path: 'opening',
          name: 'opening',
          component: () => import('../views/OpeningView.vue'),
        },
      ]
    },
  ],
})

export default router
