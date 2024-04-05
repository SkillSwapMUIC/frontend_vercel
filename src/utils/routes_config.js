//const backendURL =  'http://127.0.0.1:5555';
const backendURL =  'https://backend-vercel-two.vercel.app';

const defined_routes = {

    get_thread_by_id : "/qanda/thread/byid/",
    submit_question : "/qanda/question/submit",
    get_random_six_titles: "/qanda/getrandomsixtitles",
    login_to_backend: "/auth/login",
    submit_answer: "/qanda/answer-on",
    get_all_subjects: "/qanda/all-subjects",
    is_teacher: "/auth/is-teacher",
    autocomplete_navbar: "/search/searchbar/autocomplete",
}






const routes  = (route) => {
    return backendURL + defined_routes[route];
}

export default routes;