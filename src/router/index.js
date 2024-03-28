import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '/src/ServicePage/LoginPage.vue';
import HomePage from "/src/page/HomePage.vue";
import DiscussionPage from "/src/page/DiscussionPage.vue";
import TeachersDashboard from '/src/components/TeachersDashboard.vue';
import CreateQuestionPage from "/src/page/CreateQuestionPage.vue";
import AdminPage from "/src/page/AdminPage.vue";

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/discussion/:questionTitle', name: 'Discussion', component: DiscussionPage, props: true },
    { path: '/teachers-dashboard', component: TeachersDashboard },
    {path: '/create-question/:questionTitle', name: 'CreateQuestion', component: CreateQuestionPage,props: true},
    {path: '/admin',name: 'Admin',component:  AdminPage}
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
