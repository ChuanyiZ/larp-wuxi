import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../views/BaseView.vue'),
      children: [
        {
          path: '',
          redirect: '/cover',
        },
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
        {
          path: 'tasks',
          name: 'tasks',
          component: () => import('../views/TaskView.vue'),
        },
        {
          path: 'tools',
          name: 'tools',
          component: () => import('../views/ToolsView.vue'),
        },
      ],
    },
  ],
})

export default router
