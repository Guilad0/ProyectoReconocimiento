import { createRouter, createWebHistory } from 'vue-router'
import Keyboard from '@/views/Keyboard.vue'
import HomeViewy from '@/views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/teclado',
      name: 'teclado',
      component: Keyboard
    },
    {
      path: '/',
      name: 'home',
      component: HomeViewy
    },
    {
      path: '/mic',
      name: 'mic',
      component: () => import('../views/micView.vue')

    }
    // {
    //   path: '/about',
    //   name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
    
  ],
})

export default router
