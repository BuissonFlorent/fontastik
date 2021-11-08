import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import AppTabs from '@/tabs/AppTabs.vue'
import HomeTab from '@/tabs/HomeTab.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/tabs/home-tab'
    },
    {
        path: '/tabs/',
        component: AppTabs,
        children: [
            {
                path: 'home-tab',
                component: HomeTab
            },
            {
                path: '',
                redirect: '@/tabs/HomeTab.vue'
            },
            {
                path: 'profile-tab',
                component: () => import('@/tabs/ProfileTab.vue')
            },
            {
                path: 'review-tab',
                component: () => import('@/tabs/ReviewTab.vue')
            }
        ]
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
