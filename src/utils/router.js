import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '/src/pages/login/LoginPage.vue';
import HomePage from "/src/pages/HomePage.vue";
import DiscussionPage from "/src/pages/general/DiscussionPage.vue";
import TeachersDashboard from '/src/pages/teacher/TeachersDashboard.vue';
import CreateQuestionPage from "/src/pages/student/CreateQuestionPage.vue";
import AdminPage from "/src/pages/admin/AdminPage.vue";
import TeacherCreateCoursePage from "/src/pages/teacher/TeacherCreateCoursePage.vue";
// src/pages/login/RegistrationPage.vue
import RegistrationPage from '/src/pages/login/RegistrationPage.vue';


const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/discussion/:question_id', name: 'Discussion', component: DiscussionPage, props: true },
    { path: '/teachers-dashboard', component: TeachersDashboard },
    { path: '/create-question', name: 'CreateQuestion', component: CreateQuestionPage,props: true},
    { path: '/admin', name: 'Admin', component:  AdminPage},
    { path: '/teacher-course', name: 'TeacherCourse', component:  TeacherCreateCoursePage},
    { path: '/register', name: 'Register', component: RegistrationPage },
    //{ path: '/searchbar/autocomplete', name: 'SearchBarAutocomplete', component: SearchBarAutocomplete }
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
