import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import AppTabs from '@/tabs/AppTabs.vue'
import HomeScreen from '@/tabs/HomeScreen.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/tabs/home-screen'
    },
    {
        path: '/tabs/',
        component: AppTabs,
        children: [
            {
                path: 'home-screen',
                component: HomeScreen
            },
            {
                path: '',
                redirect: '@/tabs/HomeScreen.vue'
            },
            {
                path: 'user-profile',
                component: () => import('@/tabs/UserProfile.vue')
            },
            {
                path: 'review-screen',
                component: () => import('@/tabs/ReviewScreen.vue')
            }
        ]
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
