import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '/src/pages/login/LoginPage.vue';
import HomePage from "/src/pages/HomePage.vue";
import DiscussionPage from "/src/pages/general/DiscussionPage.vue";
import TeachersDashboard from '/src/pages/teacher/TeachersDashboard.vue';
import CreateQuestionPage from "/src/pages/student/CreateQuestionPage.vue";
import AdminPage from "/src/pages/admin/AdminPage.vue";

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/discussion/:question_id', name: 'Discussion', component: DiscussionPage, props: true },
    { path: '/teachers-dashboard', component: TeachersDashboard },
    {path: '/create-question', name: 'CreateQuestion', component: CreateQuestionPage,props: true},
    {path: '/admin',name: 'Admin',component:  AdminPage}
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;