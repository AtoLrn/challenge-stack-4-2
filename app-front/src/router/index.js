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
                    component: DashboardView
                },
                {
                    path: 'users',
                    name: 'users',
                    component: UsersView
                },
                {
                    path: 'requests',
                    name: 'requests',
                    component: RequestsView
                },
                {
                    path: 'tags',
                    name: 'tags',
                    component: TagsView
                },
                {
                    path: 'profile',
                    name: 'profile',
                    component: ProfileView
                }
            ]
        }
    ]
})

export default router
