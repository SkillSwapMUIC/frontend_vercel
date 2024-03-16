import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '/src/ServicePage/LoginPage.vue';
import HomePage from "/src/page/HomePage.vue";
import DiscussionPage from "/src/page/DiscussionPage.vue";

const routes = [
    {path: '/', name: 'Home', component: HomePage,},
    { path: '/login', component: LoginPage },
    {path: '/discussion/:questionTitle',
        name: 'Discussion',
        component: DiscussionPage,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;