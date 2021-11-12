import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import AppTabs from '@/tabs/AppTabs.vue'
import HomeTab from '@/tabs/HomeTab.vue'
import ProfileTab from '@/tabs/ProfileTab.vue'
import ReviewTab from '@/tabs/ReviewTab.vue'

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
                component: ProfileTab
            },
            {
                path: 'review-tab',
                component: ReviewTab
            }
        ]
    }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
