import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/login/LoginPage.vue';
import HomePage from "../pages/HomePage.vue";
import DiscussionPage from "../pages/general/DiscussionPage.vue";
import TeachersDashboard from '../pages/teacher/TeachersDashboard.vue';
import CreateQuestionPage from "../pages/student/CreateQuestionPage.vue";
import AdminPage from "../pages/admin/AdminPage.vue";
import TeacherCreateCoursePage from "../pages/teacher/TeacherCreateCoursePage.vue";
import AccessDenied from "../pages/teacher/AccessDenied.vue";
import RegistrationPage from '../pages/login/RegistrationPage.vue';


const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/discussion/:question_id', name: 'Discussion', component: DiscussionPage, props: true },
    { path: '/teachers-dashboard', component: TeachersDashboard },
    { path: '/create-question', name: 'CreateQuestion', component: CreateQuestionPage,props: true},
    { path: '/admin', name: 'Admin', component:  AdminPage},
    { path: '/teacher-course', name: 'TeacherCourse', component:  TeacherCreateCoursePage},
    { path: '/register', name: 'Register', component: RegistrationPage },
    {path: '/access-denied', name: 'AccessDenied', component: AccessDenied},
    //{ path: '/searchbar/autocomplete', name: 'SearchBarAutocomplete', component: SearchBarAutocomplete }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
