import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '/src/ServicePage/LoginPage.vue';
import HomePage from "/src/page/HomePage.vue";

const routes = [
    {path: '/', name: 'Home', component: HomePage,},
    { path: '/login', component: LoginPage },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;