import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import SecurityView from "@/views/SecurityView.vue";
import AdministrationView from "@/views/Administration/AdministrationView.vue";
import DashboardView from "@/views/Administration/DashboardView.vue";
import UsersView from "@/views/Administration/UsersView.vue";
import ProfileView from "@/views/Administration/ProfileView.vue";
import RequestsView from "@/views/Administration/RequestsView.vue";
import TagsView from "@/views/Administration/TagsView.vue";
import { getToken } from '../utils/token';
import { getRole } from '../utils/role';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/security/login'
        },
        {
            path: '/security',
            name: 'security',
            component: SecurityView,
            children: [
                {
                    path: 'login',
                    name: 'login',
                    component: LoginView
                },
                {
                    path: 'register',
                    name: 'register',
                    component: RegisterView
                },
            ]
        },
        {
            path: '/administration',
            name: 'administration',
            component: AdministrationView,
            children: [
                {
                    path: 'dashboard',
                    name: 'dashboard',
                    component: DashboardView,
                    meta: { connected: true }
                },
                {
                    path: 'users',
                    name: 'users',
                    component: UsersView,
                    meta: { isAdmin: true }
                },
                {
                    path: 'requests',
                    name: 'requests',
                    component: RequestsView,
                    meta: { isAdmin: true, connected: true }
                },
                {
                    path: 'tags',
                    name: 'tags',
                    component: TagsView,
                    meta: { connected: true }
                },
                {
                    path: 'profile',
                    name: 'profile',
                    component: ProfileView,
                    meta: { connected: true }
                }
            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    const isAdmin = to.matched.some(destination => destination.meta.isAdmin)
    const isConnected = to.matched.some(destination => destination.meta.connected)
    
    console.log('ANTOINE', getToken())

    if (isAdmin && getRole() === 'user') {
        next({ name: 'dashboard' })
    } else if (!getToken() && isConnected) {
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router
